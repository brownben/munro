from typing import Literal

from fastapi.routing import APIRouter
from pydantic.networks import HttpUrl

from ..database import Competitors, Events, Results
from ..exceptions import HTTP_401, HTTP_403, HTTP_404, HTTP_500
from ..schemas import (
    Message,
    NewCompetitor,
    ResultBeforeDatabase,
    UploadFileRequest,
    UploadResultRequest,
    UploadURLRequest,
)
from ..utils.get_results import get_document_from_url
from ..utils.import_file import ImportException as ImportException
from ..utils.import_file import import_results_from_file
from ..utils.match_results import match_result_to_competitor
from ..utils.times import parse_time

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


async def process_upload_file(
    event_id: str,
    upload_key: str,
    file: str,
    overwrite: bool,
    partial: bool,
    results_links: dict[str, HttpUrl | Literal[""]] | None,
) -> Message:
    event = await Events.get_by_id(event_id)

    if not event:
        raise HTTP_404("Problem uploading results - Event doesn't exist")
    elif upload_key != event.upload_key:
        raise HTTP_401("Permission Denied - Upload key incorrect")
    elif event.results_uploaded and not (overwrite or partial):
        raise HTTP_403(
            "Results already exist for this event and overwrite was not enabled"
        )
    elif overwrite and not partial:
        await Results.delete_by_event_no_type(event.id)

    competitors = list(await Competitors.get_by_pool(event.competitor_pool))

    try:
        imported_results = import_results_from_file(file)
    except ImportException as exception:
        raise HTTP_500(exception.message)

    results = []
    for full_result in imported_results:
        result = ResultBeforeDatabase(**dict(full_result), event=event_id)
        competitor_found = match_result_to_competitor(full_result, competitors)

        if competitor_found:
            result.competitor = competitor_found.id
        else:
            result.competitor = await Competitors.create(
                NewCompetitor(
                    **dict(full_result),
                    competitor_pool=event.competitor_pool,
                )
            )

        results.append(result)

    await Results.create_multiple(results)
    await Events.update_results_links(event_id, results_links or {})

    return Message(detail=f"{len(results)} Results Imported")


@router.post("/file", response_model=Message)
async def upload_results_file(request: UploadFileRequest) -> Message:
    return await process_upload_file(
        request.event_id,
        request.upload_key,
        request.file,
        request.overwrite,
        request.partial,
        request.results_links,
    )


@router.post("/url", response_model=Message)
async def upload_results_url(request: UploadURLRequest) -> Message:
    file = await get_document_from_url(str(request.url))

    if not request.results_links.get("Standard Results"):
        request.results_links["Standard Results"] = request.url

    return await process_upload_file(
        request.event_id,
        request.upload_key,
        file,
        request.overwrite,
        request.partial,
        request.results_links,
    )


@router.post("/result", response_model=Message)
async def add_result(request: UploadResultRequest) -> Message:
    event = await Events.get_by_id(request.event)

    if not event:
        raise HTTP_404("Problem uploading result - Event doesn't exist")
    elif not event.allow_user_submitted_results:
        raise HTTP_401("Event doesn't accept user submitted results")

    competitor = await Competitors.get_by_name_and_pool(
        request.name, event.competitor_pool
    )
    if not competitor:
        competitor_id = await Competitors.create(
            NewCompetitor(
                name=request.name,
                competitor_pool=event.competitor_pool,
                age_class=request.age_class or "",
                club=request.club or "",
            )
        )
    else:
        competitor_id = competitor.id

    time = parse_time(request.time)
    await Results.create(
        ResultBeforeDatabase(
            time=time,
            course=request.course,
            incomplete=not time,
            file_points=0,
            event=event.id,
            competitor=competitor_id,
            type="user-upload",
        )
    )

    return Message(detail=f"Result created for `{request.name}`")
