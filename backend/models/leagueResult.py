from flask_restx import Model, fields

from .event import eventModel

pointsModel = Model(
    "League Result Points",
    {
        "event": fields.String(
            description="Event ID of the Event the Result Belongs To",
            readonly=True,
            example="TestLeagueCarse2000-01-01",
            required=False,
        ),
        "score": fields.Integer(
            description="Points Assigned to the Result",
            example=99,
            readonly=True,
            required=False,
        ),
        "type": fields.String(
            description="The Type of Result",
            default=None,
            readonly=True,
            required=False,
        ),
        "counting": fields.Boolean(
            description="Does the result count to the total number of points",
            example=True,
            readonly=True,
            required=False,
        ),
    },
)

leagueResultModel = Model(
    "League Result",
    {
        "id": fields.Integer(
            description="The ID of the Result", example=7, readonly=True
        ),
        "position": fields.Raw(
            description="The Position of the Result (1st, etc), blank string if not in results (incomplete)",
            example=1,
            readonly=True,
        ),
        "name": fields.String(
            description="Name of the Competitor", example="Fred Jones", readonly=True
        ),
        "ageClass": fields.String(
            description="Age Class of the Competitor",
            example="M16",
            default="",
            readonly=True,
        ),
        "club": fields.String(
            description="Club of the Competitor",
            example="INT",
            default="",
            readonly=True,
        ),
        "totalPoints": fields.Integer(
            description="Total Number of Points", example=454, readonly=True
        ),
        "points": fields.Nested(
            pointsModel, allow_null=True, as_list=True, readonly=True, skip_none=True
        ),
    },
)

leagueResultModelWithCourse = leagueResultModel.inherit(
    "League Result with Course",
    {
        "course": fields.String(
            description="Course of the Competitor", example="Long", readonly=True
        ),
    },
)


leagueResultsOverviewModel = Model(
    "League Results Overview",
    {
        "league": fields.String(
            description="Name of the league which the results are from",
            example="Sprintelope",
        ),
        "courses": fields.List(
            fields.String,
            description="List of the course names in the league",
            default=[],
            example=["Long", "Short"],
        ),
        "leagueScoring": fields.String(description="Scoring system of the league"),
        "events": fields.Nested(
            eventModel,
            allow_null=True,
            as_list=True,
            readonly=True,
            skip_none=True,
        ),
        "results": fields.Nested(
            leagueResultModel,
            allow_null=True,
            as_list=True,
            readonly=True,
            skip_none=True,
        ),
    },
)
