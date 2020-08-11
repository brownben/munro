from flask_restful import Resource, reqparse

from database import results
from requireAuthentication import requireAuthentication
from .returnMessages import returnMessage, returnError


transferResultParser = reqparse.RequestParser()
transferResultParser.add_argument(
    "competitor", help="This field cannot be blank", required=True
)
transferResultParser.add_argument(
    "result", help="This field cannot be blank", required=True
)


class TransferResult(Resource):
    @requireAuthentication
    def post(self):
        data = transferResultParser.parse_args()

        try:
            results.transferResult(data["result"], data["competitor"])
            return returnMessage("Result Transfered")
        except:
            return returnError(
                "Error: Problem Transferring Result - Please Try Again"
            )

