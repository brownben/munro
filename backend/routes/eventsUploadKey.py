from flask_restful import Resource

from database import events
from requireAuthentication import requireAuthentication


class EventWithUploadKey(Resource):
    @requireAuthentication
    def get(self, eventId):
        return events.getEventWithUploadKey(eventId)


class EventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self):
        return events.getAllEventsWithUploadKey()
