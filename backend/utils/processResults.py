from heapq import nlargest
from typing import Any, List, Dict, Optional, Tuple, TypedDict

from ..database.league import League
from ..database.event import Event

ResultDict = Dict[str, Any]


class PointsResult(TypedDict):
    event: Optional[str]
    score: Optional[int]
    type: Optional[str]
    counting: Optional[bool]


class PointsResultWithIndex(PointsResult):
    index: int


def getPointsResultScore(score: PointsResultWithIndex) -> int:
    return score["score"] or 0


def getPointsResultEvent(score: PointsResult) -> str:
    return score["event"] or ""


def getCountingPoints(
    results: List[PointsResult],
    league: League,
    leagueEvents: List[Event],
) -> List[PointsResult]:
    numberOfCountingEvents = league.numberOfCountingEvents
    events = [getPointsResultEvent(result) for result in results]
    remainingScores = [
        PointsResultWithIndex(
            index=index,
            event=result["event"],
            score=result["score"],
            type=result["type"],
            counting=None,
        )
        for index, result in enumerate(results)
    ]

    countingScores = []

    # Get Events Marked As Required
    requiredEvents = getIndexesOfRequiredEvents(events, leagueEvents)
    countingScores.extend(requiredEvents)
    remainingScores = removeCountingScores(remainingScores, countingScores)

    # Get Max Number and Min Number From a Group
    includedScores, excludedScores = getIndexesOfGroupedEvents(league, remainingScores)
    countingScores.extend(includedScores)
    remainingScores = removeCountingScores(remainingScores, includedScores)
    remainingScores = removeCountingScores(remainingScores, excludedScores)

    # Get Largest Remaining Scores
    numberRemaining = numberOfCountingEvents - len(countingScores)
    if numberRemaining > 0:
        largestScores = getIndexesOfLargestScores(numberRemaining, remainingScores)
        countingScores.extend(largestScores)

    for index, result in enumerate(results):
        result["counting"] = index in countingScores

    return results


def getIndexesOfRequiredEvents(
    events: List[str], leagueEvents: List[Event]
) -> List[int]:
    requiredEvents = [event for event in leagueEvents if event.requiredInTotal]
    return [events.index(event.id) for event in requiredEvents]


def removeCountingScores(
    scores: List[PointsResultWithIndex], countingScores: List[int]
) -> List[PointsResultWithIndex]:
    return [score for score in scores if score["index"] not in countingScores]


def getIndexesOfGroupedEvents(
    league: League, scores: List[PointsResultWithIndex]
) -> Tuple[List[int], List[int]]:
    eventGroups = league.getAdditionalSettingsAsJSON().get("eventGroups", {})

    includedScores = []
    excludedScores = []

    for eventGroup in eventGroups:
        minimum = eventGroups[eventGroup].get("min", 0)
        maximum = eventGroups[eventGroup].get("max", 0)

        relevantScores = [
            score for score in scores if eventGroup in getPointsResultEvent(score)
        ]
        sortedScores = sorted(relevantScores, key=getPointsResultScore)

        includedScores.extend([score["index"] for score in sortedScores[:minimum]])
        excludedScores.extend([score["index"] for score in sortedScores[maximum:]])

    return includedScores, excludedScores


def getIndexesOfLargestScores(
    numberOfScoresRemaining: int, scores: List[PointsResultWithIndex]
) -> List[int]:
    largestRemaining = nlargest(
        numberOfScoresRemaining,
        iterable=scores,
        key=getPointsResultScore,
    )
    return [score["index"] for score in largestRemaining]


def calculatePointsTotal(results: List[PointsResult]) -> int:
    return sum([result["score"] or 0 for result in results if result["counting"]])


def assignPosition(results: List[ResultDict]) -> List[ResultDict]:
    """ Assign 1st, 2nd, 3rd, etc based off total points """

    lastPosition = 0
    position = 0
    lastPoints = -1

    for result in results:
        if result["totalPoints"] == lastPoints:
            result["position"] = lastPosition
            position += 1
        else:
            position += 1
            lastPosition = position
            result["position"] = position

        lastPoints = result["totalPoints"]

    return results


def assignPositionMultipleCourses(results: List[ResultDict]) -> List[ResultDict]:
    position = 0
    lastPosition = 0
    lastCourse = False
    lastTime = -1

    for result in results:
        if result["course"] != lastCourse:
            position = 0
            lastPosition = 0
            lastTime = -1
            lastCourse = result["course"]

        if result["incomplete"] or result["type"] == "hidden":
            result["position"] = -1
        elif result["time"] == lastTime:
            result["position"] = lastPosition
            position += 1
        else:
            position += 1
            lastPosition = position
            result["position"] = position
            lastTime = result["time"]

    return results


def getMatchingResults(results: List[ResultDict], league: League) -> List[ResultDict]:
    return [
        result
        for result in results
        if matchesClubRestriction(result["club"], league.clubRestriction)
        and (matchesCourse(result, league.courses) or league.leagueScoring != "course")
    ]


def matchesClubRestriction(club: str, allowedClub: str) -> bool:
    if allowedClub:
        return club == allowedClub
    else:
        return True


def matchesCourse(result: ResultDict, courses: List[str]) -> bool:
    upperCourses = [course.upper() for course in courses]
    return result["course"].upper() in upperCourses


def normaliseCourses(results: List[ResultDict], league: League) -> List[ResultDict]:
    upperCourses = [course.upper() for course in league.courses]
    resultsWithCoursesFixed = []

    if league.leagueScoring != "course":
        return results

    for result in results:
        indexOfCourse = upperCourses.index(result["course"].upper())
        result["course"] = league.courses[indexOfCourse]

        resultsWithCoursesFixed.append(result)

    return resultsWithCoursesFixed
