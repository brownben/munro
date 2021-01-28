from typing import Dict, Tuple
from flask_restx import Model, fields

MessageResponse = Tuple[Dict[str, str], int]

def createMessage(message: str, code: int = 200) -> MessageResponse:
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
