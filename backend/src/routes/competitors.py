import asyncio
from collections.abc import Iterable

from fastapi import Depends, Path
from fastapi.routing import APIRouter

from ..database import Competitors, Results
from ..exceptions import HTTP_404
from ..schemas import (
    Competitor,
    CompetitorMergeRequest,
    CompetitorOverview,
    Message,
    NewCompetitor,
)
from .authentication import require_authentication

router = APIRouter(
    prefix="/competitors",
    tags=["Competitors"],
)


@router.get("/", response_model=list[Competitor])
async def get_all_competitors() -> Iterable[Competitor]:
    return await Competitors.get_all()


@router.post("/", response_model=Message)
async def create_competitor(
    competitor: NewCompetitor,
    authentication: bool = Depends(require_authentication),
) -> Message:
    await Competitors.create(competitor)

    return Message(detail=f"Competitor `{competitor.name}` created")


@router.get("/{id}", response_model=Competitor)
async def get_competitor_details(
    id: int = Path(
        title="Competitor ID",
        description="ID of the competitor to fetch",
        examples=[7],
    ),
) -> Competitor:
    result = await Competitors.get_by_id(id)

    if not result:
        raise HTTP_404(f"Couldn't find competitor with the id `{id}`")

    return result


@router.put("/{id}", response_model=Message)
async def update_competitor_details(
    competitor: NewCompetitor,
    id: int = Path(
        title="Competitor ID",
        description="ID of the competitor to fetch",
        examples=[7],
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    success = await Competitors.update_by_id(id, competitor)

    if success:
        return Message(detail=f"Competitor `{competitor.name}` updated")
    else:
        raise HTTP_404(f"Couldn't find competitor with the id `{id}`")


@router.get("/{id}/results", response_model=CompetitorOverview)
async def get_overview_for_competitor(
    id: int = Path(
        title="Competitor ID",
        description="ID of the competitor to fetch results for",
        examples=[7],
    ),
) -> CompetitorOverview:
    competitor, results, league = await asyncio.gather(
        Competitors.get_by_id(id),
        Results.get_by_competitor(id),
        Competitors.get_league_for_competitor(id),
    )

    if not competitor:
        raise HTTP_404(f"Couldn't find competitor with the id `{id}`")

    return CompetitorOverview(**competitor.dict(), results=results, league=league)


@router.post("/merge", response_model=Message)
async def merge_competitors(
    request: CompetitorMergeRequest,
    authentication: bool = Depends(require_authentication),
) -> Message:
    if request.competitor_to_keep == request.competitor_to_merge:
        return Message(detail="Competitors are the same, no action taken")

    await Competitors.merge(
        competitor_to_keep=request.competitor_to_keep,
        competitor_to_merge=request.competitor_to_merge,
    )
    return Message(detail="Competitors merged successfully")
