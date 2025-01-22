import asyncio
from collections.abc import Iterable

from fastapi import Path
from fastapi.routing import APIRouter

from ..database import Competitors, Events, Leagues
from ..exceptions import HTTP_404
from ..schemas import (
    Competitor,
    CompetitorPool,
    CompetitorPoolOverview,
    Event,
    EventWithUploadKey,
    League,
)

router = APIRouter(
    prefix="/competitor-pools",
    tags=["Competitor Pools"],
)


@router.get("/", response_model=list[CompetitorPool])
async def get_all_competitor_pools() -> Iterable[CompetitorPool]:
    return await Competitors.get_all_pools()


@router.get("/{name}", response_model=CompetitorPoolOverview)
async def get_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        examples=["Edinburgh Winter 2020"],
    ),
) -> CompetitorPoolOverview:
    pool, leagues, competitors = await asyncio.gather(
        Competitors.get_pool_by_name(name),
        Leagues.get_by_competitor_pool(name),
        Competitors.get_by_pool(name),
    )

    if pool is None:
        raise HTTP_404(f"Couldn't find competitor pool with the name `{name}`")

    return CompetitorPoolOverview(
        name=pool.name,
        eligibility=pool.eligibility,
        leagues=leagues,
        competitors=competitors,
    )


@router.get("/{name}/leagues", response_model=list[League])
async def get_leagues_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        examples=["Edinburgh Winter 2020"],
    ),
) -> Iterable[League]:
    return await Leagues.get_by_competitor_pool(name)


@router.get("/{name}/competitors", response_model=list[Competitor])
async def get_competitors_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        examples=["Edinburgh Winter 2020"],
    ),
) -> Iterable[Competitor]:
    return await Competitors.get_by_pool(name)


@router.get("/{name}/events", response_model=list[Event])
async def get_events_in_competitor_pool(
    name: str = Path(
        title="Competitor Pool Name",
        examples=["Edinburgh Winter 2020"],
    ),
) -> Iterable[EventWithUploadKey]:
    return await Events.get_by_competitor_pool(name)
