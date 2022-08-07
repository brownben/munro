from ...schemas import Competitor, EventResult, EventWithUploadKey, League, LeagueClass
from ...schemas import LeagueEventDatabase as LeagueEvent
from ...schemas import ResultBeforeDatabase as Result

sample_leagues = [
    League(
        name="Sprintelope 2021",
        tagline="Wednesday Evening Urban Sprint Orienteering in Edinburgh and the Lothians",
        year=2021,
        coordinator="The Coordinator",
        website="https://example.com",
        more_information="",
        visible=True,
        scoring_method="position",
        number_of_counting_events=1,
        competitor_pool="Edinburgh Summer 2021",
    ),
    League(
        name="Night League",
        tagline="Run in the Dark",
        year=2021,
        coordinator="The Coordinator",
        website="https://example.com",
        more_information="",
        visible=True,
        scoring_method="timeAverage",
        number_of_counting_events=3,
        competitor_pool="Night Events",
    ),
    League(
        name="Other League",
        tagline="Have fun go for a run!",
        year=2021,
        coordinator="The Coordinator",
        website="https://example.com",
        more_information="",
        visible=True,
        scoring_method="timeAverage",
        number_of_counting_events=6,
        competitor_pool="Edinburgh Summer 2021",
    ),
]

sample_league_classes = [
    LeagueClass(
        name="Long",
        league="Sprintelope 2021",
        age_class_filter="",
        club_filter="",
        standard_course="Long",
    ),
    LeagueClass(
        name="Short",
        league="Sprintelope 2021",
        age_class_filter="",
        club_filter="",
        standard_course="Short",
    ),
    LeagueClass(
        name="Overall",
        league="Sprintelope 2021",
        age_class_filter="",
        club_filter="",
        standard_course="*",
    ),
    LeagueClass(
        name="Multiple",
        league="Sprintelope 2021",
        age_class_filter="",
        club_filter="",
        standard_course="Long|Small",
    ),
]

sample_events = [
    EventWithUploadKey(
        id="TestEvent-2021-12-12",
        name="Test Event",
        date="2021-12-12",
        competitor_pool="Edinburgh Summer 2021",
        organiser="Ben Brown",
        website="https://example.com/test-event",
        more_information="",
        results_links={
            "Standard Results": "https://example.com/test-event",
            "Routegadget": "https://test.routegadget.co.uk/rg2#52",
        },
        upload_key="UploadKeyKeepSecret",
        results_uploaded=True,
        results_uploaded_time="2021-09-19T12:47:06.401102",
    ),
    EventWithUploadKey(
        id="TheFinalCountdown-2021-12-24",
        name="The Final Countdown",
        date="2021-12-24",
        competitor_pool="Edinburgh Summer 2021",
        organiser="Saint Nicholas",
        website="https://example.com/xmas",
        more_information="",
        results_links={},
        upload_key="UploadKeyKeepSecret",
        results_uploaded=True,
        results_uploaded_time="2021-12-24T19:47:06.5",
    ),
    EventWithUploadKey(
        id="TestEvent-2022-02-03",
        name="Return of the Test Event",
        date="2022-02-03",
        competitor_pool="Edinburgh Summer 2021",
        organiser="John Doe",
        website="https://example.com/test-event-2",
        more_information="Hello World!",
        results_links={},
        upload_key="UploadKeyKeepSecret",
        results_uploaded=False,
        results_uploaded_time=None,
        allow_user_submitted_results=True,
    ),
]


sample_league_events = [
    LeagueEvent(
        id=0,
        event="TestEvent-2021-12-12",
        league="Sprintelope 2021",
        compulsory=False,
        league_group=None,
        overridden_scoring_method=None,
        expected_courses={},
    ),
    LeagueEvent(
        id=1,
        event="TheFinalCountdown-2021-12-24",
        league="Sprintelope 2021",
        compulsory=False,
        league_group=None,
        overridden_scoring_method=None,
        expected_courses={},
    ),
    LeagueEvent(
        id=2,
        event="TestEvent-2022-02-03",
        league="Sprintelope 2021",
        compulsory=False,
        league_group=None,
        overridden_scoring_method=None,
        expected_courses={},
    ),
]


sample_competitors = [
    Competitor(
        id=1,
        competitor_pool="Edinburgh Summer 2021",
        name="Robert Jones",
        club="HAT",
        age_class="M18",
        course="Long",
    ),
    Competitor(
        id=2,
        competitor_pool="Edinburgh Summer 2021",
        name="Sophie Glider",
        club="HAT",
        age_class="W21",
        course="Long",
    ),
    Competitor(
        id=3,
        competitor_pool="Edinburgh Summer 2021",
        name="Alfie Wickers",
        club="BAT",
        age_class="M35",
        course="Long",
    ),
    Competitor(
        id=4,
        competitor_pool="Edinburgh Summer 2021",
        name="Freya Smith",
        club="HAT",
        age_class="W55",
        course="Short",
    ),
]

sample_results = [
    Result(
        id=0,
        visible=True,
        time=123,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        competitor=1,
    ),
    Result(
        id=1,
        visible=True,
        time=155,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        competitor=2,
    ),
    Result(
        id=2,
        visible=True,
        time=60,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        competitor=3,
    ),
    Result(
        id=1,
        visible=True,
        time=555,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TheFinalCountdown-2021-12-24",
        competitor=2,
    ),
    Result(
        id=2,
        visible=True,
        time=454,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TheFinalCountdown-2021-12-24",
        competitor=3,
    ),
    Result(
        id=2,
        visible=True,
        time=0,
        course="Long",
        incomplete=True,
        type="",
        file_points=None,
        event="TheFinalCountdown-2021-12-24",
        competitor=4,
    ),
]


sample_event_results = [
    EventResult(
        id=0,
        visible=True,
        time=123,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        competitor=1,
        name="Robert Jones",
        club="HAT",
        age_class="M18",
    ),
    EventResult(
        id=1,
        visible=True,
        time=155,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        name="Sophie Glider",
        club="HAT",
        age_class="W21",
        competitor=2,
    ),
    EventResult(
        id=2,
        visible=True,
        time=60,
        course="Long",
        incomplete=False,
        type="",
        file_points=None,
        event="TestEvent-2021-12-12",
        competitor=3,
        name="Alfie Wickers",
        club="BAT",
        age_class="M35",
    ),
]

sample_csv_file = (
    "firstname; surname; club; ageclass; status; nonCompetitive; course; time\n"
    "Alfie; Wickers; BAT; M35; 0; N; Long; 14:54\n"
    "Bob; Jones; HAT; M18; 0; N; Long; 15:06\n"
    "Anne; Humphrey; HAT; W40; 0; N; Long; 18:01\n"
)

sample_competitor_pools = ["Edinburgh Summer 2021", "Night Events"]
