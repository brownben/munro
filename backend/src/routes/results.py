from fastapi import Depends, Path
from fastapi.routing import APIRouter

from ..database import Results
from ..schemas import (
    ManualResultRequest,
    Message,
    ResultBeforeDatabase,
    ResultTransferRequest,
    ResultUpdate,
)
from ..utils.times import parse_time
from .authentication import require_authentication

router = APIRouter(
    prefix="/results",
    tags=["Results"],
)


@router.post("/", response_model=Message)
async def create_manual_result(
    request: ManualResultRequest,
    authentication: bool = Depends(require_authentication),
) -> Message:
    result = ResultBeforeDatabase(
        **request.model_dump(exclude={"time"}),
        time=parse_time(request.time),
        file_points=request.points,
    )
    await Results.create(result)
    return Message(detail="Result created successfully")


@router.post("/transfer", response_model=Message)
async def transfer_result(
    request: ResultTransferRequest,
    authentication: bool = Depends(require_authentication),
) -> Message:
    await Results.transfer(request.result, request.competitor)
    return Message(detail="Result successfully tranferred")


@router.patch("/{id}", response_model=Message)
async def update_result(
    result: ResultUpdate,
    id: int = Path(
        title="Competitor ID",
        description="ID of the competitor to fetch",
        examples=[7],
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    if result.visible is not None:
        await Results.set_visible(id, result.visible)

    if result.incomplete is not None:
        await Results.set_incomplete(id, result.incomplete)

    return Message(detail=f"Result `{id}` updated")
