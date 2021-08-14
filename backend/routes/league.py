from flask_restx import Namespace, Resource

from .requireAuthentication import isAuthenticated, requireAuthentication
from ..database.league import League
from ..database.event import Event
from ..database.competitor import Competitor
from ..database.leagueResult import LeagueResult
from ..models.league import leagueModel, leagueOverviewModel
from ..models.event import eventModel, eventModelWithUploadKey
from ..models.competitor import competitorModel
from ..models.leagueResult import (
    leagueResultsOverviewModel,
    leagueResultModelWithCourse,
    pointsModel,
)
from ..models.messages import createMessage, messageModel
from ..utils.helpers import sortByTotalPoints
from ..utils.processResults import assignPosition


api = Namespace("Leagues", description="View and Manage Leagues")
api.models[leagueModel.name] = leagueModel
api.models[eventModel.name] = eventModel
api.models[eventModelWithUploadKey.name] = eventModelWithUploadKey
api.models[competitorModel.name] = competitorModel
api.models[pointsModel.name] = pointsModel
api.models[leagueResultsOverviewModel.name] = leagueResultsOverviewModel
api.models[leagueResultModelWithCourse.name] = leagueResultModelWithCourse
api.models[messageModel.name] = messageModel
api.models[leagueOverviewModel.name] = leagueOverviewModel


@api.route("")
@api.route("/")
class LeaguesRoute(Resource):
    @api.marshal_with(leagueModel, as_list=True)
    @api.response(200, "Success - List of all the Leagues")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return [league.toDictionary() for league in League.getAll()]
        except:
            return [], 500

    @api.expect(leagueModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(403, "A League with that Name Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            league = League(api.payload)

            if League.exists(league.name):
                return createMessage(f"League - {league.name} already Exists", 403)

            league.create()
            return createMessage(f"League - {league.name} was Created", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)


@api.route("/<name>")
@api.param("name", "League Name")
class LeagueRoute(Resource):
    @api.marshal_with(leagueModel)
    @api.response(200, "Success - Details of the League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            return League.getByName(name).toDictionary()
        except:
            return None, 500

    @api.expect(leagueModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(403, "A League with that Name Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def put(self, name):
        try:
            league = League(api.payload)

            if league.name != name and League.exists(league.name):
                return createMessage(f"League - {league.name} already Exists", 403)

            league.update(name)
            return createMessage(f"League - {league.name} was Updated", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)

    @api.marshal_with(messageModel)
    @api.response(200, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def delete(self, name):
        try:
            League.deleteByName(name)
            return createMessage(f"League - {name} was Deleted")
        except:
            return createMessage("Problem Connecting to the Database", 500)


@api.route("/<name>/events")
@api.param("name", "League Name")
class LeagueEventsRoute(Resource):
    @api.marshal_with(eventModel, as_list=True)
    @api.response(200, "Success - List of all Events in a League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            return [event.toDictionary() for event in Event.getByLeague(name)]
        except:
            return [], 500


@api.route("/<name>/overview")
@api.param("name", "League Name")
class LeagueOverviewRoute(Resource):
    @api.marshal_with(leagueOverviewModel)
    @api.response(200, "Success - Details of the League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            eventsFromDatabase = Event.getByLeague(name)
            if isAuthenticated():
                events = [
                    event.toDictionaryWithUploadKey() for event in eventsFromDatabase
                ]
            else:
                events = [event.toDictionary() for event in eventsFromDatabase]

            return {
                **League.getByName(name).toDictionary(),
                "events": events,
            }
        except:
            return None, 500


@api.route("/<name>/results/Overall")
@api.param("name", "League Name")
class LeagueOverallResultsRoute(Resource):
    @api.marshal_with(leagueResultModelWithCourse, as_list=True)
    @api.response(200, "Success - List of Overall Results for the League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            league = League.getByName(name)
            events = Event.getByLeagueWithResults(name)
            results = [
                result.toDictionary(league, events)
                for result in LeagueResult.getByLeague(name, league.subLeagueOf)
            ]
            sortedResults = sortByTotalPoints(results)
            return assignPosition(sortedResults)
        except:
            return [], 500


@api.route("/<name>/results/<course>")
@api.param("name", "League Name")
@api.param("course", "Course Name")
class LeagueCourseResultsRoute(Resource):
    @api.marshal_with(leagueResultsOverviewModel)
    @api.response(200, "Success - List of all Results for the Course")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name, course):
        try:
            league = League.getByName(name)
            events = Event.getByLeagueWithResults(name)

            if league.leagueScoring == "ageClass":
                results, events = LeagueResult.getWithFilter(league, events, course)
            elif league.leagueScoring == "filteredCourse":
                ageClass, expectedCourse = (
                    league.getAdditionalSettingsAsJSON()
                    .get("courseMappings", {})
                    .get(course)
                )
                results, events = LeagueResult.getWithFilter(
                    league, events, ageClass, expectedCourse
                )
            else:
                results = [
                    result.toDictionary(league, events)
                    for result in LeagueResult.getByCourse(
                        name, league.subLeagueOf, course
                    )
                ]
            sortedResults = sortByTotalPoints(results)
            return {
                "league": league.name,
                "courses": league.courses,
                "leagueScoring": league.leagueScoring,
                "results": assignPosition(sortedResults),
                "events": events,
            }
        except:
            return {}, 500


@api.route("/<name>/events/uploadKey")
@api.param("name", "League Name")
class LeagueEventsRouteWithUploadKey(Resource):
    @api.marshal_with(eventModelWithUploadKey, as_list=True)
    @api.response(200, "Success - List of all Events in a League (with Upload Key)")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def get(self, name):
        try:
            return [
                event.toDictionaryWithUploadKey() for event in Event.getByLeague(name)
            ]
        except:
            return [], 500


@api.route("/<name>/competitors")
@api.param("name", "League Name")
class LeagueCompetitorsRoute(Resource):
    @api.marshal_with(competitorModel, as_list=True)
    @api.response(200, "Success - List of all Competitors in a League")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, name):
        try:
            league = League.getByName(name)
            leagueOfCompetitors = league.getLeagueOfCompetitors()
            competitors = Competitor.getByLeague(leagueOfCompetitors)

            return [event.toDictionary() for event in competitors]
        except:
            return [], 500
