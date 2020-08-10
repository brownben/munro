from flask_restful import Resource, reqparse

import csvFunctions as csv
from points import assignPoints
import uploadFunctions as upload
import dynamicPointsFunctions as dynamicResults
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

streamParser = reqparse.RequestParser()
streamParser.add_argument(
    "eventId", help="This field cannot be blank", required=True
)
streamParser.add_argument(
    "uploadKey", help="This field cannot be blank", required=True
)
streamParser.add_argument(
    "file", help="This field cannot be blank", required=True
)
streamParser.add_argument(
    "course", help="This field cannot be blank", required=True
)

resultParser = reqparse.RequestParser()
resultParser.add_argument(
    "eventId", help="This field cannot be blank", required=True
)
resultParser.add_argument(
    "time", help="This field cannot be blank", required=True
)
resultParser.add_argument(
    "name", help="This field cannot be blank", required=True
)
resultParser.add_argument(
    "course", help="This field cannot be blank", required=True
)


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
    dataWithPoints = assignPoints(
        parsedDataSorted, leagueOfEvent["scoringMethod"]
    )

    try:
        return saveUpload(data, eventData, dataWithPoints)
    except:
        return returnError("Problem Saving Results to Database")


def saveUpload(data, eventData, dataWithPoints):
    # Get all competitors and match the competitor to assign the result to competitor by saving competitor id in the result
    dataWithCompetitors = getCompetitorData(eventData, dataWithPoints)
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

    dynamicResults.calculate(eventData["league"])

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
                {
                    "name": result["name"],
                    "ageClass": result["ageClass"],
                    "club": result["club"],
                    "course": result["course"],
                    "league": eventData["league"],
                }
            )
        dataWithCompetitors.append(result)

    return dataWithCompetitors


class UploadStream(Resource):
    def post(self):
        data = streamParser.parse_args()
        eventData, leagueOfEvent = getEventLeagueData(data["eventId"])
        existingResults = results.getResultsByEventForRecalc(data["eventId"])

        if eventData["uploadKey"] != data["uploadKey"]:
            return returnError("Upload Key is Incorrect")

        try:
            streamData = data["file"].split("\n")
            resultsList = [
                streamResultToDict(result, data["eventId"], data["course"])
                for result in streamData
            ]
            resultsToAdd = newResults(existingResults, resultsList)
            resultsWithCompetitors = getCompetitorData(eventData, resultsToAdd)

            for result in resultsWithCompetitors:
                results.createResult(result)

            upload.recalculateResults(
                data["eventId"], leagueOfEvent["scoringMethod"]
            )
            dynamicResults.calculate(eventData["league"])

            events.setResultsUploaded(True, data["eventId"])

            return returnMessage(
                str(len(resultsWithCompetitors)) + " Results Imported"
            )

        except:
            return returnError("Problem Processing Uploaded Data")


def streamResultToDict(result, event, course):
    splitResult = result.split(",")

    return {
        "type": course + splitResult[1],
        "name": splitResult[0],
        "time": csv.timeToSeconds(splitResult[2]),
        "incomplete": splitResult[3] != "OK",
        "ageClass": splitResult[4:5] or "",
        "club": splitResult[5:6] or "",
        "position": "",
        "points": 0,
        "event": event,
        "course": course,
    }


def newResults(exisitingResults, latestResults):
    existingResultIds = [result["type"] for result in exisitingResults]
    return [
        result
        for result in latestResults
        if result["type"] not in existingResultIds
    ]


class UploadResult(Resource):
    def post(self):
        data = resultParser.parse_args()
        eventData, leagueOfEvent = getEventLeagueData(data["eventId"])

        if not eventData["userSubmittedResults"]:
            return returnError(
                "Error: That Event Doesn't Accept User Submitted Results"
            )

        try:
            competitor = competitors.getCompetitorByNameCourseAndLeague(
                data["name"], data["course"], leagueOfEvent["name"]
            )
            if not competitor:
                competitor = competitors.createCompetitor(
                    {
                        "name": data["name"],
                        "ageClass": "",
                        "club": "",
                        "course": data["course"],
                        "league": leagueOfEvent["name"],
                    }
                )
            else:
                competitor = competitor["id"]

            results.createResult(
                {
                    "time": csv.timeToSeconds(data["time"]),
                    "position": "",
                    "points": 0,
                    "incomplete": False,
                    "event": data["eventId"],
                    "competitor": competitor,
                    "type": "userUpload",
                }
            )

            upload.recalculateResults(
                data["eventId"], leagueOfEvent["scoringMethod"]
            )
            dynamicResults.calculate(eventData["league"])

            return returnMessage("Points Assigned")
        except:
            return returnError(
                "Error: Problem Uploading Result - Please Try Again"
            )
