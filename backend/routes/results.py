from flask_restful import Resource, reqparse

from database import results, events, leagues
from uploadFunctions import recalculateResults
from requireAuthentication import requireAuthentication
from .returnMessages import returnMessage, returnError

resultParser = reqparse.RequestParser()
resultParser.add_argument("event")
resultParser.add_argument("competitor")
resultParser.add_argument("rowid")
resultParser.add_argument("time")
resultParser.add_argument("position")
resultParser.add_argument("points")
resultParser.add_argument("incomplete")
resultParser.add_argument("type")
resultParser.add_argument("action")
resultParser.add_argument("course")


class Results(Resource):
    def get(self):
        return results.getAllResults()

    @requireAuthentication
    def post(self):
        data = resultParser.parse_args()

        try:
            results.createResult(data)
            return returnMessage("Result was Created")

        except:
            return returnError("Error: Problem Creating Result - Please Try Again")

    @requireAuthentication
    def delete(self):
        results.deleteAllResults()
        return returnMessage("All Results were Deleted")


class Result(Resource):
    def get(self, resultId):
        try:
            return results.getResult(resultId)
        except:
            return returnError("Error: Problem Fetching Result - Please Try Again")

    @requireAuthentication
    def put(self, resultId):
        data = resultParser.parse_args()
        data["rowid"] = resultId

        try:
            eventData = events.getEventWithUploadKey(data["event"])
            leagueOfEvent = leagues.findLeague(eventData["league"])
        except:
            return returnError("Problem Getting Information from the Database")

        try:
            message = ""
            if data.get("action"):
                message = updatePartialResult(data)
            else:
                message = updateFullResult(data)

            recalculateResults(data["event"], leagueOfEvent["scoringMethod"])
            return returnMessage(message)

        except:
            return returnError("Error: Problem Updating Results - Please Try Again")

    @requireAuthentication
    def delete(self, resultId):
        try:
            results.deleteResult(resultId)
            return returnMessage("Result Deleted")
        except:
            return returnError("Error: Problem Deleting Result - Please Try Again")


def updateFullResult(data):
    if data.get("competitor") and data.get("event"):
        results.updateResult(data)
        return returnMessage("Result was Updated")
    elif data.get("competitor"):
        return returnError("event cannot be empty")
    else:
        return returnError("competitor cannot be empty")


def updatePartialResult(data):
    if not data.get("rowid"):
        return returnError("rowid cannot be empty")
    elif data.get("action") == "incomplete":
        results.updateResultIncomplete(data)
        return returnMessage("Result was Updated")
    elif data.get("action") == "hide":
        results.updateResultHidden(data)
        return returnMessage("Result was Updated")
