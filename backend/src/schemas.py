# ruff: noqa: UP007

import datetime
from typing import Literal, Optional

from pydantic import BaseModel
from pydantic.networks import HttpUrl


class League(BaseModel):
    name: str
    tagline: str
    year: int
    coordinator: str
    website: HttpUrl | Literal[""]
    more_information: str

    visible: bool = True
    scoring_method: str
    number_of_counting_events: int
    competitor_pool: str


class LeagueGroup(BaseModel):
    id: Optional[int] = None
    name: str
    league: str

    min: int
    max: int


class LeagueClass(BaseModel):
    name: str
    league: str

    standard_course: Optional[str] = None
    age_class_filter: str
    club_filter: str
    number_of_counting_events: Optional[int] = None


class Event(BaseModel):
    id: str
    name: str
    date: datetime.date

    competitor_pool: str

    organiser: str
    website: HttpUrl | Literal[""]
    more_information: str
    results_links: dict[str, HttpUrl | Literal[""]]
    part_of: str = ""

    results_uploaded: bool = False
    results_uploaded_time: Optional[datetime.datetime] = None

    allow_user_submitted_results: bool = False


class EventCreationRequest(BaseModel):
    name: str
    date: datetime.date
    organiser: str = ""
    part_of: str = ""
    website: HttpUrl | Literal[""]
    more_information: str
    results_links: dict[str, HttpUrl | Literal[""]]
    allow_user_submitted_results: bool = False
    league: str
    compulsory: bool = False
    league_group: Optional[int] = None
    overridden_scoring_method: Optional[str] = None
    expected_courses: Optional[dict[str, str]] = None


class EventWithLeagueDetails(Event):
    group: Optional[str] = None


class EventWithUploadKey(Event):
    upload_key: str


class EventWithLeagueDetailsAndUploadKey(EventWithLeagueDetails):
    upload_key: str


class LeagueEventCreationRequest(BaseModel):
    event: str
    league: str

    compulsory: bool = False
    league_group: Optional[int] = None
    overridden_scoring_method: Optional[str] = None

    expected_courses: Optional[dict[str, str]] = None


class LeagueEventDatabase(LeagueEventCreationRequest):
    id: int


class LeagueEvent(LeagueEventDatabase):
    # Not in table just fetched so full event isn't needed
    event_name: Optional[str] = None


class ResultBase(BaseModel):
    id: int
    visible: bool = True

    time: int
    course: str
    incomplete: bool
    type: str
    file_points: Optional[int] = None

    event: str
    competitor: int


class ResultBeforeDatabase(BaseModel):
    time: int
    course: str
    incomplete: bool = False
    file_points: Optional[int] = None
    event: str

    type: str = ""
    visible: bool = True
    competitor: Optional[int] = None


class Result(ResultBase):
    # Dynamically added when computing results
    position: int = 0
    points: int = 0


class ResultWithEventName(ResultBase):
    event_name: str


class NewCompetitor(BaseModel):
    name: str
    competitor_pool: str

    club: str = ""
    age_class: str = ""
    eligible: bool = True


class Competitor(NewCompetitor):
    id: int


class CompetitorEligibility(BaseModel):
    eligible: bool


class CompetitorPool(BaseModel):
    name: str
    eligibility: bool = False


# Requests and Repsonses
class UploadRequest(BaseModel):
    event_id: str
    upload_key: str
    overwrite: bool = False
    partial: bool = False

    results_links: dict[str, HttpUrl | Literal[""]] = {}


class UploadFileRequest(UploadRequest):
    file: str


class UploadURLRequest(UploadRequest):
    url: HttpUrl


class LeagueResultScore(BaseModel):
    event: str
    score: int
    counting: int = False
    type: str

    def __hash__(self) -> int:
        # Used by utils.couting_results so it can be put in a set
        return hash((self.event, self.score))


class LeagueResult(BaseModel):
    id: int

    name: str
    club: str
    age_class: str

    total_points: int = 0
    position: int = 0

    points: list[Optional[LeagueResultScore]] = []
    eligible: bool = True


class LeagueResultsResponse(BaseModel):
    league: str
    class_name: str
    classes: list[str]
    results: list[LeagueResult]
    events: list[LeagueEvent]
    eligibility: bool = False


class EventResult(BaseModel):
    id: int
    name: str
    club: str
    age_class: str
    time: int
    course: str
    incomplete: bool
    type: str
    competitor: int
    position: Optional[int] = None


class EventWithResults(BaseModel):
    id: Optional[str] = None
    name: str
    league: str

    date: Optional[datetime.date] = None
    organiser: Optional[str] = None
    website: HttpUrl | Literal[""]
    results_links: dict[str, HttpUrl | Literal[""]]

    results: list[EventResult]


class Message(BaseModel):
    detail: str


class CompetitorMergeRequest(BaseModel):
    competitor_to_merge: int
    competitor_to_keep: int


class ResultTransferRequest(BaseModel):
    competitor: int
    result: int


class UploadResultRequest(BaseModel):
    event: str
    name: str
    time: str
    course: str
    age_class: Optional[str] = None
    club: Optional[str] = None


class LeagueOverview(League):
    classes: list[LeagueClass]
    events: list[EventWithLeagueDetails]
    groups: list[LeagueGroup]


class LeagueOverviewAuthenticated(League):
    classes: list[LeagueClass]
    events: list[EventWithLeagueDetailsAndUploadKey]
    groups: list[LeagueGroup]


class SearchResult(BaseModel):
    leagues: list[League]
    events: list[Event]
    competitors: list[Competitor]


class HomeDetails(BaseModel):
    leagues: int
    events: int
    results: int
    latestResults: list[Event]


class StatsOverview(BaseModel):
    leagues: int
    events: int
    results: int


class CompetitorOverview(Competitor):
    results: list[ResultWithEventName]
    league: str


class CompetitorPoolOverview(CompetitorPool):
    competitors: list[Competitor]
    leagues: list[League]


class ResultUpdate(BaseModel):
    incomplete: Optional[bool] = None
    visible: Optional[bool] = None


class ManualResultRequest(BaseModel):
    event: str
    course: str
    type: str = ""
    time: str = ""
    points: int = 0
    visible: bool = True
    incomplete: bool = False
    competitor: Optional[int] = None
