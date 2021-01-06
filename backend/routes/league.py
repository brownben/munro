from flask import jsonify
from flask_restx import Namespace, Resource, fields
from models import League

api = Namespace("Leagues", description="View and Manage Leagues")


@api.route("/")
class LeaguesRoute(Resource):
    @api.response(200, "Success - List of all the Leagues")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return jsonify([league.toDictionary() for league in League.getAll()])
        except:
            return jsonify([]), 500


@api.route("/<name>")
@api.param("name", "League Name")
class LeagueRoute(Resource):
    @api.response(200, "Success - Details of the League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            return League.getByName(name).toDictionary()
        except:
            return jsonify(None), 500
