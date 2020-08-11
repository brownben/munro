from flask_restful import Resource, reqparse

from database import results


class ResultsForEvent(Resource):
    def get(self, eventId):
        return results.getResultsByEvent(eventId)
