from flask_restful import Resource, reqparse

from database import events, leagues
from requireAuthentication import requireAuthentication
from routeFunctions import returnMessage, returnError

# Check POST request has all the relevent fields
# Create request
leagueParser = reqparse.RequestParser()
leagueParser.add_argument(
    "name", help="This field cannot be blank", required=True
)
leagueParser.add_argument("website")
leagueParser.add_argument("coordinator")
leagueParser.add_argument("numberOfCountingEvents")
leagueParser.add_argument(
    "scoringMethod", help="This field cannot be blank", required=True
)
leagueParser.add_argument("courses")
leagueParser.add_argument("description")
leagueParser.add_argument("year")
leagueParser.add_argument("dynamicEventResults")
leagueParser.add_argument("moreInformation")
# Update request
leagueUpdateParser = leagueParser
leagueUpdateParser.add_argument("oldName")


class Leagues(Resource):
    def get(self):
        return leagues.getAllLeagues()

    @requireAuthentication
    def post(self):
        data = leagueParser.parse_args()
        name = data["name"]

        if leagues.findLeague(name):
            return returnError("League - {} already Exists".format(name))

        try:
            leagues.createLeague(data)
            return returnMessage("League - {} was Created".format(name))
        except:
            return returnError(
                "Error: Problem Creating League - Please Try Again"
            )


class League(Resource):
    def get(self, name):
        return leagues.findLeague(name)

    @requireAuthentication
    def put(self, name):
        data = leagueUpdateParser.parse_args()
        name = data["name"]

        if data["name"] != data["oldName"] and leagues.findLeague(name):
            return returnError(
                "League with Name - {} already Exists".format(name)
            )

        try:
            leagues.updateLeague(data)
            return returnMessage("League - {} was Updated".format(name))

        except:
            return returnError(
                "Error: Problem Updating League - Please Try Again"
            )

    @requireAuthentication
    def delete(self, name):
        try:
            leagues.deleteLeague(name)
            return returnMessage("League - {} was Deleted".format(name))
        except:
            return returnError("Problem Deleting League")


class LeagueEvents(Resource):
    def get(self, name):
        return events.getEventsOfLeague(name)


class LeagueEventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self, name):
        return events.getEventsOfLeagueWithUploadKey(name)
