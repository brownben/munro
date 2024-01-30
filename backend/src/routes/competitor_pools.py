from typing import Iterable

from fastapi import Path
from fastapi.routing import APIRouter

from ..database import Competitors, Events, Leagues
from ..schemas import Competitor, Event, EventWithUploadKey, League

router = APIRouter(
    prefix="/competitor-pools",
    tags=["Competitor Pools"],
)


@router.get("/", response_model=list[str])
async def get_all_competitor_pools() -> Iterable[str]:
    return await Competitors.get_all_pools()


@router.get("/{name}/leagues", response_model=list[League])
async def get_leagues_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        example="Edinburgh Winter 2020",
    ),
) -> Iterable[League]:
    return await Leagues.get_by_competitor_pool(name)


@router.get("/{name}/competitors", response_model=list[Competitor])
async def get_competitors_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        example="Edinburgh Winter 2020",
    ),
) -> Iterable[Competitor]:
    return await Competitors.get_by_pool(name)


@router.get("/{name}/events", response_model=list[Event])
async def get_events_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        example="Edinburgh Winter 2020",
    ),
) -> Iterable[EventWithUploadKey]:
    return await Events.get_by_competitor_pool(name)
