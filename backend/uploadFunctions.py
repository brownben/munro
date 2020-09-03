# Functions to Match Competitors during upload and to remove competitors with the wrong course during upload

from points.assignPoints import assignPoints
from points.assignPosition import assignPositionsMultipleCourses
from database import results, competitors, events, leagues
from routes.returnMessages import returnError
import csvFunctions as csv


def nameToInitial(name):
    # Get initial from a name, for matching of surname + initial
    # Returns initial concatenated to surname
    name = name.strip().upper()
    splitName = name.split(" ", 1)

    if len(splitName) > 1:
        return splitName[0][0] + " " + splitName[1]
    else:
        return name


def nameToInitialCheck(obj1, obj2):
    return nameToInitial(obj1["name"]) == nameToInitial(obj2["name"])


def compareProperties(obj1, obj2, comparison):
    if comparison == "name":
        return obj1["name"].upper() == obj2["name"].upper()

    return obj1[comparison] == obj2[comparison]


def competitorNonMatchingNameCheck(competitor, result, leagueScoring):
    return (
        nameToInitialCheck(competitor, result)
        and (
            compareProperties(competitor, result, "course")
            or leagueScoring == "overall"
        )
        and (
            compareProperties(competitor, result, "ageClass")
            or compareProperties(competitor, result, "club")
        )
    )


def competitorMatchingNameCheck(competitor, result, leagueScoring):
    return compareProperties(competitor, result, "name") and (
        compareProperties(competitor, result, "course") or leagueScoring == "overall"
    )


def matchCompetitor(competitorList, result, leagueScoring):
    for competitor in competitorList:
        if competitorMatchingNameCheck(competitor, result, leagueScoring):
            return competitor

    for competitor in competitorList:
        if competitorNonMatchingNameCheck(competitor, result, leagueScoring):
            return competitor

    return False


def removeExtraCourses(results, courses, leagueScoring):
    # Remove competitors with courses that are not configured for the league
    if leagueScoring == "overall":
        return results

    upperCourses = [course.upper() for course in courses]
    resultsWithCoursesRemoved = []
    for result in results:
        if result["course"].upper() in upperCourses:
            indexOfCourse = upperCourses.index(result["course"].upper())
            result["course"] = courses[indexOfCourse]
            resultsWithCoursesRemoved.append(result)

    return resultsWithCoursesRemoved


def recalculateResults(eventId, leagueScoring):
    exisitingResults = results.getResultsByEventForRecalc(eventId)
    resultsWithPositions = assignPositionsMultipleCourses(exisitingResults)
    resultsWithPoints = assignPoints(resultsWithPositions, leagueScoring)

    for result in resultsWithPoints:
        results.recalcUpdateResult(result)


def getCompetitorData(eventData, dataWithPoints, leagueScoring):
    allCompetitors = competitors.getCompetitorsByLeague(eventData["league"])

    dataWithCompetitors = []

    for result in dataWithPoints:
        competitor = matchCompetitor(allCompetitors, result, leagueScoring)
        if competitor:
            result["competitor"] = competitor["id"]

            if not result["ageClass"]:
                result["ageClass"] = competitor["ageClass"]
        else:
            # If no match create competitor and save id as that in the result
            result["competitor"] = competitors.createCompetitor(
                {
                    "name": result["name"],
                    "ageClass": result["ageClass"],
                    "club": result["club"],
                    "course": result["course"],
                    "league": eventData["league"],
                }
            )
        dataWithCompetitors.append(result)

    return dataWithCompetitors


def streamResultToDict(result, event, course):
    splitResult = result.split(",")

    return {
        "type": course + splitResult[1],
        "name": splitResult[0],
        "time": csv.timeToSeconds(splitResult[2]),
        "incomplete": splitResult[3] != "OK",
        "ageClass": splitResult[4:5] or "",
        "club": splitResult[5:6] or "",
        "position": "",
        "points": 0,
        "event": event,
        "course": course,
    }


def newResults(exisitingResults, latestResults):
    existingResultIds = [result["type"] for result in exisitingResults]
    return [
        result for result in latestResults if result["type"] not in existingResultIds
    ]


def getEventLeagueData(eventId):
    try:
        eventData = events.getEventWithUploadKey(eventId)
        leagueOfEvent = leagues.findLeague(eventData["league"])

        return eventData, leagueOfEvent

    except:
        return (
            "error",
            returnError("Problem Getting Information from the Database"),
        )


def filterClubRestriction(result, league):
    if league["clubRestriction"] and result["club"] != league["clubRestriction"]:
        return "hidden"
    else:
        return result.get("type", None)
