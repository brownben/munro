from flask_restx import Namespace, Resource

from .requireAuthentication import requireAuthentication
from ..database.result import Result
from ..models.result import (
    eventResultModel,
    transferResultModel,
    updateResultModel,
    manualResultModel,
)
from ..models.messages import createMessage, messageModel
from ..utils.calculateResults import recalculateResults
from ..utils.helpers import toInt

api = Namespace("Results", description="View and Manage Results")
api.models[eventResultModel.name] = eventResultModel
api.models[transferResultModel.name] = transferResultModel
api.models[updateResultModel.name] = updateResultModel
api.models[manualResultModel.name] = manualResultModel
api.models[messageModel.name] = messageModel


@api.route("")
@api.route("/")
class ResultsRoute(Resource):
    @api.marshal_with(eventResultModel, as_list=True)
    @api.response(200, "Success - List of all the Results")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return [result.toDictionary() for result in Result.getAll()]
        except:
            return [], 500


@api.route("/<resultId>")
@api.param("id", "Result ID")
class ResultRoute(Resource):
    @api.marshal_with(eventResultModel)
    @api.response(200, "Success - Details of the Result")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, resultId):
        try:
            return Result.getById(toInt(resultId)).toDictionary()
        except:
            return None, 500

    @api.expect(transferResultModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success - Result Updated")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def put(self, resultId):
        try:
            request = api.payload

            result = Result.getById(toInt(resultId))
            event = result.getEvent()
            league = event.getLeague()

            if request.get("type") != None:
                result.updateType(request.get("type"))
            elif request.get("incomplete") != None:
                result.updateIncomplete(request.get("incomplete"))

            recalculateResults(event.id, league.scoringMethod)
            return createMessage("Result Updated", 200)
        except:
            return createMessage("Problem Updating Result", 500)


@api.route("/transfer")
class TransferResultRoute(Resource):
    @api.expect(transferResultModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success - Result Transfered")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            request = api.payload
            Result.transfer(request["competitor"], request["result"])
            return createMessage("Result Transfered")
        except:
            return createMessage("Problem Transferring Result", 500)


@api.route("/manual")
class ManualResultRoute(Resource):
    @api.expect(manualResultModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success - Points Given")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            data = api.payload
            result = Result(
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
            result.create()
            return createMessage("Points Assigned")
        except:
            return createMessage("Problem Assigning Points", 500)
