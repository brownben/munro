from flask_restful import Resource, reqparse

import csvFunctions as csv
import pointsFunctions as points
import uploadFunctions as upload
from database import competitors, leagues, events, results
from routeFunctions import returnMessage, returnError

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


def checkUpload(data):
    # get all relevent data from other parts of the database
    try:
        eventData = events.getEventWithUploadKey(data["eventId"])
        leagueOfEvent = leagues.findLeague(eventData["league"])
    except:
        return returnError(
            "Problem Getting Information from the Database"
        )

    # Check upload credentials are correct
    if eventData["uploadKey"] != data["uploadKey"]:
        return returnError()"Upload Key is Incorrect")

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
    dataWithPoints = points.assignPoints(
        parsedDataSorted, leagueOfEvent["scoringMethod"]
    )

    try:
        return saveUplaod(eventData, dataWithPoints)
    except:
        return returnError("Problem Saving Results to Database")


def saveUplaod(eventData, dataWithPoints):
    # Get all competitors and match the competitor to assign the result to competitor by saving competitor id in the result
    dataWithCompetitors = getCompetitorData(eventData, dataWithPoints)
    # Write all results to the database
    for result in dataWithCompetitors:
        results.createResult(
            result["time"],
            result["position"],
            result["points"],
            result["incomplete"],
            eventData["id"],
            result["competitor"],
        )

    events.setResultsUploadedAndURLs(
        True,
        eventData["id"],
        data["results"],
        data["winsplits"],
        data["routegadget"],
    )

    return returnMessage(str(len(dataWithCompetitors)) + " Results Saved")


def getCompetitorData(eventData, dataWithPoints):
    allCompetitors = competitors.getCompetitorsByLeague(eventData["league"])

    dataWithCompetitors = []

    for result in dataWithPoints:
        competitor = upload.matchCompetitor(allCompetitors, result)
        if competitor:
            result["competitor"] = competitor["id"]
        else:
            # If no match create competitor and save id as that in the result
            result["competitor"] = competitors.createCompetitor(
                result["name"],
                result["ageClass"],
                result["club"],
                result["course"],
                eventData["league"],
            )
        dataWithCompetitors.append(result)

    return dataWithCompetitors
