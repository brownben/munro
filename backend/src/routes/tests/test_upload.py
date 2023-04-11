from unittest.mock import ANY

import httpx
import respx

from ...database.tables import Competitor as CompetitorTable
from ...database.tables import Result as ResultTable
from .helpers import TestCaseWithDatabase
from .sample_data import sample_csv_file


class TestUploadFile(TestCaseWithDatabase):
    def test_invalid_request(self) -> None:
        response = self.client.post("/upload/file", json={"upload_key": "12345"})

        self.assertEqual(response.status_code, 422)

    def test_missing_event(self) -> None:
        response = self.client.post(
            "/upload/file",
            json={
                "event_id": "TestMissing",
                "upload_key": "12345",
                "file": "",
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Problem uploading results - Event doesn't exist"},
        )

    def test_incorrect_upload_key(self) -> None:
        response = self.client.post(
            "/upload/file",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "12345",
                "file": "",
            },
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.json(),
            {"detail": "Permission Denied - Upload key incorrect"},
        )

    def test_existing_no_override(self) -> None:
        response = self.client.post(
            "/upload/file",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "file": "",
            },
        )

        self.assertEqual(response.status_code, 403)
        self.assertEqual(
            response.json(),
            {
                "detail": "Results already exist for this event and overwrite was not enabled"
            },
        )

    def test_raises_import_exceptions(self) -> None:
        response = self.client.post(
            "/upload/file",
            json={
                "event_id": "TestEvent-2022-02-03",
                "upload_key": "UploadKeyKeepSecret",
                "file": "",
            },
        )

        self.assertEqual(response.status_code, 500)
        self.assertEqual(
            response.json(), {"detail": "Expected file to have at least 1 row"}
        )

    def test_override_deletes_existing_results(self) -> None:
        results_for_event = (
            ResultTable.select(*ResultTable.all_columns())
            .where(ResultTable.event == "TestEvent-2021-12-12")
            .run_sync()
        )
        self.assertNotEqual(len(results_for_event), 0)

        self.client.post(
            "/upload/file",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "file": sample_csv_file,
                "overwrite": True,
                "results_links": {"Winsplits": "https://example.com"},
            },
        )

        results_for_event = (
            ResultTable.select(*ResultTable.all_columns())
            .where(ResultTable.event == "TestEvent-2021-12-12")
            .run_sync()
        )

        self.assertEqual(
            results_for_event,
            [
                {
                    "time": 894,
                    "course": "Long",
                    "incomplete": False,
                    "file_points": 0,
                    "event": "TestEvent-2021-12-12",
                    "type": "",
                    "visible": True,
                    "competitor": ANY,
                    "id": ANY,
                },
                {
                    "time": 906,
                    "course": "Long",
                    "incomplete": False,
                    "file_points": 0,
                    "event": "TestEvent-2021-12-12",
                    "type": "",
                    "visible": True,
                    "competitor": ANY,
                    "id": ANY,
                },
                {
                    "time": 1081,
                    "course": "Long",
                    "incomplete": False,
                    "file_points": 0,
                    "event": "TestEvent-2021-12-12",
                    "type": "",
                    "visible": True,
                    "competitor": ANY,
                    "id": ANY,
                },
            ],
        )


