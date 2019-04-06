from flask import Flask, session
from flask_restful import Resource, reqparse

from database import results
from requireAuthentication import requireAuthentication

transferResultParser = reqparse.RequestParser()
transferResultParser.add_argument(
    'competitor', help='This field cannot be blank', required=True)
transferResultParser.add_argument(
    'result', help='This field cannot be blank', required=True)


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


class ResultsForEvent(Resource):
    def get(self, id):
        return results.getResultsByEvent(id)


class ResultsForCompetitor(Resource):
    def get(self, id):
        return results.getResultsByCompetitor(id)


class TransferResult(Resource):
    @requireAuthentication
    def post(self):
        data = transferResultParser.parse_args()

        try:
            results.transferResult(data['result'], data['competitor'])
            return {'message': 'Result Transfered'}
        except:
            return {'message': 'Error: Problem Transferring Result - Please Try Again'}, 500
