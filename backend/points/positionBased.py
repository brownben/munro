from .helpers import *


def assignPoints(data, leagueScoringMethod):
    multiplier = 1
    startValue = 101

    if "Double" in leagueScoringMethod:
        multiplier = 2
    if "50" in leagueScoringMethod:
        startValue = 51
    elif "99" in leagueScoringMethod:
        startValue = 100

    return positionBasedPoints(data, startValue, multiplier)


def positionBasedPoints(data, startValue=101, multiplier=1):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if validResult(result):
            resultWithPoints["points"] = (startValue * multiplier) - (
                result["position"] * multiplier
            )

        else:
            resultWithPoints["points"] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def assignPoints99WithDraw(data):
    # Assign points 99 for 1st, 98 for 2nd etc - 0 for incomplete course - Average of Points for Draw
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if validResult(result):
            positionOccurances = countOccuracesOfPosition(
                data, result["position"]
            )
            points = 100 - result["position"]
            resultWithPoints["points"] = (
                points + (points - positionOccurances) + 1
            ) / 2
        else:
            resultWithPoints["points"] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints
