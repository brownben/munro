import asyncio
from typing import Iterable

from fastapi import Path
from fastapi.param_functions import Depends
from fastapi.routing import APIRouter

from ..database import Events, Leagues, Results
from ..exceptions import HTTP_201, HTTP_404, HTTP_409, HTTP_500
from ..schemas import (
    Event,
    EventCreationRequest,
    EventWithResults,
    EventWithUploadKey,
    Message,
)
from ..utils.assign_positions import assign_position_based_on_time
from .authentication import require_authentication

router = APIRouter(
    prefix="/events",
    tags=["Events"],
)


@router.get("/", response_model=list[Event])
async def get_all_event_details() -> Iterable[EventWithUploadKey]:
    return await Events.get_all()


@router.post("/", response_model=Message)
async def create_event(
    event: EventCreationRequest,
    authentication: bool = Depends(require_authentication),
) -> Message:
    league = await Leagues.get_by_name(event.league)
    if not league:
        raise HTTP_500(f"Couldn't find league `{event.league}`")

    existing_event = await Events.get_by_id(
        f"{event.name.replace(' ', '')}-{event.date}"
    )
    if existing_event:
        raise HTTP_409(f"Event `{event.name}` already exists")

    await Events.create(event, league)
    raise HTTP_201(f"Event `{event.name}` created")


@router.get("/upload-key", response_model=list[EventWithUploadKey])
async def get_all_event_details_with_upload_key(
    authentication: bool = Depends(require_authentication),
) -> Iterable[EventWithUploadKey]:
    return await Events.get_all()


@router.get("/latest-results", response_model=list[Event])
async def get_latest_results() -> Iterable[Event]:
    return await Events.get_latest_with_results()


@router.get("/results-submission", response_model=list[Event])
async def get_events_allowing_results_submission() -> Iterable[Event]:
    return await Events.get_allowing_results_submission()


@router.get("/{id}", response_model=Event)
async def get_event_details(
    id: str = Path(
        title="Event ID",
        description="ID of the event to fetch",
        example="Tentsmuir2021-08-12",
    ),
) -> EventWithUploadKey:
    result = await Events.get_by_id(id)

    if not result:
        raise HTTP_404(f"Couldn't find event with the id `{id}`")

    return result


@router.put("/{id}", response_model=Message)
async def update_event_details(
    event: Event,
    id: str = Path(
        title="Event ID",
        description="ID of the event to fetch",
        example="Tentsmuir2021-08-12",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    result = await Events.update(id, event)

    match result:
        case "updated":
            return Message(detail=f"Event `{event.name}` updated")
        case "id-exists":
            raise HTTP_409(
                f"Event already exists with name `{event.name}` and date `{event.date}`"
            )
        case "no-event":
            raise HTTP_404(f"Couldn't find event with the id `{id}`")


@router.delete("/{id}", response_model=Message)
async def delete_event(
    id: str = Path(
        title="Event ID",
        description="ID of the event to fetch",
        example="Tentsmuir2021-08-12",
    ),
    authentication: bool = Depends(require_authentication),
) -> Message:
    await Events.delete_by_id(id)

    return Message(detail=f"Event with id `{id}` deleted")


@router.get("/{id}/upload-key", response_model=EventWithUploadKey)
async def get_event_details_with_upload_key(
    id: str = Path(
        title="Event ID",
        description="ID of the event to fetch",
        example="Tentsmuir2021-08-12",
    ),
    authentication: bool = Depends(require_authentication),
) -> EventWithUploadKey:
    result = await Events.get_by_id(id)

    if not result:
        raise HTTP_404(f"Couldn't find event with the id `{id}`")

    return result


@router.get("/{id}/results", response_model=EventWithResults)
async def get_results_for_event(
    id: str = Path(
        title="Event ID",
        description="ID of the event to fetch results for",
        example="Tentsmuir2021-08-12",
    ),
) -> EventWithResults:
    event, results, league = await asyncio.gather(
        Events.get_by_id(id),
        Results.get_event_results(id),
        Events.get_league_for_event(id),
    )

    if not event:
        raise HTTP_404(f"Couldn't find event with the id `{id}`")

    return EventWithResults(
        **event.dict(),
        results=assign_position_based_on_time(results or []),
        league=league,
    )
