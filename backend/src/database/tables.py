from piccolo.columns.base import OnDelete, OnUpdate
from piccolo.columns.column_types import (
    JSON,
    Boolean,
    Date,
    ForeignKey,
    Integer,
    Serial,
    Text,
    Timestamp,
    Varchar,
)
from piccolo.table import Table


class CompetitorPool(Table):
    name = Varchar(40, null=False, primary_key=True)


class League(Table):
    name = Varchar(50, null=False, primary_key=True)
    tagline = Varchar(200)
    year = Integer()
    coordinator = Varchar(25)
    website = Text(null=True)
    more_information = Text()
    visible = Boolean()
    scoring_method = Varchar(40)
    number_of_counting_events = Integer()
    competitor_pool = ForeignKey(CompetitorPool)


class LeagueGroup(Table):
    id = Serial(primary_key=True)
    name = Varchar(20, null=False)
    league = ForeignKey(League)
    min = Integer()
    max = Integer()


class LeagueClass(Table):
    id = Serial(primary_key=True)
    name = Varchar(50, null=False)
    league = ForeignKey(League)
    standard_course = Varchar(30, null=True)
    age_class_filter = Varchar(30)
    club_filter = Varchar(50)
    number_of_counting_events = Integer(null=True)


class Competitor(Table):
    id = Serial(primary_key=True)
    competitor_pool = ForeignKey(CompetitorPool)
    name = Varchar(100, null=False)
    club = Varchar(40)
    age_class = Varchar(20)


class Event(Table):
    id = Varchar(120, null=False, primary_key=True)
    name = Varchar(100, null=False)
    date = Date(null=False)

    competitor_pool = ForeignKey(CompetitorPool)

    organiser = Varchar(50)
    website = Text()
    more_information = Text()
    results_links = JSON()
    part_of = Text()

    upload_key = Varchar(30)
    results_uploaded = Boolean(default=False)
    results_uploaded_time = Timestamp(null=True)

    allow_user_submitted_results = Boolean(default=False)


class LeagueEvent(Table):
    id = Serial(primary_key=True)
    league = ForeignKey(League)
    event = ForeignKey(Event)
    league_group = ForeignKey(
        references=LeagueGroup,
        null=True,
        default=None,
        on_delete=OnDelete.set_null,
    )

    compulsory = Boolean()
    overridden_scoring_method = Varchar(40, null=True)
    expected_courses = JSON(default={})


class Result(Table):
    id = Serial(primary_key=True)
    event = ForeignKey(
        Event,
        on_delete=OnDelete.cascade,
        on_update=OnUpdate.cascade,
    )
    competitor = ForeignKey(
        Competitor,
        on_delete=OnDelete.cascade,
        on_update=OnUpdate.cascade,
    )

    visible = Boolean(default=True)
    time = Integer()
    course = Varchar(30)
    incomplete = Boolean(default=False)
    type = Varchar(10)
    file_points = Integer(null=True)
