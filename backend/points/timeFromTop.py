from .helpers import *
from .courseMultipliers import getMultiplier


def assignPoints(data, leagueScoringMethod):
    if leagueScoringMethod == "timeTop3":
        return timeFromTop3(data)
    elif leagueScoringMethod == "timeTop3Adjusted":
        return timeFromTop3Adjusted(data)
    else:
        return False


def timeFromTop3(data, averagePoints=1000, standardDeviationPoints=200):
    courseStats = calculateCourseTop3Average(data)

    return [
        {
            **result,
            "points": timeFromTop3CalculatePoints(
                result,
                courseStats.get(result["course"], 0),
            ),
        }
        for result in data
    ]


def timeFromTop3Adjusted(data, averagePoints=1000, standardDeviationPoints=200):
    courseStats = calculateCourseTop3Average(data)

    return [
        {
            **result,
            "points": timeFromTop3CalculatePointsAdjusted(
                result,
                courseStats.get(result["course"], 0),
            ),
        }
        for result in data
    ]


def timeFromTop3CalculatePoints(result, average):
    points = (average / result["time"]) * 1000

    return round(points)


def timeFromTop3CalculatePointsAdjusted(result, average):
    multiplier = getMultiplier(result["ageClass"], result["course"])
    points = (average / result["time"]) * multiplier

    return round(points)