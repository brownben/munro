from flask_restx import Model, fields
from .league import leagueModel
from .event import eventModel
from .competitor import competitorModel

searchModel = Model(
    "Search Result",
    {
        "leagues": fields.Nested(
            leagueModel, skip_none=True, as_list=True, readonly=True
        ),
        "events": fields.Nested(
            eventModel, skip_none=True, as_list=True, readonly=True
        ),
        "competitors": fields.Nested(
            competitorModel, skip_none=True, as_list=True, readonly=True
        ),
    },
)
