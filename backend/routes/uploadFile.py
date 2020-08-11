from flask_restful import Resource, reqparse

import csvFunctions as csv
from points import assignPoints, dynamicPoints
import uploadFunctions as upload
from database import competitors, leagues, events, results
from .returnMessages import returnMessage, returnError


# Check POST request for upload has all the relevent fields
uploadParser = reqparse.RequestParser()
uploadParser.add_argument(
    "eventId", help="This field cannot be blank", required=True
)
uploadParser.add_argument(
    "uploadKey", help="This field cannot be blank", required=True
)
uploadParser.add_argument(
    "file", help="This field cannot be blank", required=True
)
uploadParser.add_argument("overwrite")
uploadParser.add_argument("results")
uploadParser.add_argument("winsplits")
uploadParser.add_argument("routegadget")


class Upload(Resource):
    def post(self):
        data = uploadParser.parse_args()
        try:
            return checkUpload(data)
        except:
            return returnError("Problem Processing Uploaded Data")


def getEventLeagueData(eventId):
    try:
        eventData = events.getEventWithUploadKey(eventId)
        leagueOfEvent = leagues.findLeague(eventData["league"])

        return eventData, leagueOfEvent

    except:
        return returnError("Problem Getting Information from the Database")


def checkUpload(data):
    # get all relevent data from other parts of the database
    eventData, leagueOfEvent = getEventLeagueData(data["eventId"])

    # Check upload credentials are correct
    if eventData["uploadKey"] != data["uploadKey"]:
        return returnError("Upload Key is Incorrect")

    # Check the user wants to overwrite data if it already exists. If it does  and they want ot overwrite it deletes the existing data
    if data["overwrite"] != "True" and eventData["resultUploaded"]:
        return returnError(
            "Results Already Exist for this Event and Overwrite was not Enabled"
        )

    elif data["overwrite"] == "True":
        results.deleteResultsByEvent(eventData["id"])

    return processUpload(data, eventData, leagueOfEvent)


def processUpload(data, eventData, leagueOfEvent):
    # Parse file into 2D array and then place into an object, assigning points to each results
    splitData = csv.splitData(data["file"].strip())
    headerLocations = csv.findHeaders(splitData)
    if not headerLocations:
        return {"message": "Data is in an Uncomplete Format"}, 500

    parsedData = csv.parseToObjects(splitData, headerLocations)
    parsedDataNoExtraCourses = upload.removeExtraCourses(
        parsedData, leagueOfEvent["courses"]
    )
    parsedDataSorted = sorted(
        parsedDataNoExtraCourses, key=lambda x: x["time"], reverse=True
    )
    dataWithPoints = assignPoints.assignPoints(
        parsedDataSorted, leagueOfEvent["scoringMethod"]
    )

    try:
        return saveUpload(data, eventData, dataWithPoints)
    except:
        return returnError("Problem Saving Results to Database")


def saveUpload(data, eventData, dataWithPoints):
    # Get all competitors and match the competitor to assign the result to competitor by saving competitor id in the result
    dataWithCompetitors = upload.getCompetitorData(eventData, dataWithPoints)
    # Write all results to the database
    for result in dataWithCompetitors:
        results.createResult(
            {
                "time": result["time"],
                "position": result["position"],
                "points": result["points"],
                "incomplete": result["incomplete"],
                "event": eventData["id"],
                "competitor": result["competitor"],
            }
        )

    events.setResultsUploadedAndURLs(
        True,
        eventData["id"],
        data["results"],
        data["winsplits"],
        data["routegadget"],
    )

    dynamicPoints.calculate(eventData["league"])

    return returnMessage(str(len(dataWithCompetitors)) + " Results Saved")

