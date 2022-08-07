import datetime

from ...database.tables import Event as EventTable
from ...database.tables import LeagueEvent as LeagueEventTable
from .helpers import TestCaseWithDatabase


class TestGetEventRoutes(TestCaseWithDatabase):
    def test_get_all_events(self) -> None:
        response = self.client.get("/events")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {
                    "id": "TestEvent-2022-02-03",
                    "name": "Return of the Test Event",
                    "date": "2022-02-03",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "John Doe",
                    "website": "https://example.com/test-event-2",
                    "more_information": "Hello World!",
                    "results_links": {},
                    "results_uploaded": False,
                    "results_uploaded_time": None,
                    "allow_user_submitted_results": True,
                    "part_of": "",
                },
                {
                    "id": "TheFinalCountdown-2021-12-24",
                    "name": "The Final Countdown",
                    "date": "2021-12-24",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Saint Nicholas",
                    "website": "https://example.com/xmas",
                    "more_information": "",
                    "results_links": {},
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-12-24T19:47:06.500000",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
                {
                    "id": "TestEvent-2021-12-12",
                    "name": "Test Event",
                    "date": "2021-12-12",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Ben Brown",
                    "website": "https://example.com/test-event",
                    "more_information": "",
                    "results_links": {
                        "Standard Results": "https://example.com/test-event",
                        "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                    },
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-09-19T12:47:06.401102",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
            ],
        )

    def test_get_event_by_id(self) -> None:
        response = self.client.get("/events/TestEvent-2021-12-12")

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {
                "id": "TestEvent-2021-12-12",
                "name": "Test Event",
                "date": "2021-12-12",
                "competitor_pool": "Edinburgh Summer 2021",
                "organiser": "Ben Brown",
                "website": "https://example.com/test-event",
                "more_information": "",
                "results_links": {
                    "Standard Results": "https://example.com/test-event",
                    "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                },
                "results_uploaded": True,
                "results_uploaded_time": "2021-09-19T12:47:06.401102",
                "allow_user_submitted_results": False,
                "part_of": "",
            },
        )

    def test_get_event_by_id_missing(self) -> None:
        response = self.client.get("/events/UnknownEvent2020-08-18")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Couldn't find event with the id `UnknownEvent2020-08-18`"},
        )

    def test_get_all_events_with_upload_key_no_authentication(self) -> None:
        response = self.client.get(
            "/events/upload-key", headers={"Authorization": "Bearer WrongKey"}
        )

        self.assertEqual(response.status_code, 401)
        self.assertEqual(
            response.json(), {"detail": "Invalid Authentication Credentials"}
        )

    def test_get_all_events_with_upload_key(self) -> None:
        response = self.client.get(
            "/events/upload-key", headers={"Authorization": "Bearer SuperSecretTest"}
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {
                    "id": "TestEvent-2022-02-03",
                    "name": "Return of the Test Event",
                    "date": "2022-02-03",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "John Doe",
                    "website": "https://example.com/test-event-2",
                    "more_information": "Hello World!",
                    "results_links": {},
                    "results_uploaded": False,
                    "results_uploaded_time": None,
                    "upload_key": "UploadKeyKeepSecret",
                    "allow_user_submitted_results": True,
                    "part_of": "",
                },
                {
                    "id": "TheFinalCountdown-2021-12-24",
                    "name": "The Final Countdown",
                    "date": "2021-12-24",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Saint Nicholas",
                    "website": "https://example.com/xmas",
                    "more_information": "",
                    "results_links": {},
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-12-24T19:47:06.500000",
                    "upload_key": "UploadKeyKeepSecret",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
                {
                    "id": "TestEvent-2021-12-12",
                    "name": "Test Event",
                    "date": "2021-12-12",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Ben Brown",
                    "website": "https://example.com/test-event",
                    "more_information": "",
                    "results_links": {
                        "Standard Results": "https://example.com/test-event",
                        "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                    },
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-09-19T12:47:06.401102",
                    "upload_key": "UploadKeyKeepSecret",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
            ],
        )

    def test_get_event_by_id_with_upload_key(self) -> None:
        response = self.client.get(
            "/events/TestEvent-2021-12-12/upload-key",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {
                "id": "TestEvent-2021-12-12",
                "name": "Test Event",
                "date": "2021-12-12",
                "competitor_pool": "Edinburgh Summer 2021",
                "organiser": "Ben Brown",
                "website": "https://example.com/test-event",
                "more_information": "",
                "results_links": {
                    "Standard Results": "https://example.com/test-event",
                    "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                },
                "upload_key": "UploadKeyKeepSecret",
                "results_uploaded": True,
                "results_uploaded_time": "2021-09-19T12:47:06.401102",
                "allow_user_submitted_results": False,
                "part_of": "",
            },
        )

    def test_get_event_by_id_with_upload_key_missing(self) -> None:
        response = self.client.get(
            "/events/UnknownEvent2020-08-18/upload-key",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Couldn't find event with the id `UnknownEvent2020-08-18`"},
        )


class TestLatestResultsRoutes(TestCaseWithDatabase):
    def test_get_events_with_latest_results(self) -> None:
        response = self.client.get("/events/latest-results")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {
                    "id": "TheFinalCountdown-2021-12-24",
                    "name": "The Final Countdown",
                    "date": "2021-12-24",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Saint Nicholas",
                    "website": "https://example.com/xmas",
                    "more_information": "",
                    "results_links": {},
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-12-24T19:47:06.500000",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
                {
                    "id": "TestEvent-2021-12-12",
                    "name": "Test Event",
                    "date": "2021-12-12",
                    "competitor_pool": "Edinburgh Summer 2021",
                    "organiser": "Ben Brown",
                    "website": "https://example.com/test-event",
                    "more_information": "",
                    "results_links": {
                        "Standard Results": "https://example.com/test-event",
                        "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                    },
                    "results_uploaded": True,
                    "results_uploaded_time": "2021-09-19T12:47:06.401102",
                    "allow_user_submitted_results": False,
                    "part_of": "",
                },
            ],
        )


class TestAllowingSubmissionRoutes(TestCaseWithDatabase):
    def test_get_events_with_results_submission(self) -> None:
        response = self.client.get("/events/results-submission")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {
                    "allow_user_submitted_results": True,
                    "competitor_pool": "Edinburgh Summer 2021",
                    "date": "2022-02-03",
                    "id": "TestEvent-2022-02-03",
                    "more_information": "Hello World!",
                    "name": "Return of the Test Event",
                    "organiser": "John Doe",
                    "part_of": "",
                    "results_links": {},
                    "results_uploaded": False,
                    "results_uploaded_time": None,
                    "website": "https://example.com/test-event-2",
                }
            ],
        )


class TestGetResultsForEvents(TestCaseWithDatabase):
    def test_get_results_for_event(self) -> None:
        response = self.client.get("/events/TestEvent-2021-12-12/results")

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {
                "id": "TestEvent-2021-12-12",
                "name": "Test Event",
                "league": "Sprintelope 2021",
                "date": "2021-12-12",
                "organiser": "Ben Brown",
                "website": "https://example.com/test-event",
                "results_links": {
                    "Standard Results": "https://example.com/test-event",
                    "Routegadget": "https://test.routegadget.co.uk/rg2#52",
                },
                "results": [
                    {
                        "id": 3,
                        "name": "Alfie Wickers",
                        "club": "BAT",
                        "age_class": "M35",
                        "time": 60,
                        "course": "Long",
                        "incomplete": False,
                        "type": "",
                        "competitor": 3,
                        "position": 1,
                    },
                    {
                        "id": 1,
                        "name": "Robert Jones",
                        "club": "HAT",
                        "age_class": "M18",
                        "time": 123,
                        "course": "Long",
                        "incomplete": False,
                        "type": "",
                        "competitor": 1,
                        "position": 2,
                    },
                    {
                        "id": 2,
                        "name": "Sophie Glider",
                        "club": "HAT",
                        "age_class": "W21",
                        "time": 155,
                        "course": "Long",
                        "incomplete": False,
                        "type": "",
                        "competitor": 2,
                        "position": 3,
                    },
                ],
            },
        )

    def test_get_results_for_event_event_not_found(self) -> None:
        response = self.client.get("/events/NotFoundEvent/results")

        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(),
            {"detail": "Couldn't find event with the id `NotFoundEvent`"},
        )


