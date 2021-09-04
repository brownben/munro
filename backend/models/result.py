from flask_restx import Model, fields

eventResultModel = Model(
    "Event Result",
    {
        "id": fields.Integer(
            description="The ID of the Result",
            example=7,
        ),
        "time": fields.Integer(description="Result Time in Seconds", example=202052),
        "position": fields.Raw(
            description="The Position of the Result (1st, etc), blank string if not in results (incomplete)",
            example=1,
        ),
        "points": fields.Integer(
            description="Points Assigned to the Result", example=99
        ),
        "incomplete": fields.Boolean(
            description="Result is Non-Competitive, Mispunched or Disqualified",
            example=False,
        ),
        "type": fields.String(description="The Type of Result", default=None),
        "course": fields.String(description="Course of the Competitor", example="Long"),
        "name": fields.String(
            description="Name of the Competitor",
            example="Fred Jones",
        ),
        "ageClass": fields.String(
            description="Age Class of the Competitor", example="M16", default=""
        ),
        "club": fields.String(
            description="Club of the Competitor", example="INT", default=""
        ),
        "eventName": fields.String(
            description="Event Name the Result Belongs To",
            example="Blackford Hill",
        ),
        "event": fields.String(
            description="Event ID the Result Belongs To",
            example="TestLeagueCarse2000-01-01",
        ),
    },
)

transferResultModel = Model(
    "Transfer Result",
    {
        "result": fields.Integer(
            description="The ID of the Result to transfer",
            example=7,
        ),
        "competitor": fields.Integer(
            description="The ID of the Competitior to associate the result to",
            example=9,
        ),
    },
)


updateResultModel = Model(
    "Update Result",
    {
        "incomplete": fields.Boolean(
            description="Result is Non-Competitive, Mispunched or Disqualified",
            example=False,
        ),
        "type": fields.String(description="The Type of Result", default=None),
    },
)

manualResultModel = Model(
    "Manual Result",
    {
        "competitor": fields.Integer(
            description="ID of the Competitor",
            example=7,
        ),
        "event": fields.String(
            description="Event ID - League, Event, and Date of Event Concatenated with Spaces Removed",
            readonly=True,
            example="TestLeagueCarse2000-01-01",
        ),
        "points": fields.Integer(
            description="Points Assigned to the Result", example=99
        ),
    },
)

sitimingModel = Model(
    "SI Timing Scraped Results",
    {
        "eventName": fields.String(),
        "results": fields.Nested(
            eventResultModel,
            allow_null=True,
            as_list=True,
            readonly=True,
            skip_none=True,
        ),
    },
)
