from typing import Any, Callable, List, Dict

from .scoringHelpers import (
    isValidResult,
    occuracesOfPosition,
    calculateCourseStatistics,
    calculateCourseTop3Average,
    getMultiplier,
)

Result = Dict[str, Any]
GetScoreFunction = Callable[[Result], int]


def positionBasedPoints(leagueScoringMethod: str) -> GetScoreFunction:
    multiplier = 1
    startValue = 101

    if "Double" in leagueScoringMethod:
        multiplier = 2
    if "50" in leagueScoringMethod:
        startValue = 51
    elif "99" in leagueScoringMethod:
        startValue = 100

    def calculator(result: Result) -> int:
        if not isValidResult(result):
            return 0

        return (startValue * multiplier) - (result["position"] * multiplier)

    return calculator


def positionBasedPointsWithDraw(results: List[Result]) -> GetScoreFunction:
    def calculator(result: Result) -> int:
        if not isValidResult(result):
            return 0

        positionOccurances = occuracesOfPosition(results, result["position"])
        points = 100 - result["position"]

        return (points + (points - positionOccurances) + 1) / 2

    return calculator


def timeRelativeToAverageBasedPoints(
    leagueScoringMethod: str,
    results: List[Result],
) -> GetScoreFunction:
    averagePoints = 1000
    standardDeviationPoints = 200

    if "100" in leagueScoringMethod:
        averagePoints = 100
        standardDeviationPoints = 20

    statsForCourses = calculateCourseStatistics(results)

    def calculate(result: Result) -> int:
        if not isValidResult(result):
            return 0

        courseStats = statsForCourses[result["course"]]

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
    results: List[Result],
) -> GetScoreFunction:
    courseStats = calculateCourseTop3Average(results)

    def calculate(result: Result) -> int:
        if not isValidResult(result):
            return 0

        average = courseStats.get(result["course"], 0)
        multiplier = (
            getMultiplier(result["ageClass"], result["course"])
            if "Adjusted" in leagueScoringMethod
            else 1000
        )

        if not result["time"]:
            return 0

        return round((average / result["time"]) * multiplier)

    return calculate


def getScoringMethod(
    leagueScoringMethod: str, results: List[Result]
) -> GetScoreFunction:
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
        return lambda result: 0


def assignPoints(results: List[Result], leagueScoringMethod: str) -> List[Result]:
    getScore = getScoringMethod(leagueScoringMethod, results)

    return [{**result, "points": getScore(result)} for result in results]
