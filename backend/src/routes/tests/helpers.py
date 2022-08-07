import os
from unittest import TestCase

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


def _create_tables() -> None:
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
        table.create_table(if_not_exists=True).run_sync()


def _add_sample_data() -> None:
    CompetitorPool.delete(force=True).run_sync()
    CompetitorPool.insert(
        *(
            CompetitorPool(name=competitor_pool)
            for competitor_pool in sample_competitor_pools
        )
    ).run_sync()

    tables_and_data = [
        (League, sample_leagues),
        (LeagueClass, sample_league_classes),
        (Competitor, sample_competitors),
        (Event, sample_events),
        (LeagueEvent, sample_league_events),
        (Result, sample_results),
    ]
    for table, sample_data in tables_and_data:
        table.delete(force=True).run_sync()
        table.insert(*(table(**row.dict()) for row in sample_data)).run_sync()  # type: ignore


def get_client() -> TestClient:
    # Mock authentication, so Firebase isn't called during tests
    app.dependency_overrides[require_authentication] = mock_require_authentication

    return TestClient(app)


class TestCaseWithDatabase(TestCase):
    client: TestClient

    @classmethod
    def setUpClass(self) -> None:
        # Use SQlite instead of Postgres for tests
        os.environ["PICCOLO_CONF"] = "src.test_database_conf"

        # Populate database
        _create_tables()
        _add_sample_data()

        self.client = get_client()

    @classmethod
    def tearDownClass(self) -> None:
        engine_finder().remove_db_file()  # type: ignore
