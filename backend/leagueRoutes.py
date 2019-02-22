from flask import Flask, session
from flask_restful import Resource, reqparse
from requireAuthentication import requireAuthentication
from database import leagues, events, sessionStore

# Check POST request has all the relevent fields
# Create request
leagueParser = reqparse.RequestParser()
leagueParser.add_argument(
    'name', help='This field cannot be blank', required=True)
leagueParser.add_argument('website')
leagueParser.add_argument('logo')
leagueParser.add_argument('coordinator')
leagueParser.add_argument('numberOfCountingEvents')
leagueParser.add_argument(
    'scoringMethod', help='This field cannot be blank', required=True)
leagueParser.add_argument('courses')
leagueParser.add_argument('moreInformation')

# Update request
leagueUpdateParser = leagueParser
leagueUpdateParser.add_argument('oldName')


class Leagues(Resource):
    def get(self):
        return leagues.getAllLeagues()

    @requireAuthentication
    def post(self):
        data = leagueParser.parse_args()
        name = data['name']

        if leagues.findLeague(name):
            return {'message': 'League - {} already Exists'.format(name)}, 500

        try:
            leagues.createLeague(data['name'], data['website'], data['logo'], data['coordinator'],
                                 data['scoringMethod'], data['numberOfCountingEvents'], data['courses'], data['moreInformation'])
            return {'message': 'League - {} was Created'.format(name)}
        except:
            return {'message': 'Something went Wrong'}, 500


class League(Resource):
    def get(self, name):
        return leagues.findLeague(name)

    @requireAuthentication
    def put(self, name):
        data = leagueUpdateParser.parse_args()
        name = data['name']

        if data['name'] != data['oldName'] and leagues.findLeague(name):
            return {'message': 'League with Name - {} already Exists'.format(name)}, 500

        try:
            leagues.updateLeague(data['oldName'], data['name'], data['website'], data['logo'], data['coordinator'],
                                 data['scoringMethod'], data['numberOfCountingEvents'], data['courses'], data['moreInformation'])
            return {'message': 'League - {} was Updated'.format(name)}
        except:
            return {'message': 'Something went Wrong'}, 500

    @requireAuthentication
    def delete(self, name):
        try:
            leagues.deleteLeague(name)
            return {'message': 'League - {} was Deleted'.format(name)}
        except:
            return {'message': 'Problem Deleting League'}, 500


class LeagueEvents(Resource):
    def get(self, name):
        return events.getEventsOfLeague(name)


class LeagueEventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self, name):
        return events.getEventsOfLeagueWithUploadKey(name)
