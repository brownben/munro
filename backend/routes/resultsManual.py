from flask_restful import Resource, reqparse

from database import results
from requireAuthentication import requireAuthentication
from .returnMessages import returnMessage, returnError

manualResultParser = reqparse.RequestParser()
manualResultParser.add_argument(
    "competitor", help="This field cannot be blank", required=True
)
manualResultParser.add_argument(
    "event", help="This field cannot be blank", required=True
)
manualResultParser.add_argument(
    "points", help="This field cannot be blank", required=True
)


class ManualResult(Resource):
    @requireAuthentication
    def post(self):
        try:
            data = manualResultParser.parse_args()
            results.createResult(
                {
                    "time": 0,
                    "position": "",
                    "points": data["points"],
                    "incomplete": False,
                    "event": data["event"],
                    "competitor": data["competitor"],
                    "type": "manual",
                }
            )
            return returnMessage("Points Assigned")
        except:
            return returnError(
                "Error: Problem Assigning Points - Please Try Again"
            )
