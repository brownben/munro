from fastapi.routing import APIRouter

from ..database import Events, Leagues, Results
from ..schemas import HomeDetails

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
