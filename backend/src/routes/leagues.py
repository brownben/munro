import asyncio
from typing import Awaitable, Iterable

from fastapi import Depends, Path
from fastapi.routing import APIRouter

from ..database import (
    Competitors,
    Events,
    LeagueClasses,
    LeagueEvents,
    LeagueGroups,
    Leagues,
    Results,
)
from ..exceptions import HTTP_201, HTTP_400, HTTP_404, HTTP_409
from ..schemas import (
    Competitor,
    League,
    LeagueClass,
    LeagueEvent,
    LeagueOverview,
    LeagueOverviewAuthenticated,
    LeagueResult,
    LeagueResultScore,
    LeagueResultsResponse,
    Message,
    Result,
)
from ..utils.age_class import age_class_matches_filter
from ..utils.assign_positions import (
    assign_position_based_on_points,
    assign_position_based_on_time,
)
from ..utils.club import club_matches_filter
from ..utils.counting_results import find_counting_results
from ..utils.dynamic_results import DYNAMIC_RESULT_TYPES, calculate_dynamic_results
from ..utils.points_calculators import get_matching_points_calculator
from .authentication import require_authentication

router = APIRouter(
    prefix="/leagues",
    tags=["Leagues"],
)


def competitor_to_league_result(
    competitor: Competitor, number_of_events: int = 0
) -> LeagueResult:
    league_result = LeagueResult(**competitor.dict())
    league_result.points = [None] * number_of_events
    return league_result


@router.get("/", response_model=list[League])
async def get_all_league_details() -> Iterable[League]:
    return await Leagues.get_all()


@router.post("/", response_model=Message)
async def create_league(
    league: League,
    authentication: bool = Depends(require_authentication),
) -> Message:
    if await Leagues.get_by_name(league.name):
        raise HTTP_409(f"League `{league.name}` already exists")

    await Leagues.create(league)

    raise HTTP_201(f"League `{league.name}` created")


async def get_league(name: str) -> LeagueOverviewAuthenticated:
    result, classes, events, groups = await asyncio.gather(
        Leagues.get_by_name(name),
        LeagueClasses.get_by_league(name),
        Events.get_by_league(name),
        LeagueGroups.get_by_league(name),
    )

    if not result:
        raise HTTP_404(f"Couldn't find league with name `{name}`")

    return LeagueOverviewAuthenticated(
        **result.dict(), classes=classes, events=events, groups=groups
    )


@router.get("/{name}", response_model=LeagueOverview)
async def get_league_details(
    name: str = Path(
        title="League Name",
        description="Name of the league to fetch",
        example="Sprintelope 2021",
    ),
) -> LeagueOverviewAuthenticated:
    return await get_league(name)


@router.get("/{name}/uploadKey", response_model=LeagueOverviewAuthenticated)
async def get_league_details_with_event_upload_keys(
    name: str = Path(
        title="League Name",
        description="Name of the league to fetch",
        example="Sprintelope 2021",
    ),
    authentication: bool = Depends(require_authentication),
) -> LeagueOverviewAuthenticated:
    return await get_league(name)


