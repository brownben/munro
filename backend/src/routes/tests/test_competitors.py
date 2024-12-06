from unittest.mock import AsyncMock, MagicMock, patch

from ...database import Competitors, Results
from .helpers import TestCaseWithDatabase
from .sample_data import sample_competitors


class TestGetCompetitorRoutes(TestCaseWithDatabase):
    def test_get_all_competitors(self) -> None:
        response = self.client.get("/competitors")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), [c.model_dump() for c in sample_competitors])

    def test_get_competitor_details(self) -> None:
        response = self.client.get("/competitors/1")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), sample_competitors[0].model_dump())

    def test_get_competitor_details_not_found(self) -> None:
        response = self.client.get("/competitors/77")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(), {"detail": "Couldn't find competitor with the id `77`"}
        )

    def test_get_competitor_results(self) -> None:
        response = self.client.get("/competitors/1/results")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "name": "Robert Jones",
                "competitor_pool": "Edinburgh Summer 2021",
                "club": "HAT",
                "age_class": "M18",
                "id": 1,
                "results": [
                    {
                        "id": 1,
                        "visible": True,
                        "time": 123,
                        "course": "Long",
                        "incomplete": False,
                        "type": "",
                        "file_points": None,
                        "event": "TestEvent-2021-12-12",
                        "competitor": 1,
                        "event_name": "Test Event",
                    }
                ],
                "league": "Sprintelope 2021",
            },
        )

    def test_get_competitor_results_not_found(self) -> None:
        response = self.client.get("/competitors/77/results")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(), {"detail": "Couldn't find competitor with the id `77`"}
        )


class TestModifyCompetitorRoutes(TestCaseWithDatabase):
    async def test_create_competitor(self) -> None:
        competitor = await Competitors.get_by_name_and_pool(
            "Suzie Dent", "Night Events"
        )
        self.assertEqual(competitor, None)

        response = self.client.post(
            "/competitors/",
            json={
                "name": "Suzie Dent",
                "competitor_pool": "Night Events",
                "age_class": "W40",
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        competitor = await Competitors.get_by_name_and_pool(
            "Suzie Dent", "Night Events"
        )
        self.assertNotEqual(competitor, None)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Competitor `Suzie Dent` created"})

    @patch("src.routes.competitors.Competitors")
    def test_create_competitor_missing_name(self, mock_competitors: MagicMock) -> None:
        mock_competitors.create = AsyncMock(None)

        response = self.client.post(
            "/competitors/",
            json={
                "competitor_pool": "Night Events",
                "age_class": "W40",
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        mock_competitors.create.assert_not_called()
        self.assertEqual(response.status_code, 422)

    async def test_update_competitor(self) -> None:
        competitor = await Competitors.get_by_id(3)
        assert competitor is not None
        self.assertNotEqual(competitor.name, "Suzie Dent")
        self.assertNotEqual(competitor.age_class, "W40")
        self.assertNotEqual(competitor.club, "GREEN")

        response = self.client.put(
            "/competitors/3",
            json={
                "name": "Suzie Dent",
                "competitor_pool": "Edinburgh Summer 2021",
                "age_class": "W40",
                "club": "GREEN",
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Competitor `Suzie Dent` updated"})

        competitor = await Competitors.get_by_id(3)
        assert competitor is not None
        self.assertEqual(competitor.name, "Suzie Dent")
        self.assertEqual(competitor.age_class, "W40")
        self.assertEqual(competitor.club, "GREEN")

    def test_update_competitor_not_found(self) -> None:
        response = self.client.put(
            "/competitors/5656",
            json={
                "name": "Suzie Dent",
                "competitor_pool": "Edinburgh Summer 2021",
                "age_class": "W40",
                "club": "GREEN",
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 404)

    async def test_merge_competitors(self) -> None:
        original_competitors_count = await Competitors.count()
        competitor_1 = await Competitors.get_by_id(1)
        competitor_2_original_results = list(await Results.get_by_competitor(2))

        self.assertNotEqual(competitor_1, None)

        response = self.client.post(
            "/competitors/merge",
            json={
                "competitor_to_merge": 1,
                "competitor_to_keep": 2,
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Competitors merged successfully"})

        new_competitors_count = await Competitors.count()
        competitor_1 = await Competitors.get_by_id(1)
        competitor_2_updated_results = list(await Results.get_by_competitor(2))

        self.assertEqual(competitor_1, None)
        self.assertEqual(new_competitors_count, original_competitors_count - 1)
        self.assertGreater(
            len(competitor_2_updated_results), len(competitor_2_original_results)
        )

    async def test_merge_competitors_same_competitor(self) -> None:
        original_competitor_count = await Competitors.count()
        competitor_2 = await Competitors.get_by_id(2)

        self.assertNotEqual(competitor_2, None)

        response = self.client.post(
            "/competitors/merge",
            json={
                "competitor_to_merge": 2,
                "competitor_to_keep": 2,
            },
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(), {"detail": "Competitors are the same, no action taken"}
        )

        new_competitor_count = await Competitors.count()
        competitor_2 = await Competitors.get_by_id(2)
        self.assertNotEqual(competitor_2, None)
        self.assertEqual(new_competitor_count, original_competitor_count)

    @patch("src.routes.competitors.Competitors")
    def test_merge_competitors_no_auth(self, mock_competitors: MagicMock) -> None:
        mock_competitors.merge = AsyncMock(None)

        response = self.client.put(
            "/competitors/merge",
            json={
                "competitor_to_merge": 65,
                "competitor_to_keep": 32,
            },
        )

        mock_competitors.merge.assert_not_called()
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json(), {"detail": "Not authenticated"})
