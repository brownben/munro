from flask_restful import Resource, reqparse

from database.search import leaguesSearch, eventsSearch, competitorSearch
from .returnMessages import returnMessage, returnError


parser = reqparse.RequestParser()
parser.add_argument("query", help="Please Enter a Search Query", required=True)


class Search(Resource):
    def get(self):
        data = parser.parse_args()
        term = data["query"]

        try:
            return {
                "leagues": leaguesSearch(term),
                "events": eventsSearch(term),
                "competitors": competitorSearch(term),
            }

        except:
            return returnError("Problem Searching Database")
