from typing import cast

from ...database.tables import Result
from .helpers import TestCaseWithDatabase


class TestResultRoutes(TestCaseWithDatabase):
    def test_transfer(self) -> None:
        response = self.client.post(
            "/results/transfer",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={"competitor": 3, "result": 2},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Result successfully tranferred"})

        result_from_database = (
            Result.select(Result.competitor).where(Result.id == 2).first().run_sync()
        )
        self.assertEqual(result_from_database, {"competitor": 3})

        # Restore Database
        Result.update({Result.competitor: 2}).where(Result.id == 2).run_sync()

    def test_transfer_incorrect_fields(self) -> None:
        response = self.client.post(
            "/results/transfer",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={"result": 2},
        )

        self.assertEqual(response.status_code, 422)

        result_from_database = (
            Result.select(Result.competitor).where(Result.id == 2).first().run_sync()
        )
        self.assertNotEqual(result_from_database, {"competitor": 3})

    def test_update_result(self) -> None:
        def request(data: dict[str, bool]) -> None:
            response = self.client.patch(
                "/results/2",
                headers={"Authorization": "Bearer SuperSecretTest"},
                json=data,
            )

            self.assertEqual(response.status_code, 200)
            self.assertEqual(response.json(), {"detail": "Result `2` updated"})

        def get_result() -> dict[str, bool]:
            return cast(
                dict[str, bool],
                Result.select(Result.visible, Result.incomplete)
                .where(Result.id == 2)
                .first()
                .run_sync(),
            )

        request({"visible": True, "incomplete": False})
        result_from_database = get_result()
        self.assertEqual(result_from_database["visible"], True)
        self.assertEqual(result_from_database["incomplete"], False)

        request({"visible": False})
        result_from_database = get_result()
        self.assertEqual(result_from_database["visible"], False)
        self.assertEqual(result_from_database["incomplete"], False)

        request({"incomplete": True})
        result_from_database = get_result()
        self.assertEqual(result_from_database["visible"], False)
        self.assertEqual(result_from_database["incomplete"], True)

    def test_create_manual_result(self) -> None:
        results_before = Result.select().where(Result.competitor == 1).run_sync()

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

        results_after = Result.select().where(Result.competitor == 1).run_sync()
        self.assertEqual(len(results_after), len(results_before) + 1)

        result = (
            Result.select(Result.file_points, Result.time, Result.type)
            .where(Result.competitor == 1)
            .where(Result.event == "TheFinalCountdown-2021-12-24")
            .first()
            .run_sync()
        )
        self.assertEqual(result["file_points"], 100)
        self.assertEqual(result["time"], 0)
        self.assertEqual(result["type"], "manual")
