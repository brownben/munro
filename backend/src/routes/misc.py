from fastapi.routing import APIRouter

from ..database import Events, Leagues, Results
from ..schemas import HomeDetails, StatsOverview

router = APIRouter(
    prefix="/misc",
    tags=["Miscellaneous"],
)


@router.get("/home", response_model=HomeDetails)
async def get_home_details() -> HomeDetails:
    return HomeDetails(
        latestResults=(await Events.get_latest_with_results(5)),
        results=await Results.count(),
        events=await Events.count(),
        leagues=await Leagues.count(),
    )


@router.get("/stats", response_model=StatsOverview)
async def get_summary_stats() -> StatsOverview:
    return StatsOverview(
        results=await Results.count(),
        events=await Events.count(),
        leagues=await Leagues.count(),
    )
