from flask_restx import Model, fields


def createMessage(message: str, code: int = 200):
    return {"message": message}, code


messageModel = Model(
    "Message",
    {
        "message": fields.String(
            description="Message from Server",
            readonly=True,
            required=True,
        ),
    },
)
