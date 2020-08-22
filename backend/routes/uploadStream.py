from flask_restful import Resource, reqparse

import csvFunctions as csv
import uploadFunctions as upload
from points import dynamicPoints
from database import events, results
from .returnMessages import returnMessage, returnError

streamParser = reqparse.RequestParser()
streamParser.add_argument("eventId", help="This field cannot be blank", required=True)
streamParser.add_argument("uploadKey", help="This field cannot be blank", required=True)
streamParser.add_argument("file", help="This field cannot be blank", required=True)
streamParser.add_argument("course", help="This field cannot be blank", required=True)


class UploadStream(Resource):
    def post(self):
        data = streamParser.parse_args()
        eventData, leagueOfEvent = upload.getEventLeagueData(data["eventId"])
        existingResults = results.getResultsByEventForRecalc(data["eventId"])

        if eventData == "error":
            return leagueOfEvent

        if eventData["uploadKey"] != data["uploadKey"]:
            return returnError("Upload Key is Incorrect")

        try:
            streamData = data["file"].split("\n")
            resultsList = [
                upload.streamResultToDict(result, data["eventId"], data["course"])
                for result in streamData
            ]
            resultsToAdd = upload.newResults(existingResults, resultsList)
            resultsWithCompetitors = upload.getCompetitorData(eventData, resultsToAdd)

            for result in resultsWithCompetitors:
                results.createResult(result)

            upload.recalculateResults(data["eventId"], leagueOfEvent["scoringMethod"])
            dynamicPoints.calculate(eventData["league"])

            events.setResultsUploaded(True, data["eventId"])

            return returnMessage(str(len(resultsWithCompetitors)) + " Results Imported")

        except:
            return returnError("Problem Processing Uploaded Data")
