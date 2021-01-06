from flask_restx import Namespace, Resource

from ..database import Competitor
from .requireAuthentication import requireAuthentication
from ..models.competitor import competitorModel
from ..models.messages import createMessage, messageModel


api = Namespace("Competitors", description="View and Manage Competitors")
api.models[competitorModel.name] = competitorModel
api.models[messageModel.name] = messageModel


@api.route("/")
class CompetitorsRoute(Resource):
    @api.response(200, "Success - List of all Competitors")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        return [competitor.toDictionary() for competitor in Competitor.getAll()]
        # try:
        #     return [competitor.toDictionary() for competitor in Competitor.getAll()]
        # except:
        #     return [], 500

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
