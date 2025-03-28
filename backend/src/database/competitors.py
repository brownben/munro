from collections.abc import Iterable
from typing import Any

from piccolo.columns.combination import WhereRaw

from ..schemas import Competitor, CompetitorPool, NewCompetitor
from .tables import Competitor as CompetitorTable
from .tables import CompetitorPool as CompetitorPoolTable
from .tables import League as LeagueTable
from .tables import Result as ResultTable

competitor_fields = (
    CompetitorTable.id,
    CompetitorTable.name,
    CompetitorTable.competitor_pool,
    CompetitorTable.club,
    CompetitorTable.age_class,
    CompetitorTable.eligible,
)
competitor_pool_fields = (
    CompetitorPoolTable.name,
    CompetitorPoolTable.eligibility,
)


def as_competitor(record: dict[str, Any] | None) -> Competitor | None:
    if not record:
        return None

    return Competitor.model_validate(record)


def as_competitor_pool(record: dict[str, Any] | None) -> CompetitorPool | None:
    if not record:
        return None

    return CompetitorPool.model_validate(record)


class Competitors:
    @staticmethod
    async def get_all_pools() -> Iterable[CompetitorPool]:
        return (
            CompetitorPool.model_validate(competitor_pool)
            for competitor_pool in await CompetitorPoolTable.select(
                *competitor_pool_fields
            ).run()
        )

    @staticmethod
    async def get_pool_by_name(name: str) -> CompetitorPool | None:
        return as_competitor_pool(
            await CompetitorPoolTable.select(*competitor_pool_fields)
            .where(CompetitorPoolTable.name == name)
            .first()
            .run()
        )

    @staticmethod
    async def get_pool_count() -> int:
        database_result = await CompetitorPoolTable.count().run()
        return int(database_result)

    @staticmethod
    async def create(competitor: NewCompetitor) -> int:
        new_row = CompetitorTable(**competitor.model_dump())
        await new_row.save().run()
        return new_row.id

    @staticmethod
    async def get_all() -> Iterable[Competitor]:
        return (
            Competitor.model_validate(competitor)
            for competitor in await CompetitorTable.select(*competitor_fields)
            .order_by(CompetitorTable.id)
            .run()
        )

    @staticmethod
    async def get_by_pool(competitor_pool_name: str) -> Iterable[Competitor]:
        return (
            Competitor.model_validate(competitor)
            for competitor in await CompetitorTable.select(*competitor_fields)
            .where(CompetitorTable.competitor_pool == competitor_pool_name)
            .order_by(CompetitorTable.id)
            .run()
        )

    @staticmethod
    async def get_by_id(competitor_id: int) -> Competitor | None:
        return as_competitor(
            await CompetitorTable.select(*competitor_fields)
            .where(CompetitorTable.id == competitor_id)
            .first()
            .run()
        )

    @staticmethod
    async def get_by_name_and_pool(name: str, pool: str) -> Competitor | None:
        return as_competitor(
            await CompetitorTable.select(*competitor_fields)
            .where(WhereRaw("LOWER(name) == LOWER({})", name))
            .where(CompetitorTable.competitor_pool == pool)
            .first()
            .run()
        )

    @staticmethod
    async def update_by_id(competitor_id: int, competitor: NewCompetitor) -> bool:
        existing_competitor = (
            await CompetitorTable.objects()
            .where(CompetitorTable.id == competitor_id)
            .first()
            .run()
        )

        if not existing_competitor:
            return False

        for key, value in competitor.model_dump().items():
            setattr(existing_competitor, key, value)

        await existing_competitor.save().run()

        return True

    @staticmethod
    async def set_eligibility(competitor_id: int, new_eligibility: bool) -> None:
        await (
            CompetitorTable.update({CompetitorTable.eligible: new_eligibility})
            .where(CompetitorTable.id == competitor_id)
            .run()
        )

    @staticmethod
    async def merge(
        competitor_to_merge: int,
        competitor_to_keep: int,
    ) -> None:
        await (
            ResultTable.update({ResultTable.competitor: competitor_to_keep})
            .where(ResultTable.competitor == competitor_to_merge)
            .run()
        )

        await (
            CompetitorTable.delete()
            .where(CompetitorTable.id == competitor_to_merge)
            .run()
        )

    @staticmethod
    async def search(query: str) -> Iterable[Competitor]:
        return (
            Competitor.model_validate(competitor)
            for competitor in await CompetitorTable.select(*competitor_fields)
            .where(CompetitorTable.name.ilike(f"%{query}%"))
            .limit(12)
            .run()
        )

    @staticmethod
    async def get_league_for_competitor(id: int) -> str:
        competitor = (
            await CompetitorTable.select(CompetitorTable.competitor_pool)
            .where(CompetitorTable.id == id)
            .first()
            .run()
        )

        if not competitor:
            return ""

        league = (
            await LeagueTable.select(LeagueTable.name)
            .where(LeagueTable.competitor_pool == competitor["competitor_pool"])
            .first()
            .run()
        )

        if league:
            return str(league["name"])
        else:
            return ""

    @staticmethod
    async def count() -> int:
        database_result = await CompetitorTable.count().run()
        return int(database_result)
