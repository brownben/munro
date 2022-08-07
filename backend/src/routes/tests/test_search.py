from .helpers import TestCaseWithDatabase


class TestSearchRoute(TestCaseWithDatabase):
    def test_search_query(self) -> None:
        response = self.client.get("/search?query=in")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.json(),
            {
                "leagues": [
                    {
                        "name": "Sprintelope 2021",
                        "tagline": "Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
                        "year": 2021,
                        "coordinator": "The Coordinator",
                        "website": "https://example.com",
                        "more_information": "",
                        "visible": True,
                        "scoring_method": "position",
                        "number_of_counting_events": 1,
                        "competitor_pool": "Edinburgh Summer 2021",
                    },
                    {
                        "name": "Night League",
                        "tagline": "Run in the Dark",
                        "year": 2021,
                        "coordinator": "The Coordinator",
                        "website": "https://example.com",
                        "more_information": "",
                        "visible": True,
                        "scoring_method": "timeAverage",
                        "number_of_counting_events": 3,
                        "competitor_pool": "Night Events",
                    },
                ],
                "events": [
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
                    }
                ],
                "competitors": [],
            },
        )
