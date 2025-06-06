from unittest.mock import ANY, AsyncMock, MagicMock, call, patch

from ...database import Competitors, LeagueClasses, LeagueGroups, Leagues, Results
from ...schemas import CompetitorPool
from .helpers import TestCaseWithDatabase


class TestGetLeagueRoutes(TestCaseWithDatabase):
    def test_get_all_leagues(self) -> None:
        response = self.client.get("/leagues")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            [
                {
                    "name": "Night League",
                    "tagline": "Run in the Dark",
                    "year": 2021,
                    "coordinator": "The Coordinator",
                    "website": "https://example.com/",
                    "more_information": "",
                    "visible": True,
                    "scoring_method": "timeAverage",
                    "number_of_counting_events": 3,
                    "competitor_pool": "Night Events",
                },
                {
                    "name": "Other League",
                    "tagline": "Have fun go for a run!",
                    "year": 2021,
                    "coordinator": "The Coordinator",
                    "website": "https://example.com/",
                    "more_information": "",
                    "visible": True,
                    "scoring_method": "timeAverage",
                    "number_of_counting_events": 6,
                    "competitor_pool": "Edinburgh Summer 2021",
                },
                {
                    "name": "Sprintelope 2021",
                    "tagline": "Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
                    "year": 2021,
                    "coordinator": "The Coordinator",
                    "website": "https://example.com/",
                    "more_information": "",
                    "visible": True,
                    "scoring_method": "position",
                    "number_of_counting_events": 1,
                    "competitor_pool": "Edinburgh Summer 2021",
                },
            ],
        )

    def test_get_league_by_name(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021")
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "name": "Sprintelope 2021",
                "tagline": "Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 1,
                "competitor_pool": "Edinburgh Summer 2021",
                "classes": [
                    {
                        "name": "Long",
                        "league": "Sprintelope 2021",
                        "standard_course": "Long",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Multiple",
                        "league": "Sprintelope 2021",
                        "standard_course": "Long|Small",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Overall",
                        "league": "Sprintelope 2021",
                        "standard_course": "*",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Short",
                        "league": "Sprintelope 2021",
                        "standard_course": "Short",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                ],
                "events": [
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
                        "group": None,
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
                        "group": None,
                    },
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
                        "group": None,
                    },
                ],
                "groups": [],
            },
        )

    def test_get_league_by_name_with_event_upload_keys(self) -> None:
        response = self.client.get(
            "/leagues/Sprintelope 2021/uploadKey",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "name": "Sprintelope 2021",
                "tagline": "Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 1,
                "competitor_pool": "Edinburgh Summer 2021",
                "classes": [
                    {
                        "name": "Long",
                        "league": "Sprintelope 2021",
                        "standard_course": "Long",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Multiple",
                        "league": "Sprintelope 2021",
                        "standard_course": "Long|Small",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Overall",
                        "league": "Sprintelope 2021",
                        "standard_course": "*",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                    {
                        "name": "Short",
                        "league": "Sprintelope 2021",
                        "standard_course": "Short",
                        "age_class_filter": "",
                        "club_filter": "",
                        "number_of_counting_events": None,
                    },
                ],
                "events": [
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
                        "upload_key": ANY,
                        "group": None,
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
                        "upload_key": ANY,
                        "group": None,
                    },
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
                        "upload_key": ANY,
                        "group": None,
                    },
                ],
                "groups": [],
            },
        )

    def test_get_league_by_name_missing(self) -> None:
        response = self.client.get("/leagues/Missing League")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Couldn't find league with name `Missing League`"},
        )

    def test_get_league_class(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021/classes/Long")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "age_class_filter": "",
                "club_filter": "",
                "league": "Sprintelope 2021",
                "name": "Long",
                "number_of_counting_events": None,
                "standard_course": "Long",
            },
        )

    def test_get_missing_league_class(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021/classes/unknown")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "No class named `unknown` exists"},
        )


