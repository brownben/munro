from flask_restful import Resource, reqparse

from database import events, leagues
from requireAuthentication import requireAuthentication

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
            return {"message": "League - {} already Exists".format(name)}, 500

        try:
            leagues.createLeague(
                data["name"],
                data["website"],
                data["coordinator"],
                data["scoringMethod"],
                data["numberOfCountingEvents"],
                data["courses"],
                data["description"],
                data["year"],
                data["dynamicEventResults"],
            )
            return {"message": "League - {} was Created".format(name)}
        except:
            return (
                {
                    "message": "Error: Problem Creating League - Please Try Again"
                },
                500,
            )


class League(Resource):
    def get(self, name):
        return leagues.findLeague(name)

    @requireAuthentication
    def put(self, name):
        data = leagueUpdateParser.parse_args()
        name = data["name"]

        if data["name"] != data["oldName"] and leagues.findLeague(name):
            return (
                {
                    "message": "League with Name - {} already Exists".format(
                        name
                    )
                },
                500,
            )

        try:
            leagues.updateLeague(
                data["oldName"],
                data["name"],
                data["website"],
                data["coordinator"],
                data["scoringMethod"],
                data["numberOfCountingEvents"],
                data["courses"],
                data["description"],
                data["year"],
                data["dynamicEventResults"],
            )
            return {"message": "League - {} was Updated".format(name)}
        except:
            return (
                {
                    "message": "Error: Problem Updating League - Please Try Again"
                },
                500,
            )

    @requireAuthentication
    def delete(self, name):
        try:
            leagues.deleteLeague(name)
            return {"message": "League - {} was Deleted".format(name)}
        except:
            return {"message": "Problem Deleting League"}, 500


class LeagueEvents(Resource):
    def get(self, name):
        return events.getEventsOfLeague(name)


class LeagueEventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self, name):
        return events.getEventsOfLeagueWithUploadKey(name)
