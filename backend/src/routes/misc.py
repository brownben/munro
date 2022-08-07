import re

from fastapi.routing import APIRouter

from src.utils.assign_positions import assign_position_based_on_time

from ..database import Events, Leagues, Results
from ..exceptions import HTTP_500
from ..schemas import EventResult, EventWithResults, HomeDetails
from ..utils.get_results import get_document_from_url
from ..utils.import_file import ImportException, import_results_from_file

router = APIRouter(
    prefix="/misc",
    tags=["Miscellaneous"],
)


def get_event_name_from_sitiming_html(html: str) -> str:
    heading = re.search("<h2>(.*?)</h2>", html)

    if not heading:
        raise HTTP_500("Expected results to have a heading")

    return heading.group(1).replace("Results for ", "").strip().split(" -")[0]


@router.get("/sitiming", response_model=EventWithResults)
async def get_results_from_sitiming(url: str) -> EventWithResults:
    html = await get_document_from_url(url)
    event_name = get_event_name_from_sitiming_html(html)

    try:
        imported_results = import_results_from_file(html)
    except ImportException as exception:
        raise HTTP_500(exception.message)

    return EventWithResults(
        id=event_name,
        league="",
        website="",
        name=event_name,
        results_links={"Standard Results": url},
        results=assign_position_based_on_time(
            (
                EventResult(
                    competitor=0,
                    event=event_name,
                    type="sitiming",
                    id=index,
                    **dict(result),
                )
                for index, result in enumerate(imported_results)
            )
        ),
    )


@router.get("/home", response_model=HomeDetails)
async def get_home_details() -> HomeDetails:
    return HomeDetails(
        latestResults=(await Events.get_latest_with_results(5)),
        results=await Results.count(),
        events=await Events.count(),
        leagues=await Leagues.count(),
    )
