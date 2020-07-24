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
            "type": result[5],
        }
    else:
        return False


def resultToJSON(result):
    resultJSON = partResultToJSON(result)
    if resultJSON:
        return {**resultJSON, "competitor": result[6], "id": result[7]}
    else:
        return False


def resultToJSONwithEventName(result):
    resultJSON = partResultToJSON(result)
    if resultJSON:
        return {
            **resultJSON,
            "competitor": result[6],
            "id": result[7],
            "eventName": result[8],
        }
    else:
        return False


def fullResultToJSON(result):
    resultJSON = partResultToJSON(result)
    if resultJSON:
        return {
            **resultJSON,
            "name": result[6],
            "ageClass": result[7],
            "club": result[8],
            "course": result[9],
            "id": result[10],
        }
    else:
        return False


def recalcResultToJSON(result):
    return {
        "rowid": result[0],
        "time": result[1],
        "incomplete": result[2] == "true",
        "course": result[3],
        "type": result[4],
    }


def getPointsForEvent(results, eventId):
    # Find Event matching the ID
    filteredPoints = [event for event in results if event["event"] == eventId]

    # If found return event
    if len(filteredPoints) != 0:
        return filteredPoints[0]["points"]
    else:
        return ""


def getTypesForEvent(results, eventId):
    # Find Event matching the ID
    filteredTypes = [event for event in results if event["event"] == eventId]

    # If found return event
    if len(filteredTypes) != 0 and filteredTypes[0]["type"] is not None:
        return filteredTypes[0]["type"]
    else:
        return ""


def courseResultToJSON(result, league, eventsList):
    # If all that data is found return success
    if not (result and league and eventsList):
        return False
        # Get number of events to count in league
    numberOfCountingEvents = league["numberOfCountingEvents"]
    # Get events with results uploaded
    eventsWithResults = [
        event for event in eventsList if event["resultUploaded"]
    ]

    # Split Points and events from database string
    # Place in record for each event
    eventList = result[3]
    pointsList = result[4]
    resultTypeList = result[5]

    eventsByCompetitor = [
        {
            "event": event,
            "points": float(pointsList[index]),
            "type": resultTypeList[index],
        }
        for index, event in enumerate(eventList)
    ]

    # Get points for each event in order
    points = [
        getPointsForEvent(eventsByCompetitor, event["id"])
        for event in eventsWithResults
    ]

    types = [
        getTypesForEvent(eventsByCompetitor, event["id"])
        for event in eventsWithResults
    ]

    # Calculate the total and which scores make this
    largestPoints = pointsFunctions.biggestPoints(
        points, numberOfCountingEvents
    )
    totalPoints = pointsFunctions.calculateTotal(largestPoints, points)

    # Change to object rather than tuple

    return {
        "name": result[0],
        "ageClass": result[1],
        "club": result[2],
        "points": points,
        "totalPoints": totalPoints,
        "largestPoints": largestPoints,
        "types": types,
    }


# Competitor Database Functions


def createResult(data):
    if data["position"] == "":
        data["position"] = -1

    query(
        """
        INSERT INTO results (time, position, points, incomplete, event, competitor, type)
        VALUES (%s,%s,%s,%s,%s,%s,%s)
    """,
        (
            data["time"],
            data["position"],
            data["points"],
            data["incomplete"],
            data["event"],
            data["competitor"],
            data.get("type", None),
        ),
    )


def updateResult(data):
    if data["position"] == "":
        data["position"] = -1

    query(
        """
        UPDATE results
        SET time=%s, position=%s, points=%s, incomplete=%s, event=%s, competitor=%s, type=%s
        WHERE rowid=%s
    """,
        (
            data["time"],
            data["position"],
            data["points"],
            data["incomplete"],
            data["event"],
            data["competitor"],
            data["type"],
            data["rowid"],
        ),
    )


def recalcUpdateResult(data):
    query(
        """
        UPDATE results
        SET time=%s, position=%s, points=%s, incomplete=%s
        WHERE rowid=%s
    """,
        (
            data["time"],
            data["position"],
            data["points"],
            data["incomplete"],
            data["rowid"],
        ),
    )


def updatePoints(result, points):
    query(
        """
        UPDATE results
        SET points=%s
        WHERE rowid=%s
    """,
        (points, result),
    )


