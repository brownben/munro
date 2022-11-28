from typing import Any, Iterable, Optional

from piccolo.query.methods.select import Count

from ..schemas import League, LeagueClass
from .tables import CompetitorPool as CompetitorPoolTable
from .tables import League as LeagueTable
from .tables import LeagueClass as LeagueClassTable
from .tables import LeagueGroup as LeagueGroupTable

league_fields = (
    LeagueTable.name,
    LeagueTable.tagline,
    LeagueTable.year,
    LeagueTable.coordinator,
    LeagueTable.website,
    LeagueTable.more_information,
    LeagueTable.visible,
    LeagueTable.scoring_method,
    LeagueTable.number_of_counting_events,
    LeagueTable.competitor_pool,
)

league_class_fields = (
    LeagueClassTable.name,
    LeagueClassTable.league,
    LeagueClassTable.standard_course,
    LeagueClassTable.age_class_filter,
    LeagueClassTable.club_filter,
    LeagueClassTable.number_of_counting_events,
)

league_group_fields = (
    LeagueGroupTable.name,
    LeagueGroupTable.league,
    LeagueGroupTable.min,
    LeagueGroupTable.max,
)


def as_league(record: dict[str, Any]) -> Optional[League]:
    if not record:
        return None

    return League.parse_obj(record)


def as_league_class(record: dict[str, Any]) -> Optional[LeagueClass]:
    if not record:
        return None

    return LeagueClass.parse_obj(record)


class Leagues:
    @staticmethod
    async def create(league: League) -> bool:
        if not league.competitor_pool:
            await CompetitorPoolTable.insert(
                CompetitorPoolTable(name=league.name)
            ).run()
            league.competitor_pool = league.name

        await LeagueTable.insert(
            LeagueTable(
                name=league.name,
                tagline=league.tagline,
                year=league.year,
                coordinator=league.coordinator,
                website=league.website,
                more_information=league.more_information,
                visible=league.visible,
                scoring_method=league.scoring_method,
                number_of_counting_events=league.number_of_counting_events,
                competitor_pool=league.competitor_pool,
            )
        ).run()

        return True

    @staticmethod
    async def update(name: str, league: League) -> bool:
        if league.name != name:
            await (
                LeagueTable.update({LeagueTable.name: league.name})
                .where(LeagueTable.name == name)
                .run()
            )

        existing_league = (
            await LeagueTable.objects()
            .where(LeagueTable.name == league.name)
            .first()
            .run()
        )

        if not existing_league:
            return False

        for key, value in league.dict().items():
            setattr(existing_league, key, value)

        await existing_league.save().run()

        return True

    @staticmethod
    async def get_all() -> Iterable[League]:
        return (
            League.parse_obj(league)
            for league in await LeagueTable.select(*league_fields)
            .order_by(LeagueTable.year, ascending=False)
            .order_by(LeagueTable.name)
            .where(LeagueTable.visible == True)
            .run()
        )

    @staticmethod
    async def get_by_name(name: str) -> Optional[League]:
        return as_league(
            await LeagueTable.select(*league_fields)
            .where(LeagueTable.name == name)
            .first()
            .run()
        )

    @staticmethod
    async def delete_by_name(name: str) -> None:
        await LeagueTable.delete().where(LeagueTable.name == name).run()

    @staticmethod
    async def search(query: str) -> Iterable[League]:
        return (
            League.parse_obj(league)
            for league in await LeagueTable.select(*league_fields)
            .where(
                LeagueTable.name.ilike(f"%{query}%")
                | LeagueTable.tagline.ilike(f"%{query}%")
            )
            .order_by(LeagueTable.year, ascending=False)
            .limit(6)
            .run()
        )

    @staticmethod
    async def count() -> int:
        return int(
            (await LeagueTable.select(Count(LeagueTable.name)).first().run())["count"]
            or 0
        )


class LeagueClasses:
    @staticmethod
    async def create(league_class: LeagueClass) -> None:
        await LeagueClassTable.insert(
            LeagueClassTable(
                name=league_class.name,
                league=league_class.league,
                standard_course=league_class.standard_course,
                age_class_filter=league_class.age_class_filter,
                club_filter=league_class.club_filter,
                number_of_counting_events=league_class.number_of_counting_events,
            )
        ).run()

    @staticmethod
    async def get_by_name(league: str, cls: str) -> Optional[LeagueClass]:
        return as_league_class(
            await LeagueClassTable.select(*league_class_fields)
            .where(LeagueClassTable.league == league)
            .where(LeagueClassTable.name == cls)
            .first()
            .run()
        )

    @staticmethod
    async def get_by_league(league: str) -> Iterable[LeagueClass]:
        return (
            LeagueClass.parse_obj(league)
            for league in await LeagueClassTable.select(*league_class_fields)
            .where(LeagueClassTable.league == league)
            .order_by(LeagueClassTable.name)
            .run()
        )

    @staticmethod
    async def update(league: str, name: str, cls: LeagueClass) -> bool:
        existing_class = (
            await LeagueClassTable.objects()
            .where(LeagueClassTable.league == league)
            .where(LeagueClassTable.name == name)
            .first()
            .run()
        )

        if not existing_class:
            return False

        for key, value in cls.dict().items():
            setattr(existing_class, key, value)

        await existing_class.save().run()

        return True

    @staticmethod
    async def delete_by_name(name: str) -> None:
        await LeagueClassTable.delete().where(LeagueClassTable.name == name).run()


class LeagueGroups:
    @staticmethod
    async def get_by_league(league: str) -> dict[str, tuple[int, int]]:
        return {
            group["name"]: (group["min"], group["max"])
            for group in await LeagueGroupTable.select(*league_group_fields)
            .where(LeagueGroupTable.league == league)
            .order_by(LeagueGroupTable.name)
            .run()
        }
