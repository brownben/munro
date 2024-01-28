from .helpers import TestCaseWithDatabase, get_client

client = get_client()


class TestStats(TestCaseWithDatabase):
    def test_home_route(self) -> None:
        response = self.client.get(
            "/misc/home",
            headers={"Authorization": "Bearer SuperSecretTest"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertDictEqual(
            response.json(),
            {
                "leagues": 3,
                "events": 3,
                "results": 6,
                "latestResults": [
                    {
                        "id": "TheFinalCountdown-2021-12-24",
                        "name": "The Final Countdown",
                        "date": "2021-12-24",
                        "competitor_pool": "Edinburgh Summer 2021",
                        "organiser": "Saint Nicholas",
                        "website": "https://example.com/xmas",
                        "more_information": "",
                        "results_links": {},
                        "part_of": "",
                        "results_uploaded": True,
                        "results_uploaded_time": "2021-12-24T19:47:06.500000",
                        "allow_user_submitted_results": False,
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
                        "part_of": "",
                        "results_uploaded": True,
                        "results_uploaded_time": "2021-09-19T12:47:06.401102",
                        "allow_user_submitted_results": False,
                    },
                ],
            },
        )
