from flask_restful import Resource

from database import events, leagues
from requireAuthentication import requireAuthentication
from .returnMessages import returnMessage, returnError
from uploadFunctions import recalculateResults


class EventRecalculateResults(Resource):
    @requireAuthentication
    def post(self, eventId):
        try:
            eventData = events.getEventWithUploadKey(eventId)
            leagueOfEvent = leagues.findLeague(eventData["league"])
        except:
            return returnError("Problem Getting Information from the Database")

        try:
            recalculateResults(eventId, leagueOfEvent["scoringMethod"])
            return returnMessage(
                "Event - {} was Results Updated".format(eventData["name"])
            )

        except:
            return returnError(
                "Error: Problem Recalculating Results - Please Try Again"
            )
