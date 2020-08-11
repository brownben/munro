from flask_restful import Resource

from database import results


class ResultsForCompetitor(Resource):
    def get(self, competitorId):
        return results.getResultsByCompetitor(competitorId)
