from .processResults import assignPositionMultipleCourses
from .points import assignPoints
from ..database import League, Result


def calculateDynamicPoints(league: League):
    dynamicResults = Result.getDynamicResultsByLeague(league.name)

    for result in dynamicResults:
        points = Result.getNonDynamicPointsByCompetitor(result.competitor)

        if result["type"] == "max":
            Result.updatePoints(result.id, max(points))
        elif result["type"] == "average":
            average = round(sum(points) / len(points))
            Result.updatePoints(result.id, average)


def recalculateResults(eventId: str, scoringMethod: str):
    exisitingResults = Result.getByEventForRecalc(eventId)
    resultsWithPositions = assignPositionMultipleCourses(exisitingResults)
    resultsWithPoints = assignPoints(resultsWithPositions, scoringMethod)

    for result in resultsWithPoints:
        Result.updateFromRecalc(result)
