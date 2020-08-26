from flask_restful import Resource

from database import competitors


class LeagueCompetitors(Resource):
    def get(self, name):
        return competitors.getCompetitorsByLeague(name)
