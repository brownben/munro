from flask_restful import Resource, reqparse

from database import events, leagues
from requireAuthentication import requireAuthentication

from routeFunctions import returnMessage, returnError
from uploadFunctions import recalculateResults

# Check POST request has all the relevent fields
eventParser = reqparse.RequestParser()
eventParser.add_argument(
    "name", help="This field cannot be blank", required=True
)
eventParser.add_argument("date")
eventParser.add_argument("resultUploaded")
eventParser.add_argument("organiser")
eventParser.add_argument("moreInformation")
eventParser.add_argument("website")
eventParser.add_argument("results")
eventParser.add_argument("winsplits")
eventParser.add_argument("routegadget")
eventParser.add_argument("userSubmittedResults")
eventParser.add_argument(
    "league", help="This field cannot be blank", required=True
)


def calculateEventId(data):
    return (data["league"] + data["name"] + data["date"]).replace(" ", "")


class Events(Resource):
    def get(self):
        return events.getAllEvents()

    @requireAuthentication
    def post(self):
        data = eventParser.parse_args()
        eventId = calculateEventId(data)

        if events.findEvent(eventId):
            return returnError(
                "Event - {} already Exists in this League".format(data["name"])
            )

        try:
            events.createEvent(data)
            return returnMessage("Event - {} was Created".format(data["name"]))

        except:
            return returnError(
                "Error: Problem Creating Event - Please Try Again"
            )

    @requireAuthentication
    def delete(self):
        events.deleteAllEvents()
        return returnMessage("All Events were Deleted")


class Event(Resource):
    def get(self, eventId):
        return events.findEvent(eventId)

    @requireAuthentication
    def put(self, eventId):
        data = eventParser.parse_args()
        name = data["name"]
        newId = calculateEventId(data)

        if newId != eventId and events.findEvent(newId):
            return returnError(
                "Event with Name {} already Exists in this League".format(name)
            )

        try:
            events.updateEvent(
                {"eventId": eventId, **data,}
            )
            return returnMessage("Event - {} was Updated".format(name))
        except:
            return returnError(
                "Error: Problem Updating Event - Please Try Again"
            )

    @requireAuthentication
    def delete(self, eventId):
        event = events.findEvent(eventId)
        events.deleteEvent(eventId)
        return returnMessage("Event - {} was Deleted".format(event["name"]))


class EventWithUploadKey(Resource):
    @requireAuthentication
    def get(self, eventId):
        return events.getEventWithUploadKey(eventId)


class EventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self):
        return events.getAllEventsWithUploadKey()


class EventsLatestWithResults(Resource):
    def get(self):
        return events.getLatestEventsWithResults()


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
