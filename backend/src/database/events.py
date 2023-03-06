import base64
import datetime
import os
from typing import Any, Iterable, Literal, Optional, cast

from piccolo.query.methods.select import Count
from pydantic.networks import HttpUrl

from ..schemas import (
    Event,
    EventCreationRequest,
    EventWithLeagueDetailsAndUploadKey,
    EventWithUploadKey,
    League,
    LeagueEvent,
)
from .tables import Event as EventTable
from .tables import LeagueEvent as LeagueEventTable

event_fields = (
    EventTable.id,
    EventTable.name,
    EventTable.date,
    EventTable.competitor_pool,
    EventTable.organiser,
    EventTable.part_of,
    EventTable.website,
    EventTable.more_information,
    EventTable.results_links,
    EventTable.upload_key,
    EventTable.results_uploaded,
    EventTable.results_uploaded_time,
    EventTable.allow_user_submitted_results,
)

league_event_fields = (
    LeagueEventTable.id,
    LeagueEventTable.event,
    LeagueEventTable.league,
    LeagueEventTable.compulsory,
    LeagueEventTable.league_group,
    LeagueEventTable.overridden_scoring_method,
    LeagueEventTable.expected_courses,
)


def as_event(record: dict[str, Any]) -> Optional[EventWithUploadKey]:
    if not record:
        return None

    return EventWithUploadKey.parse_obj(record)


def generate_upload_key() -> str:
    random = os.urandom(15)
    string = str(base64.b64encode(random))
    return string[2:22]


class Events:
    @staticmethod
    async def create(event: EventCreationRequest, league: League) -> None:
        id = f"{event.name.replace(' ', '')}-{event.date}"
        competitor_pool = league.competitor_pool

        await EventTable.insert(
            EventTable(
                id=id,
                name=event.name,
                competitor_pool=competitor_pool,
                date=event.date,
                organiser=event.organiser,
                part_of=event.part_of,
                website=event.website,
                more_information=event.more_information,
                results_links=event.results_links,
                upload_key=generate_upload_key(),
                results_uploaded=False,
                results_uploaded_time=None,
                allow_user_submitted_results=event.allow_user_submitted_results,
            )
        ).run()

        await LeagueEventTable.insert(
            LeagueEventTable(
                event=id,
                league=event.league,
                compulsory=event.compulsory,
                league_group=event.league_group or None,
                overridden_scoring_method=event.overridden_scoring_method,
                expected_courses=event.expected_courses or {},
            )
        ).run()

    @staticmethod
    async def get_all() -> Iterable[EventWithUploadKey]:
        return (
            EventWithUploadKey.parse_obj(event)
            for event in await EventTable.select(*event_fields)
            .order_by(EventTable.date, ascending=False)
            .output(load_json=True)
            .run()
        )

    @staticmethod
    async def get_by_id(id: str) -> Optional[EventWithUploadKey]:
        return as_event(
            await EventTable.select(*event_fields)
            .where(EventTable.id == id)
            .first()
            .output(load_json=True)
            .run()
        )

    @staticmethod
    async def get_league_for_event(id: str) -> str:
        event = (
            await LeagueEventTable.select(LeagueEventTable.league)
            .where(LeagueEventTable.event == id)
            .first()
            .run()
        )

        if not event:
            return ""

        return cast(str, event["league"])

    @staticmethod
    async def update(
        id: str, event: Event
    ) -> Literal["updated"] | Literal["id-exists"] | Literal["no-event"]:
        existing_event = (
            await EventTable.objects().where(EventTable.id == id).first().run()
        )

        if not existing_event:
            return "no-event"

        if event.name != existing_event.name or event.date != existing_event.date:
            new_id = f"{event.name.replace(' ', '')}-{event.date}"

            if (await EventTable.count().where(EventTable.id == new_id).run()) > 0:
                return "id-exists"

            await (
                EventTable.update({EventTable.id: new_id})
                .where(EventTable.id == id)
                .run()
            )

            existing_event = (
                await EventTable.objects().where(EventTable.id == new_id).first().run()
            )

        for key, value in event.dict().items():
            if key != "id":
                setattr(existing_event, key, value)

        await existing_event.save().run()

        return "updated"

    @staticmethod
    async def delete_by_id(id: str) -> None:
        await EventTable.delete().where(EventTable.id == id).run()

    @staticmethod
    async def get_latest_with_results(limit: int = 12) -> Iterable[EventWithUploadKey]:
        return (
            EventWithUploadKey.parse_obj(event)
            for event in await EventTable.select(*event_fields)
            .where(EventTable.results_uploaded == True)
            .order_by(EventTable.date, ascending=False)
            .limit(limit)
            .output(load_json=True)
            .run()
        )

    @staticmethod
    async def get_allowing_results_submission() -> Iterable[EventWithUploadKey]:
        return (
            EventWithUploadKey.parse_obj(event)
            for event in await EventTable.select(*event_fields)
            .where(EventTable.allow_user_submitted_results == True)
            .output(load_json=True)
            .run()
        )

    @staticmethod
    async def get_by_competitor_pool(
        competitor_pool: str,
    ) -> Iterable[EventWithUploadKey]:
        return (
            EventWithUploadKey.parse_obj(event)
            for event in await EventTable.select(*event_fields)
            .where(EventTable.competitor_pool == competitor_pool)
            .order_by(EventTable.date)
            .output(load_json=True)
            .run()
        )

    @staticmethod
    async def update_results_links(
        event_id: str, results_links: dict[str, HttpUrl | Literal[""]]
    ) -> None:
        await (
            EventTable.update(
                {
                    EventTable.results_links: results_links,
                    EventTable.results_uploaded: True,
                    EventTable.results_uploaded_time: datetime.datetime.now(),
                }
            )
            .where(EventTable.id == event_id)
            .run()
        )

    @staticmethod
    async def get_by_league(
        league: str,
    ) -> Iterable[EventWithLeagueDetailsAndUploadKey]:
        return (
            EventWithLeagueDetailsAndUploadKey(
                **event["event"],
                results_links=event["results_links"],
                group=event["group"],
            )
            for event in await LeagueEventTable.select(
                *LeagueEventTable.event.all_columns(exclude=[EventTable.results_links]),
                LeagueEventTable.event.results_links.as_alias("results_links"),
                LeagueEventTable.league_group.name.as_alias("group"),
            )
            .where(LeagueEventTable.league == league)
            .order_by(LeagueEventTable.event.date, LeagueEventTable.event.name)
            .output(load_json=True, nested=True)
            .run()
        )

    @staticmethod
    async def search(query: str) -> Iterable[EventWithUploadKey]:
        return (
            EventWithUploadKey.parse_obj(event)
            for event in await EventTable.select(*event_fields)
            .where(EventTable.name.ilike(f"%{query}%"))
            .order_by(EventTable.date, ascending=False)
            .output(load_json=True)
            .limit(12)
            .run()
        )

    @staticmethod
    async def count() -> int:
        return int(
            (await EventTable.select(Count(EventTable.id)).first().run())["count"] or 0
        )


class LeagueEvents:
    @staticmethod
    async def get_by_league_with_results(league: str) -> Iterable[LeagueEvent]:
        return [
            LeagueEvent.parse_obj(event)
            for event in await LeagueEventTable.select(
                *league_event_fields,
                LeagueEventTable.event.name.as_alias("event_name"),
            )
            .where(LeagueEventTable.league == league)
            .where(LeagueEventTable.event.results_uploaded == True)
            .order_by(LeagueEventTable.event.date)
            .output(load_json=True)
            .run()
        ]
