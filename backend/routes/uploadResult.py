from flask_restful import Resource, reqparse

import csvFunctions as csv
import uploadFunctions as upload
from points import dynamicPoints
from database import competitors, results
from .returnMessages import returnMessage, returnError


resultParser = reqparse.RequestParser()
resultParser.add_argument("eventId", help="This field cannot be blank", required=True)
resultParser.add_argument("time", help="This field cannot be blank", required=True)
resultParser.add_argument("name", help="This field cannot be blank", required=True)
resultParser.add_argument("course", help="This field cannot be blank", required=True)


class UploadResult(Resource):
    def post(self):
        data = resultParser.parse_args()
        eventData, leagueOfEvent = upload.getEventLeagueData(data["eventId"])

        if eventData == "error":
            return leagueOfEvent

        if not eventData["userSubmittedResults"]:
            return returnError(
                "Error: That Event Doesn't Accept User Submitted Results"
            )

        try:
            competitor = competitors.getCompetitorByNameCourseAndLeague(
                data["name"], data["course"], leagueOfEvent["name"]
            )
            if not competitor:
                competitor = competitors.createCompetitor(
                    {
                        "name": data["name"],
                        "ageClass": "",
                        "club": "",
                        "course": data["course"],
                        "league": leagueOfEvent["name"],
                    }
                )
            else:
                competitor = competitor["id"]

            results.createResult(
                {
                    "time": csv.timeToSeconds(data["time"]),
                    "position": "",
                    "points": 0,
                    "incomplete": False,
                    "event": data["eventId"],
                    "competitor": competitor,
                    "type": "userUpload",
                }
            )

            upload.recalculateResults(data["eventId"], leagueOfEvent["scoringMethod"])
            dynamicPoints.calculate(eventData["league"])

            return returnMessage("Points Assigned")

        except:
            return returnError("Error: Problem Uploading Result - Please Try Again")
