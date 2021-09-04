import json
import re

import requests
from flask_restx import Namespace, Resource

from ..models.result import eventResultModel, sitimingModel
from ..utils.helpers import toSeconds
from ..utils.processResults import assignPositionMultipleCourses

api = Namespace("SI Timing", description="Scrape results data from SI Timing results")
api.models[sitimingModel.name] = sitimingModel
api.models[eventResultModel.name] = eventResultModel


@api.route("/<path:url>")
@api.param("url", "Results page to fetch")
class SITimingResultsRoute(Resource):
    @api.marshal_with(sitimingModel, as_list=True)
    @api.response(200, "Success - Results data")
    @api.response(500, "Problem processing results")
    def get(self, url):
        try:
            html = requests.get(url).text

            eventName = (
                re.search("<h2>(.*?)</h2>", html)
                .group(1)
                .replace("Results for ", "")
                .replace("- Provisional", "")
                .strip()
            )
            courses = [
                course.strip()
                for course in re.findall('<option value="[0-9]+">(.*?)</option>', html)
            ]

            dataSection = re.search(
                "function getData\(tableNumber\) \{(.*);\}<\/script>", html
            ).group(1)
            data = re.split("if \(tableNumber == [0-9]+\) return ", str(dataSection))

            courseJSON = [
                json.loads(
                    course_data.replace("]];", "]]")
                    .replace("&nbsp;", "")
                    .replace("\\u0026nbsp;", "")
                )
                for course_data in data
                if course_data
            ]

            def getTimeField(result) -> str:
                if "+" not in result[6] and result[6] != "":
                    return result[6]
                else:
                    return result[5]

            results = []
            for course_id, course in enumerate(courseJSON):
                results.extend(
                    [
                        {
                            "id": 1000 * course_id + int(result[1]),
                            "time": (time := toSeconds(getTimeField(result))),
                            "incomplete": not time,
                            "type": "",
                            "course": courses[course_id],
                            "name": re.sub("<.*>", "", result[2]),
                            "ageClass": result[4],
                            "club": result[3],
                        }
                        for result in course
                    ]
                )

            resultsWithFixedPositions = [
                result if result["position"] > 0 else {**result, "position": ""}
                for result in assignPositionMultipleCourses(results)
            ]

            return {
                "eventName": eventName,
                "results": resultsWithFixedPositions,
            }

        except:
            return {}, 500
