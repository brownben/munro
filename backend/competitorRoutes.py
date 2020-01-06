from flask_restful import Resource, reqparse

from database import competitors
from requireAuthentication import requireAuthentication

from routeFunctions import returnMessage, returnError

competitorParser = reqparse.RequestParser()
competitorParser.add_argument(
    "name", help="This field cannot be blank", required=True
)
competitorParser.add_argument("id")
competitorParser.add_argument("club")
competitorParser.add_argument("ageClass")
competitorParser.add_argument("course")
competitorParser.add_argument(
    "league", help="This field cannot be blank", required=True
)

competitorMergeParser = reqparse.RequestParser()
competitorMergeParser.add_argument(
    "competitorKeep", help="This field cannot be blank", required=True
)
competitorMergeParser.add_argument(
    "competitorMerge", help="This field cannot be blank", required=True
)


class Competitors(Resource):
    def get(self):
        return competitors.getAllCompetitors()

    @requireAuthentication
    def post(self):
        data = competitorParser.parse_args()

        try:
            competitors.createCompetitor(data)
            return returnMessage(
                "Competitor - {} was Created".format(data["name"])
            )

        except:
            return returnError(
                "Error: Problem Creating Competitor - Please Try Again"
            )

    @requireAuthentication
    def delete(self):
        competitors.deleteAllCompetitors()
        return returnMessage("All Competitors were Deleted")


class Competitor(Resource):
    def get(self, competitorId):
        return competitors.findCompetitor(competitorId)

    @requireAuthentication
    def put(self, competitorId):
        data = competitorParser.parse_args()

        try:
            competitors.updateCompetitor(data)
            return returnMessage(
                "Competitor - {} was Updated".format(data["name"])
            )
        except:
            return returnError(
                "Error: Problem Updating Competitor - Please Try Again"
            )

    @requireAuthentication
    def delete(self, competitorId):
        competitor = competitors.findCompetitor(competitorId)
        competitors.deleteCompetitor(competitorId)
        return returnMessage(
            "Competitor - {} was Deleted".format(competitor["name"])
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
