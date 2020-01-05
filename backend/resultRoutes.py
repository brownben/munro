from flask_restful import Resource, reqparse

from database import results
from requireAuthentication import requireAuthentication

transferResultParser = reqparse.RequestParser()
transferResultParser.add_argument(
    'competitor', help='This field cannot be blank', required=True)
transferResultParser.add_argument(
    'result', help='This field cannot be blank', required=True)

manualResultParser = reqparse.RequestParser()
manualResultParser.add_argument(
    'competitor', help='This field cannot be blank', required=True)
manualResultParser.add_argument(
    'event', help='This field cannot be blank', required=True)
manualResultParser.add_argument(
    'points', help='This field cannot be blank', required=True)


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
    def get(self, eventId):
        return results.getResultsByEvent(eventId)


class ResultsForCompetitor(Resource):
    def get(self, competitorId):
        return results.getResultsByCompetitor(competitorId)


class TransferResult(Resource):
    @requireAuthentication
    def post(self):
        data = transferResultParser.parse_args()

        try:
            results.transferResult(data['result'], data['competitor'])
            return {'message': 'Result Transfered'}
        except:
            return {'message': 'Error: Problem Transferring Result - Please Try Again'}, 500


class ManualResult(Resource):
    @requireAuthentication
    def post(self):
        try:
            data = manualResultParser.parse_args()
            results.createResult(
                0, '', data['points'], False, data['event'], data['competitor'])
            return {'message': 'Points Assigned'}
        except:
            return {'message': 'Error: Problem Assigning Points - Please Try Again'}