class TestLeagueResultRoutes(TestCaseWithDatabase):
    def test_expect_error_if_no_league(self) -> None:
        response = self.client.get("/leagues/Printelope 2021/results/Long")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Couldn't find league with name `Printelope 2021`"},
        )

    def test_expect_error_if_no_league_class(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021/results/Longer")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "Couldn't find league class with name `Longer`"},
        )

    @patch("src.routes.leagues.Competitors")
    def test_no_events_no_competitors(self, mock_competitors: MagicMock) -> None:
        mock_competitors.get_by_pool = AsyncMock([])
        mock_competitors.get_pool_by_name = AsyncMock(
            return_value=CompetitorPool(name="Edinburgh Summer 2021")
        )

        response = self.client.get("/leagues/Sprintelope 2021/results/Long")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "league": "Sprintelope 2021",
                "class_name": "Long",
                "classes": ["Long", "Multiple", "Overall", "Short"],
                "events": [],
                "results": [],
                "eligibility": False,
            },
        )

    def test_sample_data(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021/results/Long")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "league": "Sprintelope 2021",
                "eligibility": False,
                "class_name": "Long",
                "classes": ["Long", "Multiple", "Overall", "Short"],
                "events": [
                    {
                        "compulsory": False,
                        "event": "TestEvent-2021-12-12",
                        "event_name": "Test Event",
                        "expected_courses": {},
                        "league_group": None,
                        "id": 0,
                        "league": "Sprintelope 2021",
                        "overridden_scoring_method": None,
                    },
                    {
                        "compulsory": False,
                        "event": "TheFinalCountdown-2021-12-24",
                        "event_name": "The Final Countdown",
                        "expected_courses": {},
                        "league_group": None,
                        "id": 1,
                        "league": "Sprintelope 2021",
                        "overridden_scoring_method": None,
                    },
                ],
                "results": [
                    {
                        "id": 3,
                        "name": "Alfie Wickers",
                        "club": "BAT",
                        "age_class": "M35",
                        "total_points": 100,
                        "position": 1,
                        "eligible": True,
                        "points": [
                            {
                                "event": "TestEvent-2021-12-12",
                                "score": 100,
                                "counting": ANY,
                                "type": "",
                            },
                            {
                                "event": "TheFinalCountdown-2021-12-24",
                                "score": 100,
                                "counting": ANY,
                                "type": "",
                            },
                        ],
                    },
                    {
                        "id": 1,
                        "name": "Robert Jones",
                        "club": "HAT",
                        "age_class": "M18",
                        "total_points": 99,
                        "position": 2,
                        "eligible": True,
                        "points": [
                            {
                                "event": "TestEvent-2021-12-12",
                                "score": 99,
                                "counting": 1,
                                "type": "",
                            },
                            None,
                        ],
                    },
                    {
                        "id": 2,
                        "name": "Sophie Glider",
                        "club": "HAT",
                        "age_class": "W21",
                        "total_points": 99,
                        "position": 2,
                        "eligible": True,
                        "points": [
                            {
                                "event": "TestEvent-2021-12-12",
                                "score": 98,
                                "counting": 0,
                                "type": "",
                            },
                            {
                                "event": "TheFinalCountdown-2021-12-24",
                                "score": 99,
                                "counting": 1,
                                "type": "",
                            },
                        ],
                    },
                ],
            },
        )

    @patch("src.routes.leagues.Results")
    def test_sample_data_overall(self, mock_results: MagicMock) -> None:
        mock_results.get_by_event = AsyncMock(wraps=Results.get_by_event)

        response = self.client.get("/leagues/Sprintelope 2021/results/Overall")

        self.assertEqual(response.status_code, 200)
        mock_results.get_by_event.assert_has_calls(
            [
                call("TestEvent-2021-12-12"),
                call("TheFinalCountdown-2021-12-24"),
            ]
        )

        self.assertEqual(response.status_code, 200)

    @patch("src.routes.leagues.Results")
    def test_sample_data_multiple_courses_for_class(
        self, mock_results: MagicMock
    ) -> None:
        mock_results.get_by_event_and_courses = AsyncMock(
            wraps=Results.get_by_event_and_courses
        )

        response = self.client.get("/leagues/Sprintelope 2021/results/Multiple")

        self.assertEqual(response.status_code, 200)
        mock_results.get_by_event_and_courses.assert_has_calls(
            [
                call("TestEvent-2021-12-12", ["Long", "Small"]),
                call("TheFinalCountdown-2021-12-24", ["Long", "Small"]),
            ]
        )


