from flask_restful import Resource, reqparse

from database import events
from requireAuthentication import requireAuthentication
from .returnMessages import returnMessage, returnError


class LeagueEvents(Resource):
    def get(self, name):
        return events.getEventsOfLeague(name)


class LeagueEventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self, name):
        return events.getEventsOfLeagueWithUploadKey(name)