@router.put("/{name}", response_model=Message)
async def update_competitor_details(
    league: League,
    name: str = Path(
        title="League Name",
        description="Name of the league to update",
        example="Sprintelope 2021",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    success = await Leagues.update(name, league)

    if success:
        return Message(detail=f"League `{league.name}` updated")
    else:
        raise HTTP_404(f"Couldn't find league with the name `{name}`")


@router.delete("/{name}", response_model=Message)
async def delete_league(
    name: str = Path(
        title="League Name",
        description="Name of the league to delete",
        example="Sprintelope 2021",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    await Leagues.delete_by_name(name)

    return Message(detail=f"League `{name}` deleted")


def get_results_for_event(
    event: LeagueEvent, league_class: LeagueClass
) -> Awaitable[Iterable[Result]]:
    course = (
        (event.expected_courses and event.expected_courses.get(league_class.name))
        or league_class.standard_course
        or ""
    )

    if course == "*":
        return Results.get_by_event(event.event)
    if "|" in course:
        courses = course.split("|")
        return Results.get_by_event_and_courses(event.event, courses)

    return Results.get_by_event_and_course(event.event, course)


@router.get("/{league_name}/results/{cls}", response_model=LeagueResultsResponse)
async def get_league_results(
    league_name: str = Path(
        title="League Name",
        description="Name of the league to get the results for",
        example="Sprintelope 2021",
    ),
    cls: str = Path(
        title="Class",
        description="Name of the class to get results for",
        example="Long",
    ),
) -> LeagueResultsResponse:
    league, events, league_class, league_classes, league_groups = await asyncio.gather(
        Leagues.get_by_name(league_name),
        LeagueEvents.get_by_league_with_results(league_name),
        LeagueClasses.get_by_name(league_name, cls),
        LeagueClasses.get_by_league(league_name),
        LeagueGroups.get_dict_by_league(league_name),
    )

    if not league:
        raise HTTP_404(f"Couldn't find league with name `{league_name}`")
    if not league_class:
        raise HTTP_404(f"Couldn't find league class with name `{cls}`")

    competitors = await Competitors.get_by_pool(league.competitor_pool)
    league_results = {
        competitor.id: competitor_to_league_result(competitor, len(list(events)))
        for competitor in competitors
        if age_class_matches_filter(league_class.age_class_filter, competitor.age_class)
        and club_matches_filter(league_class.club_filter, competitor.club)
    }

    events_with_results: list[LeagueEvent] = []
    for event in events:
        event_results = [
            result
            for result in await get_results_for_event(event, league_class)
            if league_results.get(result.competitor)
        ]

        if len(list(event_results)) == 0:
            continue

        event_index = len(events_with_results)
        events_with_results.append(event)

        event_results = list(assign_position_based_on_time(event_results))

        scoring_method = event.overridden_scoring_method or league.scoring_method
        points_calculator = get_matching_points_calculator(scoring_method)
        points_calculator.calculate_required_stats(event_results)

        for result in event_results:
            points = (
                points_calculator.calculate_points(
                    result, league_results[result.competitor].age_class
                )
                if result.type not in DYNAMIC_RESULT_TYPES
                else result.file_points or 0
            )

            league_results[result.competitor].points[event_index] = LeagueResultScore(
                score=points,
                event=event.event,
                type=result.type,
            )

    for competitor in league_results.values():
        competitor = calculate_dynamic_results(competitor)
        counting_points = find_counting_results(
            competitor.points, league, events_with_results, league_groups, league_class
        )
        for point in competitor.points:
            if point:
                point.counting = point in counting_points
            if point and point.counting:
                competitor.total_points += point.score

    results = [
        result
        for result in league_results.values()
        if any([points is not None for points in result.points])
    ]
    results.sort(key=lambda x: x.total_points, reverse=True)
    assign_position_based_on_points(results)

    return LeagueResultsResponse(
        league=league.name,
        class_name=cls,
        classes=[cls.name for cls in league_classes],
        results=results,
        events=events_with_results,
    )


@router.post("/{league_name}/classes", response_model=Message)
async def create_league_class(
    cls: LeagueClass,
    league_name: str = Path(
        title="League Name",
        description="Name of the league",
        example="Sprintelope 2021",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    league = await Leagues.get_by_name(league_name)

    if not league:
        raise HTTP_404(f"Couldn't find league with name `{cls.league}`")

    if league_name != cls.league:
        raise HTTP_400("League in body and URL don't match")

    if await LeagueClasses.get_by_name(league.name, cls.name):
        raise HTTP_409(
            f"League class `{cls.name}` already exists for league `{league.name}`"
        )

    await LeagueClasses.create(cls)

    raise HTTP_201(f"League class `{cls.name}` created for league `{cls.league}`")


@router.get("/{league_name}/classes/{cls}", response_model=LeagueClass)
async def get_league_class(
    league_name: str = Path(
        title="League Name",
        description="Name of the league ",
        example="Sprintelope 2021",
    ),
    cls: str = Path(
        title="Class Name",
        description="Name of the class",
        example="Sprintelope 2021",
    ),
) -> LeagueClass:
    result = await LeagueClasses.get_by_name(league_name, cls)

    if not result:
        raise HTTP_404(f"No class named `{cls}` exists")

    return result


@router.put("/{league_name}/classes/{class_name}", response_model=Message)
async def update_league_class(
    cls: LeagueClass,
    league_name: str = Path(
        title="League Name",
        description="Name of the league ",
        example="Sprintelope 2021",
    ),
    class_name: str = Path(
        title="Class Name",
        description="Name of the class",
        example="Sprintelope 2021",
    ),
) -> Message:
    success = await LeagueClasses.update(league_name, class_name, cls)

    if success:
        return Message(detail=f"League class `{class_name}` updated")
    else:
        raise HTTP_404(f"Couldn't find league class with the name `{class_name}`")


@router.delete("/{league_name}/classes/{name}", response_model=Message)
async def delete_league_class(
    league_name: str = Path(
        title="League Name",
        description="Name of the league",
        example="Sprintelope 2021",
    ),
    name: str = Path(
        title="Class Name",
        description="Name of the league class to delete",
        example="Long",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    await LeagueClasses.delete_by_name(name)

    return Message(detail=f"League class `{name}` deleted")
