import unittest

import httpx
import respx

from .helpers import TestCaseWithDatabase, get_client

client = get_client()


sample_sitiming_html_file = """
  <html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Type" content="text/html"><meta http-equiv="CACHE-CONTROL" content="NO-CACHE"><meta http-equiv="Expires" content="-1"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Results for Test Event - 11 September 2021 - Provisional</title><link href="https://www.sportident.co.uk/sitiming/skins/v2/jquery/datatables.css" rel="stylesheet" type="text/css"><link href="https://www.sportident.co.uk/sitiming/skins/v2/standard.css" rel="stylesheet" type="text/css"><link href="https://www.sportident.co.uk/sitiming/skins/v2/flags.css" rel="stylesheet" type="text/css"><script src="https://www.sportident.co.uk/sitiming/skins/v2/jquery/jquery.js" type="text/javascript"></script><script src="https://www.sportident.co.uk/sitiming/skins/v2/jquery/datatables.js" type="text/javascript"></script><script src="https://www.sportident.co.uk/sitiming/skins/v2/jquery/jquery-ui.js" type="text/javascript"></script><script src="https://www.sportident.co.uk/sitiming/skins/v2/results.js" type="text/javascript"></script><script type="text/javascript">var ajaxRefreshInterval = undefined;function getData(tableNumber) {if (tableNumber == 0) return [["1st","1","James Gold","HAT","M21","27:00","\\u0026nbsp;"],["2nd","2","Philip Windsor","BAT","M21","27:11","+0:11"],["3rd","3","Helen Flight","DOG","W40","30:37","+3:37"],["4th","4","Simon Evans","JOB","M21","31:57","+4:57"]];if (tableNumber == 1) return [["1st","1","Ben Nevis","FISH","M20","23:34","\\u0026nbsp;"],["2nd","2","Fred Rick","HAD","W21","25:39","+2:05"],["3rd","3","Ellie Smith","\\u0026nbsp;","\\u0026nbsp;","26:52","+3:18"]];}</script></head><body><div id="container" class="full"><div id="header"><div id="header_left"></div><div id="header_right"><div><a href="https://www.sportident.co.uk" title="SiTiming from SPORTident" id="logo_header"><span>SiTiming from SPORTident</span></a></div></div><div class="clear"></div></div><div id="container_b"><div id="container_bp"><a href="https://www.sportident.co.uk" title="SiTiming from SPORTident" id="logo"><span>SiTiming from SPORTident</span></a><h2>Results for Sample Event - 11 September 2021 - Provisional</h2><div id="table-filter"><div class="ff-table"><div class="ff-row"><div class="ff-label"><label for="table-menu">Results</label></div><div class="ff-input"><div class="sf-field"><select id="table-menu" class="form-field" onchange="changeTable(this.value);" class="form-field-noresize"><option><option value="0">Long</option><option value="1">Short</option></select></div></div><div id="loader-table" class="loader"></div></div></div><div class="ff-row"><div class="ff-label"><label for="showdetail0">Display Details</label></div><div class="ff-field"><div class="ff-input"><input type="checkbox" class="form-checkbox detail-selector" id="showdetail0" onclick="showHideDetail()"></div></div></div></div><div id="search-box"><div class="ff-table"><div class="ff-row"><div class="ff-button"><button onclick="addSearch()" id="search_add" class="button-long button-search">Add Search</button></div></div><div class="ff-row search_row"><div class="ff-label"><label for="search_in0">Search</label></div><div class="ff-input"><div class="sf-field"><select name="search_in0" id="search_in0" title="Please choose the field you would like to search on." class="form-field-noresize"><option label="Name" value="0">Name</option><option label="Club" value="1">Club</option></select></div><div class="sf-field"><select name="search_equality0" id="search_equality0" title="Please choose the type of search to perform." class="form-field-noresize"><option label="Equals">equals</option><option label="Contains">contains</option></select></div><div class="sf-field"><input type="text" name="search_value0" id="search_value0" value="" size="15" maxlength="50" class="form-field-noresize" title="Please enter what you would like to search for."></div></div></div><div class="ff-row"><div class="ff-button"><button onclick="search()" id="search_find" class="button-long button-search">Find</button></div><div id="loader-search" class="loader"></div></div><div id="no-search-results" class="information-message"><p>Search returned no matches!</p></div></div></div><div id="nothing-selected" class="select-message"><p>Please select which "Results" you wish to see, or perform a search...</p></div><div id="results-block0" class="results-block"><div class="results-block-header"><div class="results-block-title"><h3>Long</h3></div></div><div class="clear"></div><div id="not-started0" class="information-message not-started"><p>Results will be added here soon after the event has taken place.</p></div><p class="results-block-info">5.0km</p><table id="results-table0" class="data" data-paging='false' data-order-multi='false' data-info='false'><thead><tr><th class="left nowrap" colspan="2">Pos<button class="sort results-sort0" title="Sort by Position" onclick='sortTable(0, 0)'></button></th><th class="left">Name</th><th class="left">Club</th><th class="centre">Age Class</th><th class="right">Time</th><th class="right">Behind</th></tr><tr class="last-header-row"><th class="detail-set" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="results-sort0" data-type='position'>&nbsp;</th><th class="detail-set search-column0" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="detail-set0 search-column1" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="detail-set0" data-orderable='false' data-column-classes="centre">&nbsp;</th><th class="detail-set" data-orderable='false' data-column-classes="right">&nbsp;</th><th class="detail-set0" data-orderable='false' data-column-classes="right">&nbsp;</th></tr></thead></table></div><div id="results-block1" class="results-block"><div class="results-block-header"><div class="results-block-title"><h3>Short</h3></div></div><div class="clear"></div><div id="not-started1" class="information-message not-started"><p>Results will be added here soon after the event has taken place.</p></div><p class="results-block-info">1.8km</p><table id="results-table1" class="data" data-paging='false' data-order-multi='false' data-info='false'><thead><tr><th class="left nowrap" colspan="2">Pos<button class="sort results-sort0" title="Sort by Position" onclick='sortTable(1, 0)'></button></th><th class="left">Name</th><th class="left">Club</th><th class="centre">Age Class</th><th class="right">Time</th><th class="right">Behind</th></tr><tr class="last-header-row"><th class="detail-set" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="results-sort0" data-type='position'>&nbsp;</th><th class="detail-set search-column0" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="detail-set0 search-column1" data-orderable='false' data-column-classes="left">&nbsp;</th><th class="detail-set0" data-orderable='false' data-column-classes="centre">&nbsp;</th><th class="detail-set" data-orderable='false' data-column-classes="right">&nbsp;</th><th class="detail-set0" data-orderable='false' data-column-classes="right">&nbsp;</th></tr></thead></table></div></div><div class="copyright right"><p><a href="#top">Back to Top</a></p></div></div><div class="clear"></div><div id="footer"><div id="footer_a"><div class="padding"><div id="footer_a_left"></div><div id="footer_a_right"></div><div class="clear"></div></div></div></div><div id="footer_b"><div class="padding"><div id="footer_b_left"><p>SiTiming from <a href="https://www.sportident.co.uk">SPORTident</a></p><p class="copyright">v4.212.1942.4062 © SPORTident UK Ltd 2021</p><p class="copyright update_time">Updated 11-Aug-2021 22:19:26</p></div><div id="footer_b_right"><p>Updated 11-Aug-2021 22:19:26</p></div><div class="clear"></div></div></div></div></body></html>
"""


