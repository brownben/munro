from flask_restful import Resource, reqparse

from database import competitors
from requireAuthentication import requireAuthentication

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
            competitors.createCompetitor(
                data["name"],
                data["ageClass"],
                data["club"],
                data["course"],
                data["league"],
            )
            return {
                "message": "Competitor - {} was Created".format(data["name"])
            }
        except:
            return (
                {
                    "message": "Error: Problem Creating Competitor - Please Try Again"
                },
                500,
            )

    @requireAuthentication
    def delete(self):
        competitors.deleteAllCompetitors()
        return {"message": "All Competitors were Deleted"}


class Competitor(Resource):
    def get(self, competitorId):
        return competitors.findCompetitor(competitorId)

    @requireAuthentication
    def put(self, competitorId):
        data = competitorParser.parse_args()

        try:
            competitors.updateCompetitor(
                data["id"],
                data["name"],
                data["ageClass"],
                data["club"],
                data["course"],
                data["league"],
            )
            return {
                "message": "Competitor - {} was Updated".format(data["name"])
            }
        except:
            return (
                {
                    "message": "Error: Problem Updating Competitor - Please Try Again"
                },
                500,
            )

    @requireAuthentication
    def delete(self, competitorId):
        competitor = competitors.findCompetitor(competitorId)
        competitors.deleteCompetitor(competitorId)
        return {
            "message": "Competitor - {} was Deleted".format(competitor["name"])
        }


class CompetitorMerge(Resource):
    @requireAuthentication
    def post(self):
        data = competitorMergeParser.parse_args()

        try:
            competitors.mergeCompetitors(
                data["competitorKeep"], data["competitorMerge"]
            )
            return {"message": "Competitors Merged Successfully"}
        except:
            return (
                {"message": "Error: Merging Competitors - Please Try Again"},
                500,
            )
