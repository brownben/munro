import base64
from .sqlQuery import query, queryWithOneResult, queryWithResults


def eventToJSON(event):
    # Convert SQL Tuple to JSON
    if event:
        return {
            "id": event[0],
            "name": event[1],
            "date": event[2],
            "resultUploaded": event[3],
            "organiser": event[4],
            "moreInformation": event[5],
            "website": event[6],
            "results": event[7],
            "winsplits": event[8],
            "routegadget": event[9],
            "league": event[10],
        }
    else:
        return False


def eventToJSONWithUploadKey(event):
    # Convert SQL Tuple to JSON
    eventJSON = eventToJSON(event)
    if eventToJSON:
        return {
            **eventJSON,
            "uploadKey": event[11],
        }
    else:
        return False


def generateUploadKey():
    # Generate Random Upload Key
    random = os.urandom(15)
    string = str(base64.b64encode(random))
    return string[2:22]


# Event Database Functions


def createEvent(
    name,
    date,
    resultUploaded,
    organiser,
    moreInformation,
    website,
    results,
    winsplits,
    routegadget,
    league,
):
    eventId = (league + name + date).replace(" ", "")
    uploadKey = generateUploadKey()
    query(
        """
        INSERT INTO events (id,name,date,resultUploaded,organiser,moreInformation,
            website,results,winsplits,routegadget,league,uploadKey)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,
        (
            eventId,
            name,
            date,
            resultUploaded,
            organiser,
            moreInformation,
            website,
            results,
            winsplits,
            routegadget,
            league,
            uploadKey,
        ),
    )


def updateEvent(
    eventId,
    name,
    date,
    resultUploaded,
    organiser,
    moreInformation,
    website,
    results,
    winsplits,
    routegadget,
    league,
):
    newId = (league + name + date).replace(" ", "")
    query(
        """
        UPDATE events
        SET id=%s, name=%s, date=%s, resultUploaded=%s, organiser=%s, moreInformation=%s, website=%s, results=%s,winsplits=%s, routegadget=%s, league=%s
        WHERE id=%s
    """,
        (
            newId,
            name,
            date,
            resultUploaded,
            organiser,
            moreInformation,
            website,
            results,
            winsplits,
            routegadget,
            league,
            eventId,
        ),
    )


def setResultsUploaded(to, eventId):
    query(
        """
        UPDATE events
        SET resultUploaded=%s
        WHERE id=%s
    """,
        (to, eventId),
    )


def setResultsUploadedAndURLs(to, eventId, results, winsplits, routegadget):
    query(
        """
        UPDATE events
        SET resultUploaded=%s, results=%s, winsplits=%s, routegadget=%s
        WHERE id=%s
    """,
        (to, results, winsplits, routegadget, eventId),
    )


def deleteEvent(eventId):
    query("DELETE FROM events WHERE id=%s", (eventId,))


def findEvent(eventId):
    result = queryWithOneResult(
        """
        SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        WHERE id = %s
    """,
        (eventId,),
    )
    return eventToJSON(result)


def getEventsOfLeague(name):
    result = queryWithResults(
        """
        SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        WHERE league = %s
        ORDER BY date ASC
    """,
        (name,),
    )
    return list(map(eventToJSON, result))


def getEventUploadKey(eventId):
    result = queryWithOneResult(
        """
        SELECT uploadKey
        FROM events
        WHERE id = %s
    """,
        (eventId,),
    )
    return result[0]


def getEventWithUploadKey(eventId):
    result = queryWithOneResult(
        """
        SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,
           winsplits,routegadget,league,uploadKey
        FROM events
        WHERE id = %s
    """,
        (eventId,),
    )
    return eventToJSONWithUploadKey(result)


def getAllEvents():
    result = queryWithResults(
        """
        SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        ORDER BY date ASC"""
    )
    return list(map(eventToJSON, result))


def getAllEventsWithUploadKey():
    result = queryWithResults(
        """
        SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey
        FROM events
        ORDER BY date ASC'
    """
    )
    return list(map(eventToJSONWithUploadKey, result))


def getEventsOfLeagueWithUploadKey(name):
    result = queryWithResults(
        """
        SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey
        FROM events
        WHERE league = %s
        ORDER BY date ASC
    """,
        (name,),
    )
    return list(map(eventToJSONWithUploadKey, result))


def getLatestEventsWithResults():
    result = queryWithResults(
        """
        SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        WHERE resultUploaded = true
        ORDER BY date DESC
        LIMIT 12
    """
    )
    return list(map(eventToJSON, result))


def deleteAllEvents():
    query("DELETE FROM events")

