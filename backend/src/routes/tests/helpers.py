import os
from typing import Any, cast
from unittest import IsolatedAsyncioTestCase

import pydantic
from fastapi.testclient import TestClient
from piccolo.engine import engine_finder

from ...app import app
from ...database.tables import (
    Competitor,
    CompetitorPool,
    Event,
    League,
    LeagueClass,
    LeagueEvent,
    LeagueGroup,
    Result,
)
from ..authentication import mock_require_authentication, require_authentication
from .sample_data import (
    sample_competitor_pools,
    sample_competitors,
    sample_events,
    sample_league_classes,
    sample_league_events,
    sample_leagues,
    sample_results,
)


async def _create_tables() -> None:
    tables = [
        CompetitorPool,
        League,
        LeagueClass,
        LeagueGroup,
        Event,
        LeagueEvent,
        Competitor,
        Result,
    ]

    for table in tables:
        await table.create_table(if_not_exists=True).run()  # type: ignore


async def _add_sample_data() -> None:
    await CompetitorPool.delete(force=True).run()
    await CompetitorPool.insert(
        *(
            CompetitorPool(name=competitor_pool)
            for competitor_pool in sample_competitor_pools
        )
    ).run()

    tables_and_data = [
        (League, sample_leagues),
        (LeagueClass, sample_league_classes),
        (Competitor, sample_competitors),
        (Event, sample_events),
        (LeagueEvent, sample_league_events),
        (Result, sample_results),
    ]
    for table, sample_data in tables_and_data:
        sample_data = cast(list[pydantic.BaseModel], sample_data)

        await table.delete(force=True).run()
        await table.insert(
            *(table(**replace_website(row)) for row in sample_data)
        ).run()


def replace_website(model: pydantic.BaseModel) -> dict[str, Any]:
    dict = model.model_dump()

    if "website" in dict:
        dict["website"] = str(dict["website"])

    if "results_links" in dict:
        dict["results_links"] = {k: str(v) for k, v in dict["results_links"].items()}

    return dict


def get_client() -> TestClient:
    # Mock authentication, so Firebase isn't called during tests
    app.dependency_overrides[require_authentication] = mock_require_authentication

    return TestClient(app)


class TestCaseWithDatabase(IsolatedAsyncioTestCase):
    client: TestClient

    @classmethod
    async def asyncSetUp(self) -> None:
        # Use SQlite instead of Postgres for tests
        os.environ["PICCOLO_CONF"] = "src.test_database_conf"

        # Populate database
        await _create_tables()
        await _add_sample_data()

        self.client = get_client()

    @classmethod
    def tearDown(self) -> None:
        engine_finder().remove_db_file()  # type: ignore
