from flask_restx import Model, fields

uploadFileModel = Model(
    "Upload",
    {
        "eventId": fields.String(
            description="Event ID - League, Event, and Date of Event Concatenated with Spaces Removed",
            required=True,
            example="TestLeagueCarse2000-01-01",
        ),
        "uploadKey": fields.String(
            description="Secret required to upload the results for the event",
            example="abcdefghijk122",
            required=True,
        ),
        "file": fields.String(
            description="The results file to process",
            required=True,
        ),
        "overwrite": fields.Boolean(
            description="Overwrite Existing Results", default=False
        ),
        "results": fields.String(
            description="Link to external results page for the event (for example, theoriginal results from club)",
            example="https://example.com",
        ),
        "winsplits": fields.String(
            description="Link to a Winsplits page for the event",
            example="https://example.com",
        ),
        "routegadget": fields.String(
            description="Link to a Routegadget page for the event",
            example="https://example.com",
        ),
    },
)
