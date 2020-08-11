from flask_restful import Resource, reqparse

from database import competitors
from requireAuthentication import requireAuthentication

from .returnMessages import returnMessage, returnError


competitorMergeParser = reqparse.RequestParser()
competitorMergeParser.add_argument(
    "competitorKeep", help="This field cannot be blank", required=True
)
competitorMergeParser.add_argument(
    "competitorMerge", help="This field cannot be blank", required=True
)


class CompetitorMerge(Resource):
    @requireAuthentication
    def post(self):
        data = competitorMergeParser.parse_args()

        try:
            competitors.mergeCompetitors(
                data["competitorKeep"], data["competitorMerge"]
            )
            return returnMessage("Competitors Merged Successfully")
        except:
            return returnError("Error: Merging Competitors - Please Try Again")
