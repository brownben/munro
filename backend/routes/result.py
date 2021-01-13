from flask_restx import Namespace, Resource

from ..database import Result
from .requireAuthentication import requireAuthentication
from ..models.result import eventResultModel, transferResultModel
from ..models.messages import createMessage, messageModel

api = Namespace("Results", description="View and Manage Results")
api.models[eventResultModel.name] = eventResultModel
api.models[transferResultModel.name] = transferResultModel
api.models[messageModel.name] = messageModel


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
            return Result.getById(resultId).toDictionary()
        except:
            return None, 500


@api.route("/transfer")
class TransferResultRoute(Resource):
    @api.expect(transferResultModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success - Competitors Merged")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            request = api.payload
            Result.transfer(request.result, request.competitor)
            return createMessage("Result Transfered", 200)
        except:
            return createMessage("Problem Transferring Result", 500)
