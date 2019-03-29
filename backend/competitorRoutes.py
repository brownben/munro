from flask import Flask, session
from flask_restful import Resource, reqparse

from database import competitors
from requireAuthentication import requireAuthentication


class Competitors(Resource):
    def get(self):
        return competitors.getAllCompetitors()

    @requireAuthentication
    def delete(self):
        competitors.deleteAllCompetitors()
        return {'message': 'All Competitors were Deleted'}
