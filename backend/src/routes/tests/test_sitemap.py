from .helpers import TestCaseWithDatabase, get_client

client = get_client()

expected_sitemap = """https://munroleagues.com/
https://munroleagues.com/leagues
https://munroleagues.com/latest-results
https://munroleagues.com/about
https://munroleagues.com/developers
https://munroleagues.com/upload
https://munroleagues.com/upload/instructions
https://munroleagues.com/upload/file
https://munroleagues.com/upload/result
https://munroleagues.com/sitiming
https://munroleagues.com/search
https://munroleagues.com/leagues/Sprintelope%202021
https://munroleagues.com/leagues/Sprintelope%202021/results/Long
https://munroleagues.com/leagues/Sprintelope%202021/results/Multiple
https://munroleagues.com/leagues/Sprintelope%202021/results/Overall
https://munroleagues.com/leagues/Sprintelope%202021/results/Short
https://munroleagues.com/leagues/Night%20League
https://munroleagues.com/leagues/Other%20League
https://munroleagues.com/events/TestEvent-2022-02-03/results
https://munroleagues.com/events/TheFinalCountdown-2021-12-24/results
https://munroleagues.com/events/TestEvent-2021-12-12/results
https://munroleagues.com/competitors/1
https://munroleagues.com/competitors/2
https://munroleagues.com/competitors/3
https://munroleagues.com/competitors/4
"""


class TestSitemap(TestCaseWithDatabase):
    def test_sitemap(self) -> None:
        self.maxDiff = None
        response = client.get("/sitemap.txt")
        sitemap = response.text.replace("\\n", "\n")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(sitemap, expected_sitemap)
