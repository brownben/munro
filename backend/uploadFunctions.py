# Functions to Match Competitors during upload and to remove competitors with the wrong course during upload

import pointsFunctions as points
from database import results


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


def competitorNonMatchingNameCheck(competitor, result):
    return (
        nameToInitialCheck(competitor, result)
        and compareProperties(competitor, result, "course")
        and (
            compareProperties(competitor, result, "ageClass")
            or compareProperties(competitor, result, "club")
        )
    )


def competitorMatchingNameCheck(competitor, result):
    return compareProperties(competitor, result, "name") and compareProperties(
        competitor, result, "course"
    )


def matchCompetitor(competitorList, result):
    for competitor in competitorList:
        if competitorMatchingNameCheck(competitor, result):
            return competitor

    for competitor in competitorList:
        if competitorNonMatchingNameCheck(competitor, result):
            return competitor

    return False


def removeExtraCourses(results, courses):
    # Remove competitors with courses that are not configured for the league
    upperCourses = [course.upper() for course in courses]
    resultsWithCoursesRemoved = []
    for result in results:
        if result["course"].upper() in upperCourses:
            indexOfCourse = upperCourses.index(result["course"].upper())
            result["course"] = courses[indexOfCourse]
            resultsWithCoursesRemoved.append(result)

    return resultsWithCoursesRemoved


def assignPositions(results):
    lastCourse = False
    lastPosition = 0
    lastTime = -1
    numberTied = 1

    for result in results:
        if result["course"] != lastCourse:
            lastPosition = 0
            lastCourse = result["course"]
            lastTime = -1
            numberTied = 1

        if result["time"] != lastTime:
            lastTime = result["time"]
            lastPosition += numberTied
            numberTied = 0

        if not result["incomplete"]:
            numberTied += 1
            result["position"] = lastPosition

        else:
            result["position"] = -1

    return results


def recalculateResults(eventId, leagueScoring):
    exisitingResults = results.getResultsByEventForRecalc(eventId)
    resultsWithPositions = assignPositions(exisitingResults)
    resultsWithPoints = points.assignPoints(resultsWithPositions, leagueScoring)

    for result in resultsWithPoints:
        results.recalcUpdateResult(result)