class TestModifyLeagueRoutes(TestCaseWithDatabase):
    async def test_create_league_no_competitor_pool(self) -> None:
        original_league_count = await Leagues.count()
        original_competitor_pool_count = await Competitors.get_pool_count()

        response = self.client.post(
            "/leagues/",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test2",
                "tagline": "Testing",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 1,
                "competitor_pool": "",
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertDictEqual(response.json(), {"detail": "League `Test2` created"})

        league_count = await Leagues.count()
        competitor_pool_count = await Competitors.get_pool_count()

        self.assertEqual(league_count, original_league_count + 1)
        self.assertEqual(competitor_pool_count, original_competitor_pool_count + 1)

    async def test_create_league_with_competitor_pool(self) -> None:
        original_league_count = await Leagues.count()
        original_competitor_pool_count = await Competitors.get_pool_count()

        response = self.client.post(
            "/leagues/",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test 2",
                "tagline": "Testing",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 1,
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertDictEqual(response.json(), {"detail": "League `Test 2` created"})

        league_count = await Leagues.count()
        competitor_pool_count = await Competitors.get_pool_count()

        self.assertEqual(league_count, original_league_count + 1)
        self.assertEqual(competitor_pool_count, original_competitor_pool_count)

    def test_create_league_already_exists(self) -> None:
        for _ in range(2):
            response = self.client.post(
                "/leagues/",
                headers={"Authorization": "Bearer SuperSecretTest"},
                json={
                    "name": "Test",
                    "tagline": "Testing",
                    "year": 2021,
                    "coordinator": "The Coordinator",
                    "website": "https://example.com/",
                    "more_information": "",
                    "visible": True,
                    "scoring_method": "position",
                    "number_of_counting_events": 1,
                    "competitor_pool": "",
                },
            )

        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(
            response.json(), {"detail": "League `Test` already exists"}
        )
        self.client.delete("/leagues/Test")

    async def test_update_league(self) -> None:
        league = await Leagues.get_by_name("Sprintelope 2021")
        assert league is not None
        self.assertEqual(league.number_of_counting_events, 1)

        response = self.client.put(
            "/leagues/Test",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Sprintelope 2021",
                "tagline": "Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 5,
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "League `Sprintelope 2021` updated"},
        )

        league = await Leagues.get_by_name("Sprintelope 2021")
        assert league is not None
        self.assertEqual(league.number_of_counting_events, 5)

    async def test_update_league_name(self) -> None:
        league = await Leagues.get_by_name("Sprintelope 2021")
        self.assertIsNotNone(league)

        response = self.client.put(
            "/leagues/Sprintelope 2021",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Tester",
                "tagline": "Testing",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 7,
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "League `Tester` updated"},
        )

        league = await Leagues.get_by_name("Tester")
        assert league is not None
        self.assertEqual(league.number_of_counting_events, 7)

        league = await Leagues.get_by_name("Sprintelope 2021")
        self.assertIsNone(league)

    def test_update_unknown_league(self) -> None:
        response = self.client.put(
            "/leagues/hahaha-unknown",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "hahaha-unknown",
                "tagline": "Testing",
                "year": 2021,
                "coordinator": "The Coordinator",
                "website": "https://example.com/",
                "more_information": "",
                "visible": True,
                "scoring_method": "position",
                "number_of_counting_events": 1,
                "competitor_pool": "Edinburgh Summer 2021",
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(),
            {"detail": "Couldn't find league with the name `hahaha-unknown`"},
        )

    async def test_delete_league(self) -> None:
        original_league_count = await Leagues.count()

        response = self.client.delete(
            "/leagues/Sprintelope 2021",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(), {"detail": "League `Sprintelope 2021` deleted"}
        )

        league_count = await Leagues.count()
        self.assertEqual(league_count, original_league_count - 1)


class TestLeagueClassModify(TestCaseWithDatabase):
    def test_create_class(self) -> None:
        response = self.client.post(
            "/leagues/Sprintelope 2021/classes",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": None,
                "number_of_counting_events": None,
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertDictEqual(
            response.json(),
            {"detail": "League class `Test` created for league `Sprintelope 2021`"},
        )

    def test_create_league_doesnt_match(self) -> None:
        response = self.client.post(
            "/leagues/Sprintelope 2021/classes",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2022",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": None,
                "number_of_counting_events": None,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(
            response.json(), {"detail": "League in body and URL don't match"}
        )

    def test_create_unknown_league(self) -> None:
        response = self.client.post(
            "/leagues/Sprint/classes",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprint",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": None,
                "number_of_counting_events": None,
            },
        )
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(), {"detail": "Couldn't find league with name `Sprint`"}
        )

    def test_create_already_exists(self) -> None:
        for _ in range(2):
            response = self.client.post(
                "/leagues/Sprintelope 2021/classes",
                headers={"Authorization": "Bearer SuperSecretTest"},
                json={
                    "name": "Testing",
                    "league": "Sprintelope 2021",
                    "age_class_filter": "",
                    "club_filter": "",
                    "standard_course": None,
                    "number_of_counting_events": None,
                },
            )

        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(
            response.json(),
            {
                "detail": "League class `Testing` already exists for league `Sprintelope 2021`"
            },
        )

    async def test_delete_league_class(self) -> None:
        original_classes = list(await LeagueClasses.get_by_league("Sprintelope 2021"))

        response = self.client.delete(
            "/leagues/Sprintelope 2021/classes/Long",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(response.json(), {"detail": "League class `Long` deleted"})

        classes = list(await LeagueClasses.get_by_league("Sprintelope 2021"))
        self.assertEqual(len(classes), len(original_classes) - 1)

    async def test_update_league_class(self) -> None:
        self.client.post(
            "/leagues/Sprintelope 2021/classes",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": None,
                "number_of_counting_events": None,
            },
        )
        league_class = await LeagueClasses.get_by_name("Sprintelope 2021", "Test")
        assert league_class is not None
        self.assertEqual(league_class.standard_course, None)

        response = self.client.put(
            "/leagues/Sprintelope 2021/classes/Test",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": "Blue",
                "number_of_counting_events": None,
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "League class `Test` updated"},
        )

        league_class = await LeagueClasses.get_by_name("Sprintelope 2021", "Test")
        assert league_class is not None
        self.assertEqual(league_class.standard_course, "Blue")

    def test_update_unknown_league_class(self) -> None:
        response = self.client.put(
            "/leagues/hahaha/classes/unknown",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "age_class_filter": "",
                "club_filter": "",
                "standard_course": None,
                "number_of_counting_events": None,
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(),
            {"detail": "Couldn't find league class with the name `unknown`"},
        )


