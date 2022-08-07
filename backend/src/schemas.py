import datetime
from typing import Dict, List, Literal, Optional, Union

from pydantic import BaseModel
from pydantic.networks import HttpUrl


class League(BaseModel):
    name: str
    tagline: str
    year: int
    coordinator: str
    website: Union[HttpUrl, Literal[""]]
    more_information: str

    visible: bool = True
    scoring_method: str
    number_of_counting_events: int
    competitor_pool: str


class LeagueGroup(BaseModel):
    name: str
    league: str

    min: int
    max: int


class LeagueClass(BaseModel):
    name: str
    league: str

    standard_course: Optional[str]
    age_class_filter: str
    club_filter: str
    number_of_counting_events: Optional[int]


class Event(BaseModel):
    id: str
    name: str
    date: datetime.date

    competitor_pool: str

    organiser: str
    website: Union[HttpUrl, Literal[""]]
    more_information: str
    results_links: Dict[str, Union[HttpUrl, Literal[""]]]
    part_of: str = ""

    results_uploaded: bool = False
    results_uploaded_time: Optional[datetime.datetime]

    allow_user_submitted_results: bool = False


class EventCreationRequest(BaseModel):
    name: str
    date: datetime.date
    organiser: str = ""
    part_of: str = ""
    website: Union[HttpUrl, Literal[""]]
    more_information: str
    results_links: Dict[str, Union[HttpUrl, Literal[""]]]
    allow_user_submitted_results: bool = False
    league: str
    compulsory: bool = False
    league_group: Optional[str] = None
    overridden_scoring_method: Optional[str] = None
    expected_courses: Optional[Dict[str, str]]


class EventWithUploadKey(Event):
    upload_key: str


class LeagueEventDatabase(BaseModel):
    id: int

    event: str
    league: str

    compulsory: bool = False
    league_group: Optional[str]
    overridden_scoring_method: Optional[str]

    expected_courses: Optional[Dict[str, str]]


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
    file_points: Optional[int]

    event: str
    competitor: int


class ResultBeforeDatabase(BaseModel):
    time: int
    course: str
    incomplete: bool = False
    file_points: Optional[int]
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


class Competitor(NewCompetitor):
    id: int


class CompetitorPool(BaseModel):
    name: str


# Requests and Repsonses
class UploadRequest(BaseModel):
    event_id: str
    upload_key: str
    overwrite: bool = False

    results_links: Optional[Dict[str, Union[HttpUrl, Literal[""]]]]


class UploadFileRequest(UploadRequest):
    file: str


class UploadURLRequest(UploadRequest):
    url: str


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

    points: List[Optional[LeagueResultScore]] = []


class LeagueResultsResponse(BaseModel):
    league: str
    class_name: str
    classes: List[str]
    results: List[LeagueResult]
    events: List[LeagueEvent]


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
    position: Optional[int]


class EventWithResults(BaseModel):
    id: Optional[str]
    name: str
    league: str

    date: Optional[datetime.date]
    organiser: Optional[str]
    website: Union[HttpUrl, Literal[""]]
    results_links: Dict[str, Union[HttpUrl, Literal[""]]]

    results: List[EventResult]


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
    age_class: Optional[str]
    club: Optional[str]


class LeagueOverview(League):
    classes: List[LeagueClass]
    events: List[Event]


class LeagueOverviewAuthenticated(League):
    classes: List[LeagueClass]
    events: List[EventWithUploadKey]


class SearchResult(BaseModel):
    leagues: List[League]
    events: List[Event]
    competitors: List[Competitor]


class HomeDetails(BaseModel):
    leagues: int
    events: int
    results: int
    latestResults: List[Event]


class CompetitorOverview(Competitor):
    results: List[ResultWithEventName]
    league: str


class ResultUpdate(BaseModel):
    incomplete: Optional[bool]
    visible: Optional[bool]


class ManualResultRequest(BaseModel):
    event: str
    course: str
    type: str = ""
    time: str = ""
    points: int = 0
    visible: bool = True
    incomplete: bool = False
    competitor: Optional[int] = None
