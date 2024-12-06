import json
from typing import cast

from .helpers import TestCaseWithDatabase
from .sample_data import sample_competitor_pools, sample_competitors, sample_events


class TestCompetitorPoolRoutes(TestCaseWithDatabase):
    def test_get_all_competitor_pools(self) -> None:
        response = self.client.get("/competitor-pools")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), sample_competitor_pools)

    def test_get_competitors_in_pool(self) -> None:
        competitors_in_pool = [
            competitor
            for competitor in sample_competitors
            if competitor.competitor_pool == "Edinburgh Summer 2021"
        ]

        response = self.client.get(
            "/competitor-pools/Edinburgh Summer 2021/competitors"
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [competitor.model_dump() for competitor in competitors_in_pool],
        )

    def test_get_events_in_pool(self) -> None:
        response = self.client.get("/competitor-pools/Edinburgh Summer 2021/events")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            sorted(
                [
                    json.loads(event.model_dump_json(exclude={"upload_key"}))
                    for event in sample_events
                    if event.competitor_pool == "Edinburgh Summer 2021"
                ],
                key=lambda event: cast(str, event["date"]),
            ),
        )