class TestModifyEventRoutes(TestCaseWithDatabase):
    def test_delete_event(self) -> None:
        original_events = EventTable.select(EventTable.id).run_sync()

        response = self.client.delete(
            "/events/TestEvent-2021-12-12",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(), {"detail": "Event with id `TestEvent-2021-12-12` deleted"}
        )

        events = EventTable.select(EventTable.id).run_sync()
        self.assertEqual(len(events), len(original_events) - 1)

    def test_create_event(self) -> None:
        original_events = EventTable.select(EventTable.name).run_sync()
        original_league_events = LeagueEventTable.select(LeagueEventTable.id).run_sync()

        response = self.client.post(
            "/events/",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test Event",
                "date": "2022-12-12",
                "organiser": "",
                "part_of": "",
                "website": "",
                "more_information": "",
                "results_links": {},
                "allow_user_submitted_results": False,
                "league": "Sprintelope 2021",
                "compulsory": False,
                "league_group": "",
                "overridden_scoring_method": "",
                "expected_courses": {},
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertDictEqual(response.json(), {"detail": "Event `Test Event` created"})

        events = EventTable.select(EventTable.name).run_sync()
        league_events = LeagueEventTable.select(LeagueEventTable.id).run_sync()
        self.assertEqual(len(events), len(original_events) + 1)
        self.assertEqual(len(league_events), len(original_league_events) + 1)

        event = (
            EventTable.select(EventTable.name, EventTable.date, EventTable.upload_key)
            .where(EventTable.id == "TestEvent-2022-12-12")
            .first()
            .run_sync()
        )
        self.assertEqual(event["name"], "Test Event")
        self.assertEqual(event["date"], datetime.date(2022, 12, 12))
        self.assertIsInstance(event["upload_key"], str)

    def test_create_event_unknown_league(self) -> None:
        original_events = EventTable.select(EventTable.name).run_sync()
        original_league_events = LeagueEventTable.select(LeagueEventTable.id).run_sync()

        response = self.client.post(
            "/events/",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test Event",
                "date": "2022-12-12",
                "organiser": "",
                "part_of": "",
                "website": "",
                "more_information": "",
                "results_links": {},
                "allow_user_submitted_results": False,
                "league": "Unknown League",
                "compulsory": False,
                "league_group": "Edinburgh Summer 2021",
                "overridden_scoring_method": "",
                "expected_courses": {},
            },
        )

        self.assertEqual(response.status_code, 500)
        self.assertDictEqual(
            response.json(), {"detail": "Couldn't find league `Unknown League`"}
        )

        events = EventTable.select(EventTable.name).run_sync()
        league_events = LeagueEventTable.select(LeagueEventTable.id).run_sync()
        self.assertEqual(len(events), len(original_events))
        self.assertEqual(len(league_events), len(original_league_events))

    def test_update_event(self) -> None:
        event = (
            EventTable.select(EventTable.part_of)
            .where(EventTable.id == "TestEvent-2022-12-12")
            .first()
            .run_sync()
        )
        self.assertEqual(event["part_of"], "")

        response = self.client.put(
            "/events/TestEvent-2022-12-12",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "id": "TestEvent-2022-12-12",
                "name": "Test Event",
                "date": "2022-12-12",
                "organiser": "",
                "part_of": "Testing",
                "website": "",
                "more_information": "",
                "results_links": {},
                "allow_user_submitted_results": False,
                "league": "Sprintelope 2021",
                "compulsory": False,
                "league_group": "",
                "overridden_scoring_method": "",
                "expected_courses": {},
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "Event `Test Event` updated"},
        )

        event = (
            EventTable.select(EventTable.part_of)
            .where(EventTable.id == "TestEvent-2022-12-12")
            .first()
            .run_sync()
        )
        self.assertEqual(event["part_of"], "Testing")

    def test_update_unknown_event(self) -> None:
        response = self.client.put(
            "/events/hahaha-unknown",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "id": "hahaha-unknown",
                "name": "Test Event",
                "date": "2022-12-16",
                "organiser": "",
                "part_of": "Testing",
                "website": "",
                "more_information": "",
                "results_links": {},
                "allow_user_submitted_results": False,
                "league": "Sprintelope 2021",
                "compulsory": False,
                "league_group": "",
                "overridden_scoring_method": "",
                "expected_courses": {},
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(),
            {"detail": "Couldn't find event with the id `hahaha-unknown`"},
        )
