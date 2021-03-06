from heapq import nlargest
from typing import Any, List, Dict

from ..database.league import League
from ..database.event import Event

ResultDict = Dict[str, Any]


def getIndexOfLargestNPoints(points: List[int], number: int) -> List[int]:
    return nlargest(number, range(len(points)), points.__getitem__)


def getCountingPoints(
    points: List[int],
    numberCounting: int,
    events: List[str],
    leagueEvents: List[Event],
) -> List[int]:
    leagueEventIds = [event.id for event in leagueEvents]
    indexOfLargestPoints = getLargestRequiredPoints(
        points,
        numberCounting,
        events,
        leagueEvents,
    )
    return [
        pointsIndex
        for pointsIndex in indexOfLargestPoints
        if events[pointsIndex] in leagueEventIds
    ]


def getLargestRequiredPoints(
    points: List[int],
    numberCounting: int,
    events: List[str],
    databaseEvents: List[Event],
) -> List[int]:
    requiredEvents = [event for event in databaseEvents if event.requiredInTotal]
    requiredPoints = [events.index(event.id) for event in requiredEvents]
    largestPoints = getIndexOfLargestNPoints(points, numberCounting)
    missingRequiredPoints = [
        index for index in requiredPoints if index not in largestPoints
    ]

    if len(requiredPoints) == 0 or len(missingRequiredPoints) == 0:
        return largestPoints

    return largestPoints[: -len(missingRequiredPoints)] + missingRequiredPoints


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
