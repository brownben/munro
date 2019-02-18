from flask import Flask, session
from flask_restful import Resource, reqparse
from functools import wraps

from database import leagues, events, sessionStore


def requireAuthentication(func):
    # Check login before allowing user to access API
    @wraps(func)
    def decorator(*args, **kwargs):
        if not session.get('username') or not session['username'] or not sessionStore.checkLogin(session['username']):
            return {'message': 'Permission Denied - You are not Logged In'}, 401
        return func(*args, **kwargs)
    return decorator

# Check POST request has all the relevent fields
eventParser = reqparse.RequestParser()
eventParser.add_argument(
    'name', help='This field cannot be blank', required=True)
eventParser.add_argument('date')
eventParser.add_argument('resultUploaded')
eventParser.add_argument('organiser')
eventParser.add_argument('moreInformation')
eventParser.add_argument('website')
eventParser.add_argument('results')
eventParser.add_argument('winsplits')
eventParser.add_argument('routegadget')
eventParser.add_argument(
    'league', help='This field cannot be blank', required=True)


class Events(Resource):
    def get(self):
        return events.getAllEvents()

    @requireAuthentication
    def post(self):
        data = eventParser.parse_args()
        id = (data['league']+data['name']+data['date']).replace(' ', '')

        if events.findEvent(id):
            return {'message': 'Event - {} already Exists in this League'.format(data['name'])}, 500

        try:
            events.createEvent(data['name'], data['date'], data['resultUploaded'], data['organiser'], data['moreInformation'],
                               data['website'], data['results'], data['winsplits'], data['routegadget'], data['league'])
            return {'message': 'Event - {} was Created'.format(data['name'])}
        except:
            return {'message': 'Something went Wrong'}, 500

    @requireAuthentication
    def delete(self):
        events.deleteAllEvents()
        return {'message': 'All Events were Deleted'}


class EventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self):
        return events.getAllEventsWithUploadKey()


class Event(Resource):
    def get(self, id):
        return events.findEvent(id)

    @requireAuthentication
    def put(self, id):
        data = eventParser.parse_args()
        name = data['name']
        newId = (data['league']+data['name']+data['date']).replace(' ', '')

        if newId != id and events.findEvent(id):
            return {'message': 'Event with Name {} already Exists in this League'.format(name)}, 500

        try:
            events.updateEvent(id, data['name'], data['date'], data['resultUploaded'], data['organiser'], data['moreInformation'],
                               data['website'], data['results'], data['winsplits'], data['routegadget'], data['league'])
            return {'message': 'Event - {} was Updated'.format(name)}
        except:
            return {'message': 'Something went Wrong'}, 500

    @requireAuthentication
    def delete(self, id):
        event = events.findEvent(id)
        events.deleteEvent(id)
        return {'message': 'Event - {} was Deleted'.format(event['name'])}


class EventWithUploadKey(Resource):
    @requireAuthentication
    def get(self, id):
        return events.getEventWithUploadKey(id)