class MockRequestsResponse:
    text: str

    def __init__(self, text: str):
        self.text = text


class TestSITimingRoutes(unittest.TestCase):
    def test_no_url_provided(self) -> None:
        response = client.get("/misc/sitiming")

        self.assertEqual(response.status_code, 422)

    @respx.mock
    def test_file_success(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(200, text=sample_sitiming_html_file)
        )
        response = client.get("/misc/sitiming?url=https%3A%2F%2Fexample.com%2Fresults")

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.status_code, 200)

        self.assertEqual(
            response.json(),
            {
                "id": "Sample Event",
                "name": "Sample Event",
                "league": "",
                "date": None,
                "organiser": None,
                "website": "",
                "results_links": {"Standard Results": "https://example.com/results"},
                "results": [
                    {
                        "id": 0,
                        "name": "James Gold",
                        "club": "HAT",
                        "age_class": "M21",
                        "time": 1620,
                        "course": "Long",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 1,
                    },
                    {
                        "id": 1,
                        "name": "Philip Windsor",
                        "club": "BAT",
                        "age_class": "M21",
                        "time": 1631,
                        "course": "Long",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 2,
                    },
                    {
                        "id": 2,
                        "name": "Helen Flight",
                        "club": "DOG",
                        "age_class": "W40",
                        "time": 1837,
                        "course": "Long",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 3,
                    },
                    {
                        "id": 3,
                        "name": "Simon Evans",
                        "club": "JOB",
                        "age_class": "M21",
                        "time": 1917,
                        "course": "Long",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 4,
                    },
                    {
                        "id": 4,
                        "name": "Ben Nevis",
                        "club": "FISH",
                        "age_class": "M20",
                        "time": 1414,
                        "course": "Short",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 1,
                    },
                    {
                        "id": 5,
                        "name": "Fred Rick",
                        "club": "HAD",
                        "age_class": "W21",
                        "time": 1539,
                        "course": "Short",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 2,
                    },
                    {
                        "id": 6,
                        "name": "Ellie Smith",
                        "club": "",
                        "age_class": "",
                        "time": 1612,
                        "course": "Short",
                        "incomplete": False,
                        "type": "sitiming",
                        "competitor": 0,
                        "position": 3,
                    },
                ],
            },
        )

    @respx.mock
    def test_no_heading(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(200, text="")
        )

        response = client.get("/misc/sitiming?url=https%3A%2F%2Fexample.com%2Fresults")

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.status_code, 500)

    @respx.mock
    def test_problem_fetching_result(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(404)
        )

        response = client.get("/misc/sitiming?url=https%3A%2F%2Fexample.com%2Fresults")

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.json(), {"detail": "Couldn't find results at URL"})
        self.assertEqual(response.status_code, 404)

    @respx.mock
    def test_problem_processing_file(self) -> None:
        mock_requests_get = respx.get("https://example.com/results").mock(
            return_value=httpx.Response(200, text="<h2>Heading</h2>")
        )

        response = client.get("/misc/sitiming?url=https%3A%2F%2Fexample.com%2Fresults")

        self.assertTrue(mock_requests_get.called)
        self.assertEqual(response.status_code, 500)


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
