from flask import Flask, session
from flask_restful import Resource, reqparse
from functools import wraps

from database import events, competitors, results
from eventRoutes import *
from leagueRoutes import *
from userRoutes import *
from resultRoutes import *
import upload


def requireAuthentication(func):
    @wraps(func)
    def decorator(*args, **kwargs):
        if not session.get('username') or not session['username'] or not sessionStore.checkLogin(session['username']):
            return {'message': 'Permission Denied - You are not Logged In'}, 401
        return func(*args, **kwargs)
    return decorator


uploadParser = reqparse.RequestParser()
uploadParser.add_argument(
    'eventId', help='This field cannot be blank', required=True)
uploadParser.add_argument(
    'uploadKey', help='This field cannot be blank', required=True)
uploadParser.add_argument(
    'file', help='This field cannot be blank', required=True)
uploadParser.add_argument(
    'overwrite')


class Upload(Resource):
    def post(self):
        data = uploadParser.parse_args()
        try:
            try:
                eventData = events.getEventWithUploadKey(data['eventId'])
                leagueOfEvent = leagues.findLeague(eventData['league'])
            except:
                return {'message': 'Problem Getting Information from the Database'}, 500

            if eventData['uploadKey'] != data['uploadKey']:
                return {'message': 'Upload Key is Incorrect'}, 500

            if data['overwrite'] != 'True' and eventData['resultUploaded'] == True:
                return {'message': 'Results Already Exist for this Event and Overwrite was not Enabled'}, 500
            elif data['overwrite'] == 'True':
                results.deleteResultsByEvent(eventData['id'])

            splitData = upload.splitData(data['file'].strip())
            headerLocations = upload.findHeaders(splitData)
            if(not headerLocations):
                return {'message': 'Data is in an Uncomplete Format'}, 500

            parsedData = upload.parseToObjects(splitData, headerLocations)
            parsedDataNoExtraCourses = upload.removeExtraCourses(
                parsedData, leagueOfEvent['courses'])
            dataWithPoints = upload.assignPoints(
                parsedDataNoExtraCourses, leagueOfEvent['scoringMethod'])

            try:
                allCompetitors = competitors.getCompetitorsByLeague(
                    eventData['league'])

                dataWithCompetitors = []
                for result in dataWithPoints:
                    competitor = upload.matchCompetitor(allCompetitors, result)
                    if competitor:
                        result['competitor'] = competitor['rowId']
                    else:
                        result['competitor'] = competitors.createCompetitor(
                            result['name'], result['ageClass'], result['club'], result['course'], eventData['league'])
                    dataWithCompetitors.append(result)

                for result in dataWithCompetitors:
                    results.createResult(result['time'], result['position'], result['points'],
                                         result['incomplete'], eventData['id'], result['competitor'])

                eventData['resultUploaded'] = 'True'
                del eventData['uploadKey']
                events.updateEvent(**eventData)
                return {'message': str(len(dataWithCompetitors)) + ' Results Saved'}

            except:
                return {'message': 'Problem Saving Results to Database'}, 500

        except:
            return {'message': 'Problem Processing Uploaded Data'}, 500


class Competitors(Resource):
    def get(self):
        return competitors.getAllCompetitors()

    @requireAuthentication
    def delete(self):
        competitors.deleteAllCompetitors()
        return {'message': 'All Competitors were Deleted'}


class TestLegaueResults(Resource):
    def get(self):
        return [{
            'name': 'Bob',
            'position': 1,
            'points': 100,
            'club': 'HAT',
            'age': 50,
            'gender': 'M',
        },
            {
            'name': 'Jane',
            'position': 2,
            'points': 99,
            'club': 'HAT',
            'age': 45,
            'gender': 'W',
        },
            {
            'name': 'Alfie',
            'position': 3,
            'points': 95,
            'club': 'HAT',
            'age': 15,
            'gender': 'M',
        },
            {
            'name': 'George',
            'position': 4,
            'points': 95,
            'club': 'CAP',
            'age': 55,
            'gender': 'M',
        },
            {
            'name': 'Kirsty',
            'position': 5,
            'points': 1,
            'club': 'MAT',
            'age': 65,
            'gender': 'W',
        }]
