from flask_restful import Resource, reqparse

from database import events
from requireAuthentication import requireAuthentication

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
        eventId = (data['league']+data['name']+data['date']).replace(' ', '')

        if events.findEvent(eventId):
            return {'message': 'Event - {} already Exists in this League'.format(data['name'])}, 500

        try:
            events.createEvent(data['name'], data['date'], data['resultUploaded'], data['organiser'], data['moreInformation'],
                               data['website'], data['results'], data['winsplits'], data['routegadget'], data['league'])
            return {'message': 'Event - {} was Created'.format(data['name'])}
        except:
            return {'message': 'Error: Problem Creating Event - Please Try Again'}, 500

    @requireAuthentication
    def delete(self):
        events.deleteAllEvents()
        return {'message': 'All Events were Deleted'}


class EventsWithUploadKey(Resource):
    @requireAuthentication
    def get(self):
        return events.getAllEventsWithUploadKey()


class Event(Resource):
    def get(self, eventId):
        return events.findEvent(eventId)

    @requireAuthentication
    def put(self, eventId):
        data = eventParser.parse_args()
        name = data['name']
        newId = (data['league']+data['name']+data['date']).replace(' ', '')

        if newId != eventId and events.findEvent(newId):
            return {'message': 'Event with Name {} already Exists in this League'.format(name)}, 500

        try:
            events.updateEvent(eventId, data['name'], data['date'], data['resultUploaded'], data['organiser'], data['moreInformation'],
                               data['website'], data['results'], data['winsplits'], data['routegadget'], data['league'])
            return {'message': 'Event - {} was Updated'.format(name)}
        except:
            return {'message': 'Error: Problem Updating Event - Please Try Again'}, 500

    @requireAuthentication
    def delete(self, eventId):
        event = events.findEvent(eventId)
        events.deleteEvent(eventId)
        return {'message': 'Event - {} was Deleted'.format(event['name'])}


class EventWithUploadKey(Resource):
    @requireAuthentication
    def get(self, eventId):
        return events.getEventWithUploadKey(eventId)


class EventsLatestWithResults(Resource):
    def get(self):
        return events.getLatestEventsWithResults()