class TestLeagueGroups(TestCaseWithDatabase):
    def test_create_group(self) -> None:
        response = self.client.post(
            "/leagues/Sprintelope 2021/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertDictEqual(
            response.json(),
            {"detail": "League group `Test` created for league `Sprintelope 2021`"},
        )

    def test_create_group_doesnt_match(self) -> None:
        response = self.client.post(
            "/leagues/Sprintelope 2021/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2022",
                "min": 0,
                "max": 0,
            },
        )
        self.assertEqual(response.status_code, 400)
        self.assertDictEqual(
            response.json(), {"detail": "League in body and URL don't match"}
        )

    def test_create_unknown_league(self) -> None:
        response = self.client.post(
            "/leagues/Sprint/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )
        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(), {"detail": "Couldn't find league with name `Sprint`"}
        )

    def test_create_already_exists(self) -> None:
        for _ in range(2):
            response = self.client.post(
                "/leagues/Sprintelope 2021/groups",
                headers={"Authorization": "Bearer SuperSecretTest"},
                json={
                    "name": "Testing",
                    "league": "Sprintelope 2021",
                    "min": 0,
                    "max": 0,
                },
            )

        self.assertEqual(response.status_code, 409)
        self.assertDictEqual(
            response.json(),
            {
                "detail": "League group `Testing` already exists for league `Sprintelope 2021`"
            },
        )

    def test_update_unknown_league_groups(self) -> None:
        response = self.client.put(
            "/leagues/hahaha/groups/unknown",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )

        self.assertEqual(response.status_code, 404)
        self.assertDictEqual(
            response.json(),
            {"detail": "Couldn't find league group with the name `unknown`"},
        )

    async def test_update_league_groups(self) -> None:
        self.client.post(
            "/leagues/Sprintelope 2021/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Testing 123",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )
        group = await LeagueGroups.get_by_name("Sprintelope 2021", "Testing 123")
        assert group is not None
        self.assertEqual(group.max, 0)

        response = self.client.put(
            "/leagues/Sprintelope 2021/groups/Testing 123",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Testing 123",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 2,
            },
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "League group `Testing 123` updated"},
        )

        group = await LeagueGroups.get_by_name("Sprintelope 2021", "Testing 123")
        assert group is not None
        self.assertEqual(group.max, 2)

    async def test_delete_league_groups(self) -> None:
        self.client.post(
            "/leagues/Sprintelope 2021/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )
        number_of_groups = len(await LeagueGroups.get_by_league("Sprintelope 2021"))

        response = self.client.delete(
            "/leagues/Sprintelope 2021/groups/Test",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {"detail": "League group `Test` deleted"},
        )

        new_number_of_groups = len(await LeagueGroups.get_by_league("Sprintelope 2021"))
        self.assertGreater(number_of_groups, new_number_of_groups)

    def test_get_league_group(self) -> None:
        self.client.post(
            "/leagues/Sprintelope 2021/groups",
            headers={"Authorization": "Bearer SuperSecretTest"},
            json={
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )
        response = self.client.get("/leagues/Sprintelope 2021/groups/Test")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "id": 1,
                "name": "Test",
                "league": "Sprintelope 2021",
                "min": 0,
                "max": 0,
            },
        )

    def test_get_missing_league_group(self) -> None:
        response = self.client.get("/leagues/Sprintelope 2021/groups/unknown")

        self.assertEqual(response.status_code, 404)
        self.assertEqual(
            response.json(),
            {"detail": "No group named `unknown` exists"},
        )
