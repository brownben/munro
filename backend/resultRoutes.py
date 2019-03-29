from flask import Flask, session
from flask_restful import Resource, reqparse

from database import results
from requireAuthentication import requireAuthentication


class Results(Resource):
    def get(self):
        return results.getAllResults()

    @requireAuthentication
    def delete(self):
        results.deleteAllResults()
        return {'message': 'All Results were Deleted'}


class ResultsForCourse(Resource):
    def get(self, name, course):
        return results.getResultsForCourse(name, course)
