from flask_restx import Namespace, Resource

from ..database import Competitor, Result
from .requireAuthentication import requireAuthentication
from ..models.competitor import competitorModel, competitorMergeModel
from ..models.result import eventResultModel
from ..models.messages import createMessage, messageModel


api = Namespace("Competitors", description="View and Manage Competitors")
api.models[competitorModel.name] = competitorModel
api.models[competitorMergeModel.name] = competitorMergeModel
api.models[messageModel.name] = messageModel


@api.route("/")
class CompetitorsRoute(Resource):
    @api.marshal_with(competitorModel, as_list=True)
    @api.response(200, "Success - List of all Competitors")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return [competitor.toDictionary() for competitor in Competitor.getAll()]
        except:
            return [], 500

    @api.expect(competitorModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            competitor = Competitor(api.payload)
            competitor.create()
            return createMessage(f"Competitor - '{competitor.name}' was Created", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)


@api.route("/<competitorId>")
@api.param("competitorId", "Competitor ID")
class CompetitorRoute(Resource):
    @api.marshal_with(competitorModel)
    @api.response(200, "Success - Details of the Competitor")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, competitorId):
        try:
            return Competitor.getById(competitorId).toDictionary()
        except:
            return None, 500

    @api.expect(competitorModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def put(self, competitorId):
        try:
            competitor = Competitor(api.payload)
            competitor.update()
            return createMessage(f"Competitor - '{competitor.name}' was Updated", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)

    @api.marshal_with(messageModel)
    @api.response(200, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def delete(self, competitorId):
        try:
            Competitor.deleteById(competitorId)
            return createMessage(f"Competitor was Deleted")
        except:
            return createMessage("Problem Connecting to the Database", 500)


@api.route("/<competitorId>/results")
@api.param("competitorId", "Competitor ID")
class EventResultsRoute(Resource):
    @api.marshal_with(eventResultModel, as_list=True)
    @api.response(200, "Success - Results of the Competitor")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, competitorID):
        try:
            return [
                result.toDictionary() for result in Result.getByCompetitor(competitorID)
            ]
        except:
            return None, 500


@api.route("/merge")
class CompetitorMergeRoute(Resource):
    @api.expect(competitorMergeModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success - Competitors Merged")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            request = api.payload
            Competitor.merge(request.competitorKeep, request.competitorMerge)
            return createMessage("Competitors Merged Successfully", 200)
        except:
            return createMessage("Problem Merging Competitors", 500)
