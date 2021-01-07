from flask_restx import Namespace, Resource

from ..database import Event
from .requireAuthentication import requireAuthentication
from ..models.event import eventModel, eventModelWithUploadKey
from ..models.messages import createMessage, messageModel


api = Namespace("Events", description="View and Manage Events")
api.models[eventModel.name] = eventModel
api.models[eventModelWithUploadKey.name] = eventModelWithUploadKey
api.models[messageModel.name] = messageModel


@api.route("/")
class EventsRoute(Resource):
    @api.marshal_with(eventModel, as_list=True)
    @api.response(200, "Success - List of all Events")
    @api.response(500, "Problem Connecting to the Database")
    def get(self):
        try:
            return [event.toDictionary() for event in Event.getAll()]
        except:
            return [], 500

    @api.expect(eventModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(403, "An Event with that ID Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def post(self):
        try:
            event = Event(api.payload)

            if Event.exists(event.name):
                return createMessage(
                    f"Event - '{event.name}' already Exists in League '{event.league}'",
                    403,
                )

            event.create()
            return createMessage(f"Event - '{event.name}' was Created", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)


@api.route("/<eventId>")
@api.param("eventId", "Event ID")
class EventRoute(Resource):
    @api.marshal_with(eventModel)
    @api.response(200, "Success - Details of the Event")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, eventId):
        try:
            return Event.getById(eventId).toDictionary()
        except:
            return None, 500

    @api.expect(eventModel, validate=True)
    @api.marshal_with(messageModel)
    @api.response(201, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(403, "An Event with that ID Already Exists")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def put(self, oldEventId):
        try:
            event = Event(api.payload)

            if event.getEventId() != oldEventId and Event.exists(event.getEventId()):
                return createMessage(
                    f"Event - '{event.name}' already Exists in League '{event.leagueName}'",
                    403,
                )

            event.update()
            return createMessage(f"Event - '{event.name}' was Updated", 201)

        except:
            return createMessage(f"Problem Connecting to Database", 500)

    @api.marshal_with(messageModel)
    @api.response(200, "Success")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def delete(self, eventId):
        try:
            Event.deleteById(eventId)
            return createMessage(f"Event was Deleted")
        except:
            return createMessage("Problem Connecting to the Database", 500)


@api.route("/uploadKey")
class EventsRouteWithUploadKey(Resource):
    @api.marshal_with(eventModelWithUploadKey, as_list=True)
    @api.response(200, "Success - List of all Events (with Upload Key)")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def get(self):
        try:
            return [event.toDictionaryWithUploadKey() for event in Event.getAll()]
        except:
            return [], 500


@api.route("/<eventId>/uploadKey")
@api.param("eventId", "Event ID")
class EventRouteWithUploadKey(Resource):
    @api.marshal_with(eventModelWithUploadKey)
    @api.response(200, "Success - Details of the Event (with Upload Key)")
    @api.response(401, "Permission Denied - You are not Logged In")
    @api.response(500, "Problem Connecting to the Database")
    @requireAuthentication
    def get(self, eventId):
        try:
            return Event.getById(eventId).toDictionaryWithUploadKey()
        except:
            return None, 500
