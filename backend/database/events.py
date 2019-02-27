import base64
import os
import sqlite3


def eventToJSON(event):
    # Convert SQL Tuple to JSON
    if (event):
        return {
            'id': event[0],
            'name': event[1],
            'date': event[2],
            'resultUploaded': event[3] == 'True',
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
            'resultUploaded': event[3] == 'True',
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


# Set Up Database
connection = sqlite3.connect('./databaseFiles/2.db')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS events (
        id TEXT NOT NULL,
        name TEXT NOT NULL,
        date TEXT,
        resultUploaded BOOLEAN,
        organiser TEXT,
        moreInformation TEXT,
        website TEXT,
        results TEXT,
        winsplits TEXT,
        routegadget TEXT,
        league TEXT NOT NULL,
        uploadKey TEXT,
        PRIMARY KEY (id),
        UNIQUE (id),
        FOREIGN KEY(league) REFERENCES leagues(name))''')
connection.commit()
connection.close()

# Event Database Functions


def createEvent(name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league):
    id = (league+name+date).replace(" ", "")
    uploadKey = generateUploadKey()
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO events (id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league,uploadKey) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                   (id, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league, uploadKey))
    connection.commit()
    connection.close()


def updateEvent(id, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league):
    newId = (league+name+date).replace(" ", "")
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE events
        SET id=?, name=?, date=?, resultUploaded=?, organiser=?, moreInformation=?, website=?, results=?,winsplits=?, routegadget=?, league=?
        WHERE id=?''', (newId, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, league, id))
    connection.commit()
    connection.close()


def deleteEvent(id):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM events WHERE id=?', (id,))
    connection.commit()
    connection.close()


def findEvent(id):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league FROM events WHERE id = ?', (id,)).fetchone()
    connection.close()
    return eventToJSON(result)


def getEventsOfLeague(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
    SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
    FROM events
    WHERE league = ?
    ORDER BY date ASC''', (name,)).fetchall()
    connection.close()
    return list(map(eventToJSON, result))


def getEventUploadKey(id):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT uploadKey FROM events WHERE id = ?', (id,)).fetchone()
    connection.close()
    return result[0]


def getEventWithUploadKey(id):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league,uploadKey FROM events WHERE id = ?', (id,)).fetchone()
    connection.close()
    return eventToJSONWithUploadKey(result)


def getAllEvents():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league
        FROM events
        ORDER BY date ASC''').fetchall()
    connection.close()
    return list(map(eventToJSON, result))


def getAllEventsWithUploadKey():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT id,name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey FROM events ORDER BY date ASC').fetchall()
    connection.close()
    return list(map(eventToJSONWithUploadKey, result))


def getEventsOfLeagueWithUploadKey(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
    SELECT id, name,date,resultUploaded,organiser,moreInformation,website,results,winsplits,routegadget,league, uploadKey
    FROM events
    WHERE league = ?
    ORDER BY date ASC''', (name,)).fetchall()
    connection.close()
    return list(map(eventToJSONWithUploadKey, result))


def deleteAllEvents():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM events')
    connection.commit()
    connection.close()
