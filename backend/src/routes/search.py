import asyncio

from fastapi.routing import APIRouter

from ..database import Competitors, Events, Leagues
from ..schemas import SearchResult

router = APIRouter(
    prefix="/search",
    tags=["Search"],
)


@router.get("", response_model=SearchResult)
async def search(query: str) -> SearchResult:
    leagues, events, competitors = await asyncio.gather(
        Leagues.search(query), Events.search(query), Competitors.search(query)
    )
    return SearchResult(leagues=leagues, events=events, competitors=competitors)
