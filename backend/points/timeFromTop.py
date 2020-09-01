from .helpers import *


def assignPoints(data, leagueScoringMethod):
    if leagueScoringMethod == "timeTop3":
        return timeFromTop3(data)
    else:
        return False


def timeFromTop3(data, averagePoints=1000, standardDeviationPoints=200):
    courseStats = calculateCourseTop3Average(data)

    return [
        {
            **result,
            "points": timeFromAverageCalculatePoints(
                result,
                courseStats.get(result["course"], 0),
            ),
        }
        for result in data
    ]


def timeFromTop3CalculatePoints(result, average):
    points = (average / result["time"]) * 1000

    if points < 0:
        points = 0

    return round(points)
