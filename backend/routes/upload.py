from flask.globals import request
from flask_restx import Namespace, Resource

from ..database.league import League
from ..database.event import Event
from ..database.competitor import Competitor
from ..database.result import Result
from ..models.upload import uploadFileModel, uploadResultModel, uploadSimpleModel
from ..models.messages import createMessage, messageModel
from ..utils.csv import (
    splitFile,
    getHeaderLocations,
    allHeadersArePresent,
    parseFileToDictionaries,
)
from ..utils.processResults import (
    getMatchingResults,
    matchesClubRestriction,
    normaliseCourses,
)
from ..utils.matchCompetitor import matchResultsToCompetitors
from ..utils.calculateResults import calculateDynamicPoints, recalculateResults
from ..utils.points import assignPoints
from ..utils.helpers import sortByTime, toSeconds, processSimpleResult

api = Namespace("Upload", description="Upload Results into the System")
api.models[uploadFileModel.name] = uploadFileModel
api.models[uploadResultModel.name] = uploadResultModel
api.models[uploadSimpleModel.name] = uploadSimpleModel
api.models[messageModel.name] = messageModel


@api.route("/")
class UploadRoute(Resource):
    @api.expect(uploadFileModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - Upload Key Incorrect")
    @api.response(404, "Event Doesn't Exist")
    @api.response(403, "Results Already Exist and Overwrite is not Specified")
    @api.response(500, "Problem Processing the Uploaded Results")
    def post(self):
        requestData = api.payload
        event = Event.getById(requestData["eventId"])

        if not event:
            return createMessage("Problem Uploading Results - Event Doesn't Exist", 404)
        elif event.uploadKey != requestData["uploadKey"]:
            return createMessage("Permission Denied - Upload Key Incorrect", 401)
        elif event.resultUploaded and not requestData["overwrite"]:
            return createMessage(
                "Results Already Exist for this Event and Overwrite was not Enabled",
                403,
            )
        elif requestData["overwrite"]:
            Result.deleteByEvent(event.id)

        splitData = splitFile(requestData["file"])
        headerLocations = getHeaderLocations(splitData[0])
        league = event.getLeague()

        if not allHeadersArePresent(headerLocations):
            return createMessage("Data is in Missing Headers", 500)

        parsedData = parseFileToDictionaries(splitData, headerLocations, league, event)
        matchingResults = getMatchingResults(parsedData, league)
        normalisedResults = normaliseCourses(matchingResults, league.courses)
        sortedResults = sortByTime(normalisedResults)
        resultsWithCompetitors = matchResultsToCompetitors(sortedResults, league)
        resultsWithPoints = assignPoints(resultsWithCompetitors, league.scoringMethod)

        for result in resultsWithPoints:
            Result(result).create()

        calculateDynamicPoints(league)
        event.setResultUploadedWithURLs(
            requestData["results"], requestData["winsplits"], requestData["routegadget"]
        )

        return createMessage(f"{len(resultsWithPoints)} Results Saved")


@api.route("/result")
class UploadResultRoute(Resource):
    @api.expect(uploadResultModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(
        401, "Permission Denied - Event Doesn't Accept User Submitted Results"
    )
    @api.response(404, "Event Doesn't Exist")
    @api.response(500, "Problem Processing the Uploaded Results")
    def post(self):
        data = api.payload
        event = Event.getById(data["eventId"])

        if not event:
            return createMessage("Problem Uploading Results - Event Doesn't Exist", 404)
        elif not event.userSubmittedResults:
            return createMessage(
                "Error: Event Doesn't Accept User Submitted Results", 401
            )

        league = event.getLeague()
        leagueOfCompetitors = league.getLeagueOfCompetitors()

        try:
            competitor = Competitor.getByNameCourseAndLeague(
                data["name"], data["course"], leagueOfCompetitors
            )
            if not competitor:
                competitor = Competitor(
                    {
                        "name": data["name"],
                        "ageClass": "",
                        "club": "",
                        "course": data["course"],
                        "league": leagueOfCompetitors,
                    }
                )
                competitorID = competitor.create()
            else:
                competitorID = competitor.id

            result = Result(
                {
                    "time": toSeconds(data["time"]),
                    "position": "",
                    "points": 0,
                    "incomplete": False,
                    "event": data["eventId"],
                    "competitor": competitorID,
                    "type": "userUpload",
                    "course": data["course"],
                }
            )
            result.create()

            recalculateResults(event.getEventId(), league.scoringMethod)
            calculateDynamicPoints(league)

            return createMessage("Result Uploaded")

        except:
            return createMessage(
                "Error: Problem Uploading Result - Please Try Again", 500
            )


@api.route("/simple")
class UploadSimpleRoute(Resource):
    @api.expect(uploadSimpleModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - Upload Key Incorrect")
    @api.response(404, "Event Doesn't Exist")
    @api.response(403, "Results Already Exist and Overwrite is not Specified")
    @api.response(500, "Problem Processing the Uploaded Results")
    def post(self):
        requestData = api.payload
        event = Event.getById(requestData["eventId"])

        if not event:
            return createMessage("Problem Uploading Results - Event Doesn't Exist", 404)
        elif event.uploadKey != requestData["uploadKey"]:
            return createMessage("Permission Denied - Upload Key Incorrect", 401)

        try:
            league = event.getLeague()
            existingResultsIDs = [
                result["type"] for result in Result.getByEventForRecalc(event.id)
            ]
            streamData = requestData["file"].split("\n")
            results = [
                processSimpleResult(result, event, requestData["course"], league)
                for result in streamData
                if len(result.split(",")) > 3
            ]
            newResults = [
                result for result in results if result["type"] not in existingResultsIDs
            ]
            resultsWithCompetitors = matchResultsToCompetitors(newResults, league)
            createdResults = [
                Result(result).create() or 1
                for result in resultsWithCompetitors
                if matchesClubRestriction(result["club"], league.clubRestriction)
            ]

            recalculateResults(event.getEventId(), league.scoringMethod)
            calculateDynamicPoints(league)

            event.setResultUploaded()

            return createMessage(f"{len(createdResults)} Results Imported")
        except:
            return createMessage("Problem Processing Uploaded Data", 500)
