from .helpers import *


def assignPoints(data, leagueScoringMethod):
    if leagueScoringMethod == "timeAverage":
        return timeFromAveragePoints(data)
    elif leagueScoringMethod == "timeAverage100":
        return timeFromAveragePoints(data, 100, 20)
    else:
        return False


def timeFromAveragePoints(
    data, averagePoints=1000, standardDeviationPoints=200
):
    courseStats = calculateCourseAverage(data)
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        resultWithPoints["points"] = timeFromAverageCalculatePoints(
            result,
            courseStats.get(result["course"], {}),
            averagePoints,
            standardDeviationPoints,
        )

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def timeFromAverageCalculatePoints(
    result, courseStats, averagePoints, standardDeviationPoints
):
    average = courseStats.get("average", 0)
    standardDeviation = courseStats.get("standardDeviation", 0)

    if not validResult(result):
        return 0
    else:
        if standardDeviation == 0:
            points = averagePoints
        else:
            points = averagePoints + standardDeviationPoints * (
                (average - result["time"]) / standardDeviation
            )

        if points < 0:
            points = 0

        return round(points)
