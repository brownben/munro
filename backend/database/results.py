import pointsFunctions
from . import events, leagues
from .sqlQuery import query, queryWithOneResult, queryWithResults


def partResultToJSON(result):
    if result[1] == -1:
        position = ""
    else:
        position = result[1]

    if result:
        return {
            "time": result[0],
            "position": position,
            "points": result[2],
            "incomplete": result[3] == "true",
            "event": result[4],
        }
    else:
        return False


def resultToJSON(result):
    resultJSON = partResultToJSON(result)
    if resultJSON:
        return {**resultJSON, "competitor": result[5], "id": result[6]}
    else:
        return False


def fullResultToJSON(result):
    resultJSON = partResultToJSON(result)
    if resultJSON:
        return {
            **resultJSON,
            "name": result[5],
            "ageClass": result[6],
            "club": result[7],
            "course": result[8],
            "id": result[9],
        }
    else:
        return False


def getPointsForEvent(results, eventId):
    # Find Event matching the ID
    filteredPoints = filter(lambda event: event["event"] == eventId, results)
    filteredPoints = list(filteredPoints)
    # If found return event
    if len(filteredPoints) != 0:
        return filteredPoints[0]["points"]
    else:
        return ""


def courseResultToJSON(result, league, eventsList):
    # If all that data is found return success
    if league and eventsList:
        # Get number of events to count in league
        numberOfCountingEvents = league["numberOfCountingEvents"]
        # Get events with results uploaded
        eventsWithResults = filter(
            lambda event: event["resultUploaded"], eventsList
        )

        # Split Points and events from database string
        # Place in record for each event
        eventList = result[3].split(";")
        pointsList = result[4].split(";")
        eventsByCompetitor = []
        for event in range(len(result[3].split(";"))):
            eventsByCompetitor.append(
                {"event": eventList[event], "points": float(pointsList[event])}
            )
        # Get points for each event in order
        points = []
        for event in eventsWithResults:
            points.append(getPointsForEvent(eventsByCompetitor, event["id"]))

        # Calculate the total and which scores make this
        largestPoints = pointsFunctions.biggestPoints(
            points, numberOfCountingEvents
        )
        totalPoints = pointsFunctions.calculateTotal(largestPoints, points)

        # Change to object rather than tuple
        if result:
            return {
                "name": result[0],
                "ageClass": result[1],
                "club": result[2],
                "points": points,
                "totalPoints": totalPoints,
                "largestPoints": largestPoints,
            }
        else:
            return False
    else:
        return False


# Competitor Database Functions


def createResult(time, position, points, incomplete, event, competitor):
    if position == "":
        position = -1
    query(
        """
        INSERT INTO results (time, position, points, incomplete, event, competitor)
        VALUES (%s,%s,%s,%s,%s,%s)
    """,
        (time, position, points, incomplete, event, competitor),
    )


def updateResult(rowid, time, position, points, incomplete, event, competitor):
    query(
        """
        UPDATE results
        SET time=%s, position=%s, points=%s, incomplete=%s, event=%s, competitor=%s
        WHERE rowid=%s
    """,
        (time, position, points, incomplete, event, competitor, rowid),
    )


def deleteResult(rowid):
    query("DELETE FROM results WHERE rowid=%s", (rowid,))


def deleteAllResults():
    query("DELETE FROM results")


def deleteResultsByEvent(event):
    query("DELETE FROM results WHERE event=%s", (event,))


def deleteResultsByCompetitor(competitor):
    query("DELETE FROM results WHERE competitor=%s", (competitor,))


def findResults(rowid):
    result = queryWithOneResult(
        """
        SELECT time, position, points incomplete, event, competitor, id
        FROM results
        WHERE rowid=%s
    """,
        (rowid,),
    )
    return resultToJSON(result)


def getAllResults():
    result = queryWithResults(
        """
        SELECT results.time, results.position, results.points, results.incomplete, results.event,
        competitors.name, competitors.ageClass, competitors.club, competitors.course, results.rowid
        FROM competitors, results
        WHERE results.competitor=competitors.rowid
    """
    )
    return list(map(fullResultToJSON, result))


def getResultsByCompetitor(competitor):
    result = queryWithResults(
        """
        SELECT time, position, points, incomplete, event, competitor, rowid
        FROM results
        WHERE competitor=%s
        ORDER BY event ASC
    """,
        (competitor,),
    )
    return list(map(resultToJSON, result))


def getResultsByEvent(event):
    result = queryWithResults(
        """
        SELECT results.time, results.position, results.points, results.incomplete, results.event,
        competitors.name, competitors.ageClass, competitors.club, competitors.course, results.rowid
        FROM competitors, results
        WHERE results.competitor=competitors.rowid AND event=%s
        ORDER BY competitors.course ASC, results.position ASC
    """,
        (event,),
    )
    return list(map(fullResultToJSON, result))


def getResultsForCourse(league, course):
    results = queryWithResults(
        """
        SELECT competitors.name, competitors.ageClass, competitors.club,  string_agg(results.event::text,';'),
         string_agg(results.points::text,';')
        FROM competitors, results
        WHERE results.competitor=competitors.rowid AND competitors.course=%s AND competitors.league=%s
        GROUP BY competitors.rowid
        """,
        (course, league),
    )

    resultsList = []

    leagueDetails = leagues.findLeague(league)
    eventsList = events.getEventsOfLeague(league)

    for result in list(results):
        resultsList.append(
            courseResultToJSON(result, leagueDetails, eventsList)
        )

    # Return results sorted with positions assigned
    sortedResults = sorted(
        resultsList, key=lambda x: x["totalPoints"], reverse=True
    )
    return pointsFunctions.assignPosition(sortedResults)


def transferResult(result, competitor):
    query(
        """
        UPDATE results
        SET competitor=%s
        WHERE rowid=%s
    """,
        (competitor, result),
    )

