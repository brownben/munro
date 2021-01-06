from flask_restx import Model, fields

eventModelBody = {
    "name": fields.String(
        description="Event Name", required=True, example="Blackford Hill"
    ),
    "date": fields.String(description="Date of the Event", example="2020-10-14"),
    "website": fields.String(
        description="Website for the event", example="https://example.com"
    ),
    "organiser": fields.String(
        description="Organiser of the Event", example="Edward Paper"
    ),
    "moreInformation": fields.String(
        description="Extra Information About the Event",
        example="Postponed from January",
    ),
    "league": fields.String(
        description="The League to Which the Event Belongs",
        example="(not) Sprintelope 2020",
        required=True,
    ),
    "resultUploaded": fields.Boolean(
        description="Have Results Been Uploaded", readonly=True, default=False
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
    "userSubmittedResults": fields.Boolean(
        description="Allow Users to Submit Results", default=False
    ),
}

eventModel = Model(
    "Event",
    eventModelBody,
)

eventModelWithUploadKey = Model(
    "EventWithUploadKey",
    {
        **eventModelBody,
        "uploadKey": fields.String(
            description="Secret required to upload the results for the event",
            example="abcdefghijk122",
        ),
    },
)
