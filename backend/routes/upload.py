from flask_restx import Namespace, Resource

from ..database.league import League
from ..database.competitor import Competitor
from ..database.event import Event
from ..database.result import Result
from ..models.upload import uploadFileModel, uploadResultModel
from ..models.messages import createMessage, messageModel
from ..utils.csv import (
    splitFile,
    getHeaderLocations,
    allHeadersArePresent,
    parseFileToDictionaries,
)
from ..utils.processResults import getMatchingResults, normaliseCourses
from ..utils.matchCompetitor import matchResultsToCompetitors
from ..utils.calculateResults import calculateDynamicPoints, recalculateResults
from ..utils.points import assignPoints
from ..utils.helpers import sortByTime, toSeconds

api = Namespace("Upload", description="Upload Results into the System")
api.models[uploadFileModel.name] = uploadFileModel
api.models[uploadResultModel.name] = uploadResultModel
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
        event = Event.getById(requestData["event"])

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
        headerLocations = getHeaderLocations(splitData)
        league = event.getLeague()

        if not allHeadersArePresent(headerLocations):
            return createMessage("Data is in Missing Headers", 500)

        parsedData = parseFileToDictionaries(splitData, headerLocations, league)
        matchingResults = getMatchingResults(parsedData, league)
        normalisedResults = normaliseCourses(matchingResults, league.courses)
        sortedResults = sortByTime(normalisedResults)
        resultsWithCompetitors = matchResultsToCompetitors(sortedResults, league)
        resultsWithPoints = assignPoints(resultsWithCompetitors, league.scoringMethod)

        for result in resultsWithPoints:
            Result(result).create()

        calculateDynamicPoints(league)
        event.setResultUploaded(
            requestData["results"], requestData["winsplits"], requestData["routegadget"]
        )

        return createMessage(f"{len(resultsWithPoints)} Results Saved")


@api.route("/")
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
        event = Event.getById(data["event"])

        if not event:
            return createMessage("Problem Uploading Results - Event Doesn't Exist", 404)
        elif not event.userSubmittedResults:
            return createMessage(
                "Error: Event Doesn't Accept User Submitted Results", 401
            )

        league = event.getLeague()

        try:
            competitor = Competitor.getByNameCourseAndLeague(
                data["name"], data["course"], league.name
            )
            if not competitor:
                competitor = Competitor(
                    {
                        "name": data["name"],
                        "ageClass": "",
                        "club": "",
                        "course": data["course"],
                        "league": league.name,
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