def deleteResult(rowid):
    query("DELETE FROM results WHERE rowid=%s", (rowid,))


def deleteAllResults():
    query("DELETE FROM results")


def deleteResultsByEvent(event):
    query(
        """
        DELETE FROM results
        WHERE event=%s
            AND COALESCE(type,'') <> 'max'
            AND COALESCE(type,'') <> 'average'
            AND COALESCE(type,'') <> 'manual'
            AND COALESCE(type,'') <> 'userUpload'
        """,
        (event,),
    )


def deleteResultsByEventAll(event):
    query(
        """
        DELETE FROM results
        WHERE event=%s
        """,
        (event,),
    )


def deleteResultsByCompetitor(competitor):
    query("DELETE FROM results WHERE competitor=%s", (competitor,))


def getResult(rowid):
    result = queryWithOneResult(
        """
        SELECT time, position, points, incomplete, event, type, competitor, id
        FROM results
        WHERE rowid=%s
    """,
        (rowid,),
    )
    return resultToJSON(result)


def getAllResults():
    result = queryWithResults(
        """
        SELECT results.time, results.position, results.points, results.incomplete, results.event, results.type,
        competitors.name, competitors.ageClass, competitors.club, competitors.course, results.rowid
        FROM competitors, results
        WHERE results.competitor=competitors.rowid
            AND results.type <> 'hidden'
    """
    )
    return list(map(fullResultToJSON, result))


def getResultsByCompetitor(competitor):
    result = queryWithResults(
        """
        SELECT time, position, points, incomplete, event, type, competitor, rowid, events.name
        FROM results, events
        WHERE competitor=%s
            AND results.event=events.id
        ORDER BY events.date ASC
    """,
        (competitor,),
    )
    return list(map(resultToJSONwithEventName, result))


def getResultsForCompetitorNonDynamic(competitor):
    result = queryWithOneResult(
        """
        SELECT string_agg(results.points::text,';')
        FROM results, competitors
        WHERE results.competitor=competitors.rowid
            AND COALESCE(type,'') <> 'max'
            AND COALESCE(type,'') <> 'average'
            AND COALESCE(type,'') <> 'manual'
            AND COALESCE(type,'') <> 'hidden'
            AND competitors.rowid=%s
        GROUP BY competitors.rowid
    """,
        (competitor,),
    )
    return list(map(int, result[0].split(";")))


def getResultsByEvent(event):
    result = queryWithResults(
        """
        SELECT results.time, results.position, results.points, results.incomplete, results.event, results.type,
        competitors.name, competitors.ageClass, competitors.club, competitors.course, results.rowid
        FROM competitors, results
        WHERE results.competitor=competitors.rowid
            AND event=%s
            AND COALESCE(results.type,'') <> 'hidden'
        ORDER BY competitors.course ASC, results.position ASC
    """,
        (event,),
    )
    return list(map(fullResultToJSON, result))


def getResultsByEventForRecalc(event):
    result = queryWithResults(
        """
        SELECT results.rowid, results.time,  results.incomplete, competitors.course, results.type
        FROM competitors, results
        WHERE results.competitor=competitors.rowid
            AND event=%s
            AND COALESCE(type,'') <> 'manual'
            AND COALESCE(type,'') <> 'max'
            AND COALESCE(type,'') <> 'average'
            AND COALESCE(type,'') <> 'hidden'
        ORDER BY competitors.course ASC, results.time ASC
    """,
        (event,),
    )
    return list(map(recalcResultToJSON, result))


def getResultsForCourse(league, course):
    results = queryWithResults(
        """
        SELECT competitors.name, competitors.ageClass, competitors.club, array_agg(results.event),
         array_agg(results.points), array_agg(results.type)
        FROM competitors, results
        WHERE results.competitor=competitors.rowid
            AND competitors.course=%s
            AND competitors.league=%s
            AND COALESCE(results.type,'') <> 'hidden'
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


def getDynamicResults(league):
    result = queryWithResults(
        """
        SELECT time, position, points, incomplete, event, type, competitor, rowid
        FROM results, events
        WHERE results.type IS NOT NULL
            AND COALESCE(results.type,'') <> 'hidden'
            AND results.event=events.id
            AND events.league=%s
    """,
        (league,),
    )
    return list(map(resultToJSON, result))
