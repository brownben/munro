from typing import Any, Callable, List

from .scoringHelpers import (
    occuracesOfPosition,
    calculateCourseStatistics,
    calculateCourseTop3Average,
    getMultiplier,
)


def positionBasedPoints(leagueScoringMethod: str):
    multiplier = 1
    startValue = 101

    if "Double" in leagueScoringMethod:
        multiplier = 2
    if "50" in leagueScoringMethod:
        startValue = 51
    elif "99" in leagueScoringMethod:
        startValue = 100

    def calculator(result: dict) -> int:
        return (startValue * multiplier) - (result["position"] * multiplier)

    return calculator


def positionBasedPointsWithDraw(results: List[dict]):
    def calculator(result: dict) -> int:
        positionOccurances = occuracesOfPosition(results, result["position"])
        points = 100 - result["position"]
        return (points + (points - positionOccurances) + 1) / 2

    return calculator


def timeRelativeToAverageBasedPoints(
    leagueScoringMethod: str,
    results: List[dict],
):
    averagePoints = 1000
    standardDeviationPoints = 200

    if "100" in leagueScoringMethod:
        averagePoints = 100
        standardDeviationPoints = 20

    courseStats = calculateCourseStatistics(results)

    def calculate(result: dict) -> int:
        average = courseStats.get("average", 0)
        standardDeviation = courseStats.get("standardDeviation", 0)

        if standardDeviation == 0:
            return averagePoints

        deviationFromMean = (average - result["time"]) / standardDeviation
        points = averagePoints + standardDeviationPoints * deviationFromMean

        if points < 0:
            return 0

        return round(points)

    return calculate


def timeRelativeToTopBasedPoints(
    leagueScoringMethod: str,
    results: List[dict],
):
    courseStats = calculateCourseTop3Average(results)

    def calculate(result: dict):
        average = courseStats.get(result["course"], 0)

        multiplier = (
            getMultiplier(result["ageClass"], result["course"])
            if "Adjusted" in leagueScoringMethod
            else 1
        )

        if not result["time"]:
            return 0

        return round((average / result["time"]) * 1000, 2) * multiplier

    return calculate


def getScoringMethod(
    leagueScoringMethod: str, results: List[dict]
) -> Callable[[dict], int]:
    if "position99average" in leagueScoringMethod:
        return positionBasedPointsWithDraw(results)
    elif "position" in leagueScoringMethod:
        return positionBasedPoints(leagueScoringMethod)
    elif "timeAverage" in leagueScoringMethod:
        return timeRelativeToAverageBasedPoints(leagueScoringMethod, results)
    elif "timeTop" in leagueScoringMethod:
        return timeRelativeToTopBasedPoints(leagueScoringMethod, results)
    elif "file" in leagueScoringMethod:
        return lambda result: result.get("file_points") or 0
    else:
        return lambda: 0


def assignPoints(results: List[dict], leagueScoringMethod: str) -> List[dict[str, Any]]:
    getScore = getScoringMethod(leagueScoringMethod)

    return [{**result, "points": getScore(result)} for result in results]
