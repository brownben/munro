from flask_restx import Namespace, Resource

from ..database import Result
from ..models.result import eventResultModel


api = Namespace("Results", description="View and Manage Results")
api.models[eventResultModel.name] = eventResultModel


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
