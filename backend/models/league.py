from flask_restx import Model, fields
from .event import eventModelWithUploadKey

leagueModel = Model(
    "League",
    {
        "name": fields.String(
            description="Name of the League",
            required=True,
            example="(Not) Sprintelope 2020",
        ),
        "year": fields.Integer(description="The Year of the Event", example=2020),
        "description": fields.String(
            description="Description/ Tagline for the League",
            default="",
            example="Socially Distant Sprint/ Urban Orienteering Events in Edinburgh and the Lothians",
        ),
        "moreInformation": fields.String(
            description="Extra Information About the League",
            default="",
            example='We are aiming to make a new "event" available each week',
        ),
        "coordinator": fields.String(
            description="Person Coordinating the League", default="", example="John Doe"
        ),
        "website": fields.String(
            description="League Website", default="", example="https://example.com"
        ),
        "courses": fields.List(
            fields.String,
            description="List of Course Names to Calculate Results for in the League",
            default=[],
            example=["Long", "Short"],
        ),
        "leagueScoring": fields.String(
            description="Type of Scoring for the League, 'overall', or 'course'",
            default="course",
            example="course",
        ),
        "scoringMethod": fields.String(
            description="The Scoring Method to Use When Calculating Results",
            required=True,
            example="position",
        ),
        "numberOfCountingEvents": fields.Integer(
            description="Number of Events Counting for League Total", min=0, example=2
        ),
        "dynamicEventResults": fields.Boolean(
            description="Interactive View of Event Results", default=True, example=True
        ),
        "clubRestriction": fields.String(
            description="Club to Filter the Events To", default="", example=""
        ),
        "numberOfEvents": fields.Integer(
            description="Number of Events in the League", readonly=True, example=7
        ),
        "subLeagueOf": fields.String(
            description="League which can inherit events from, must have the same Scoring System and Courses",
            default=None,
            example="Sprintelope",
        ),
        "additionalSettings": fields.String(
            description="Extra Settings for the League", default=""
        ),
    },
)


leagueOverviewModel = leagueModel.inherit(
    "League Overview",
    {
        "events": fields.Nested(
            eventModelWithUploadKey,
            allow_null=True,
            as_list=True,
            readonly=True,
            skip_none=True,
        ),
    },
)
