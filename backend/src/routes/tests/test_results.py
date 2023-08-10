from ...database import Results
from .helpers import TestCaseWithDatabase


class TestResultRoutes(TestCaseWithDatabase):
    async def test_transfer(self) -> None:
        response = self.client.post(
            "/results/transfer",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={"competitor": 3, "result": 2},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Result successfully tranferred"})

        result_from_database = await Results.get_by_id(2)
        assert result_from_database is not None
        self.assertEqual(result_from_database.competitor, 3)

    async def test_transfer_incorrect_fields(self) -> None:
        response = self.client.post(
            "/results/transfer",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={"result": 2},
        )

        self.assertEqual(response.status_code, 422)

        result_from_database = await Results.get_by_id(2)
        assert result_from_database is not None
        self.assertNotEqual(result_from_database.competitor, 3)

    async def test_update_result(self) -> None:
        def request(data: dict[str, bool]) -> None:
            response = self.client.patch(
                "/results/2",
                headers={"Authorization": "Bearer SuperSecretTest"},
                json=data,
            )

            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), {"detail": "Result `2` updated"})

        async def get_result() -> dict[str, bool]:
            result = await Results.get_by_id(2)
            assert result is not None
            return {"visible": result.visible, "incomplete": result.incomplete}

        request({"visible": True, "incomplete": False})
        result_from_database = await get_result()
        self.assertEqual(result_from_database["visible"], True)
        self.assertEqual(result_from_database["incomplete"], False)

        request({"visible": False})
        result_from_database = await get_result()
        self.assertEqual(result_from_database["visible"], False)
        self.assertEqual(result_from_database["incomplete"], False)

        request({"incomplete": True})
        result_from_database = await get_result()
        self.assertEqual(result_from_database["visible"], False)
        self.assertEqual(result_from_database["incomplete"], True)

    async def test_create_manual_result(self) -> None:
        results_before = list(await Results.get_by_competitor(1))

        response = self.client.post(
            "/results/",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "competitor": 1,
                "event": "TheFinalCountdown-2021-12-24",
                "course": "Long",
                "type": "manual",
                "time": "",
                "points": 100,
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Result created successfully"})

        results_after = list(await Results.get_by_competitor(1))
        self.assertEqual(len(results_after), len(results_before) + 1)

        result = list(await Results.get_by_competitor(1))[-1]
        self.assertEqual(result.file_points, 100)
        self.assertEqual(result.time, 0)
        self.assertEqual(result.type, "manual")
