from flask_restx import Model, fields

competitorModel = Model(
    "Competitor",
    {
        "id": fields.Integer(
            description="ID of the Competitor",
            example=7,
        ),
        "name": fields.String(
            description="Name of the Competitor",
            required=True,
            example="Fred Jones",
        ),
        "ageClass": fields.String(
            description="Age Class of the Competitor", example="M16", default=""
        ),
        "club": fields.String(
            description="Club of the Competitor", example="INT", default=""
        ),
        "course": fields.String(
            description="Course of the Competitor", example="Long", required=True
        ),
        "league": fields.String(
            description="League of the Competitor",
            example="(not) Sprintelope 2020",
            required=True,
        ),
    },
)

competitorMergeModel = Model(
    "Competitor Merge",
    {
        "competitorKeep": fields.Integer(
            description="The ID of the Competitor to Keep and Transfer Result To",
            example=7,
        ),
        "competitorMerge": fields.Integer(
            description="The ID of the Competitior to Delete", example=9
        ),
    },
)