class TestUploadResult(TestCaseWithDatabase):
    def test_event_missing(self) -> None:
        response = self.client.post(
            "/upload/result",
            json={
                "event": "unknown",
                "name": "Bon Jovie",
                "age_class": "M55",
                "time": "53:21",
                "course": "Long",
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Problem uploading result - Event doesn't exist"},
        )

    def test_event_disallows_self_upload(self) -> None:
        response = self.client.post(
            "/upload/result",
            json={
                "event": "TestEvent-2021-12-12",
                "name": "Bon Jovie",
                "age_class": "M55",
                "time": "53:21",
                "course": "Long",
            },
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.json(), {"detail": "Event doesn't accept user submitted results"}
        )

    def test_result_created_competitor_exists(self) -> None:
        expected_competitor = (
            CompetitorTable.objects()
            .where(CompetitorTable.name == "Sophie Glider")
            .first()
            .run_sync()
        )
        assert expected_competitor is not None

        new_result = (
            ResultTable.objects()
            .where(ResultTable.competitor == expected_competitor.id)
            .where(ResultTable.event == "TestEvent-2022-02-03")
            .first()
            .run_sync()
        )
        self.assertEqual(new_result, None)

        response = self.client.post(
            "/upload/result",
            json={
                "event": "TestEvent-2022-02-03",
                "name": "Sophie Glider",
                "age_class": "W21",
                "time": "11:52",
                "course": "Long",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(), {"detail": "Result created for `Sophie Glider`"}
        )

        new_result = (
            ResultTable.objects()
            .where(ResultTable.competitor == expected_competitor.id)
            .where(ResultTable.event == "TestEvent-2022-02-03")
            .first()
            .run_sync()
        )
        assert new_result is not None
        self.assertEqual(new_result.time, 712)
        self.assertEqual(new_result.incomplete, False)
        self.assertEqual(new_result.course, "Long")
        self.assertEqual(new_result.type, "user-upload")

    def test_result_created_new_competitor(self) -> None:
        new_competitor = (
            CompetitorTable.objects()
            .where(CompetitorTable.name == "Tom Bond")
            .first()
            .run_sync()
        )
        self.assertEqual(new_competitor, None)

        response = self.client.post(
            "/upload/result",
            json={
                "event": "TestEvent-2022-02-03",
                "name": "Tom Bond",
                "age_class": "M21",
                "time": "13:52",
                "course": "Long",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {"detail": "Result created for `Tom Bond`"})

        new_competitor = (
            CompetitorTable.objects()
            .where(CompetitorTable.name == "Tom Bond")
            .first()
            .run_sync()
        )
        assert new_competitor is not None
        self.assertEqual(new_competitor.name, "Tom Bond")
        self.assertEqual(new_competitor.competitor_pool, "Edinburgh Summer 2021")
        self.assertEqual(new_competitor.age_class, "M21")

        new_result = (
            ResultTable.objects()
            .where(ResultTable.competitor == new_competitor.id)
            .where(ResultTable.event == "TestEvent-2022-02-03")
            .first()
            .run_sync()
        )
        assert new_result is not None
        self.assertEqual(new_result.time, 832)
        self.assertEqual(new_result.incomplete, False)
        self.assertEqual(new_result.course, "Long")
        self.assertEqual(new_result.type, "user-upload")


class TestUploadURL(TestCaseWithDatabase):
    @respx.mock
    def test_problem_fetching_result(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(500)
        )

        response = self.client.post(
            "/upload/url",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "url": "https://example.com/results",
                "overwrite": True,
                "results_links": {"Winsplits": "https://example.com"},
            },
        )

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(
            response.json(), {"detail": "Problem fetching results from URL"}
        )
        self.assertEqual(response.status_code, 500)

    @respx.mock
    def test_problem_invalid_url(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            side_effect=httpx.InvalidURL("")
        )

        response = self.client.post(
            "/upload/url",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "url": "https://example.com/results",
                "overwrite": True,
                "results_links": {"Winsplits": "https://example.com"},
            },
        )

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.json(), {"detail": "Invalid URL"})
        self.assertEqual(response.status_code, 400)

    @respx.mock
    def test_request_problem(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            side_effect=httpx.HTTPError("")
        )

        response = self.client.post(
            "/upload/url",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "url": "https://example.com/results",
                "overwrite": True,
                "results_links": {"Winsplits": "https://example.com"},
            },
        )

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(
            response.json(), {"detail": "Problem fetching results from URL"}
        )
        self.assertEqual(response.status_code, 500)

    @respx.mock
    def test_problem_processing_file(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(200, text="<h2>Heading</h2>")
        )

        response = self.client.post(
            "/upload/url",
            json={
                "event_id": "TestEvent-2021-12-12",
                "upload_key": "UploadKeyKeepSecret",
                "url": "https://example.com/results",
                "overwrite": True,
                "results_links": {"Winsplits": "https://example.com"},
            },
        )

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.status_code, 500)
