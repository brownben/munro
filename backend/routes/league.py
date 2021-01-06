from flask_restx import Namespace, Resource, fields

from ..database import League
from .requireAuthentication import requireAuthentication
from ..models.league import leagueModel
from ..models.messages import createMessage, messageModel, errorMessageModel


api = Namespace("Leagues", description="View and Manage Leagues")
api.models[leagueModel.name] = leagueModel
api.models[messageModel.name] = messageModel


@api.route("/")
class LeaguesRoute(Resource):
    @api.response(200, "Success - List of all the Leagues")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return [league.toDictionary() for league in League.getAll()]
        except:
            return [], 500

    @api.expect(leagueModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(403, "A League with that Name Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    def post(self):
        try:
            league = League(api.payload)

            if League.exists(league.name):
                return createMessage(f"League - {league.name} already Exists", 403)

            league.createLeague()
            return createMessage(f"League - {league.name} was Created", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)


@api.route("/<name>")
@api.param("name", "League Name")
class LeagueRoute(Resource):
    @api.marshal_with(leagueModel)
    @api.response(200, "Success - Details of the League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            return League.getByName(name).toDictionary()
        except:
            return None, 500

    @api.expect(leagueModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(403, "A League with that Name Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def put(self, oldName):
        try:
            league = League(api.payload)

            if league.name != oldName and League.exists(league.name):
                return createMessage(f"League - {league.name} already Exists", 403)

            league.updateLeague()
            return createMessage(f"League - {league.name} was Updated", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)

    @api.expect(leagueModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(200, "Success")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def delete(self, name):
        try:
            League.deleteLeague(name)
            return createMessage(f"League - {name} was Deleted")
        except:
            return createMessage("Problem Connecting to the Database", 500)
