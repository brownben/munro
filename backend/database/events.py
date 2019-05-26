import base64
import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']


def eventToJSON(event):
    # Convert SQL Tuple to JSON
    if (event):
        return {
            'id': event[0],
            'name': event[1],
            'date': event[2],
            'resultUploaded': event[3],
            'organiser': event[4],
            'moreInformation': event[5],
            'website': event[6],
            'results': event[7],
            'winsplits': event[8],
            'routegadget': event[9],
            'league': event[10]
        }
    else:
        return False


def eventToJSONWithUploadKey(event):
    # Convert SQL Tuple to JSON
    if (event):
        return {
            'id': event[0],
            'name': event[1],
            'date': event[2],
            'resultUploaded': event[3],
            'organiser': event[4],
            'moreInformation': event[5],
            'website': event[6],
            'results': event[7],
            'winsplits': event[8],
            'routegadget': event[9],
            'league': event[10],
            'uploadKey': event[11]
        }
    else:
        return False


def generateUploadKey():
    # Generate Random Upload Key
    random = os.urandom(15)
    string = str(base64.b64encode(random))
    return string[2:22]


# Event Database Functions


def createEvent(name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league):
    id = (league+name+date).replace(" ", "")
    uploadKey = generateUploadKey()
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO events (id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league,uploadKey) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)',
                   (id, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league, uploadKey))
    connection.commit()
    connection.close()


def updateEvent(id, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league):
    newId = (league+name+date).replace(" ", "")
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE events
        SET id=%s, name=%s, date=%s, resultUploaded=%s, organiser=%s, moreInformation=%s, website=%s, results=%s,winsplits=%s, routegadget=%s, league=%s
        WHERE id=%s''', (newId, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league, id))
    connection.commit()
    connection.close()


def setResultsUploaded(to, id):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE events
        SET resultUploaded=%s
        WHERE id=%s''', (to, id))
    connection.commit()
    connection.close()

def setResultsUploadedAndURLs(to, id, results, winsplits, routegadget):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE events
        SET resultUploaded=%s, results=%s, winsplits=%s, routegadget=%s
        WHERE id=%s''', (to, results, winsplits, routegadget, id))
    connection.commit()
    connection.close()


def deleteEvent(id):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM events WHERE id=%s', (id,))
    connection.commit()
    connection.close()


def findEvent(id):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league FROM events WHERE id = %s', (id,))
    result = cursor.fetchone()
    connection.close()
    return eventToJSON(result)


def getEventsOfLeague(name):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
    SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
    FROM events
    WHERE league = %s
    ORDER BY date ASC''', (name,))
    result = cursor.fetchall()
    connection.close()
    return list(map(eventToJSON, result))


def getEventUploadKey(id):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT uploadKey FROM events WHERE id = %s', (id,))
    result = cursor.fetchone()
    connection.close()
    return result[0]


def getEventWithUploadKey(id):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league,uploadKey FROM events WHERE id = %s', (id,))
    result = cursor.fetchone()
    connection.close()
    return eventToJSONWithUploadKey(result)


def getAllEvents():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        ORDER BY date ASC''')
    result = cursor.fetchall()
    connection.close()
    return list(map(eventToJSON, result))


def getAllEventsWithUploadKey():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(
        'SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey FROM events ORDER BY date ASC')
    result = cursor.fetchall()
    connection.close()
    return list(map(eventToJSONWithUploadKey, result))


def getEventsOfLeagueWithUploadKey(name):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
    SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey
    FROM events
    WHERE league = %s
    ORDER BY date ASC''', (name,))
    result = cursor.fetchall()
    connection.close()
    return list(map(eventToJSONWithUploadKey, result))

def getLatestEventsWithResults():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
    SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
    FROM events
    WHERE resultUploaded = true
    ORDER BY date DESC
    LIMIT 12''')
    result = cursor.fetchall()
    connection.close()
    return list(map(eventToJSON, result))

def deleteAllEvents():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM events')
    connection.commit()
    connection.close()
