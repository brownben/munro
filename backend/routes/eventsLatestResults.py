from flask_restful import Resource

from database import events
from requireAuthentication import requireAuthentication


class EventsLatestWithResults(Resource):
    def get(self):
        return events.getLatestEventsWithResults()
