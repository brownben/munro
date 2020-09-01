from flask_restful import Resource

from database import results


class ResultsForCourse(Resource):
    def get(self, name, course):
        return results.getResultsForCourse(name, course)


class ResultsForLeague(Resource):
    def get(self, name):
        return results.getResultsForLeague(name)
