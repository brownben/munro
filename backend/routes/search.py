from flask_restx import Namespace, Resource

from ..database.search import Search
from ..models.search import searchModel


api = Namespace("Search", description="Search for Leagues, Events and Competitors")
api.models[searchModel.name] = searchModel


@api.route("/<query>")
@api.param("query", "Search Term")
class SearchRoute(Resource):
    @api.marshal_with(searchModel)
    @api.response(200, "Success - Results of Search")
    @api.response(500, "Problem Connecting to the Database")
    def get(self, query):
        try:
            return Search(query).toDictionary()
        except:
            return None, 500
