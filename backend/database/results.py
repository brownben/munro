# Hack to Allow Import from parent Folder (For Sort Functions)
import os, sys, inspect
currentDir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
del sys.path[0]
sys.path.insert(0, os.path.dirname(currentDir))

import sqlite3
from functools import reduce

from . import events, leagues
import sortFunctions
import pointsFunctions


def resultToJSON(result):
    # Generate Random Upload Key
    if (result):
        return {
            'time': result[0],
            'position': result[1],
            'points': result[2],
            'incomplete': result[3],
            'event': result[4],
            'competitor': result[5]
        }
    else:
        return False


def getPointsForEvent(results, eventId):
    # Find Event matching the ID
    filteredPoints = filter(lambda event: event['event'] == eventId, results)
    filteredPoints = list(filteredPoints)
    # If found return event
    if len(filteredPoints) != 0:
        return filteredPoints[0]['points']
    else:
        return ''


def courseResultToJSON(result, league):
    # Get all required fields from other parts of the database
    currentLeague = leagues.findLeague(league)
    eventsList = events.getEventsOfLeague(league)

    # If all that data is found return success
    if currentLeague and eventsList:
        # Get number of events to count in league
        numberOfCountingEvents = currentLeague['numberOfCountingEvents']
        # Get events with results uploaded
        eventsWithResults = filter(
            lambda event: event['resultUploaded'], eventsList)

        # Split Points and events from database string
        # Place in record for each event
        eventList = result[3].split(';')
        pointsList = result[4].split(';')
        eventsByCompetitor = []
        for event in range(len(result[3].split(';'))):
            eventsByCompetitor.append({
                'event': eventList[event],
                'points': int(pointsList[event])
            })
        # Get points for each event in order
        points = []
        for event in eventsWithResults:
            points.append(getPointsForEvent(eventsByCompetitor, event['id']))

        # Calculate the total and which scores make this
        largestPoints = pointsFunctions.biggestPoints(points, numberOfCountingEvents)
        totalPoints = pointsFunctions.calculateTotal(largestPoints, points)

        # Change to object rather than tuple
        if (result):
            return {
                'name': result[0],
                'ageClass': result[1],
                'club': result[2],
                'points': points,
                'totalPoints': totalPoints,
                'largestPoints': largestPoints
            }
        else:
            return False
    else:
        return False


# Set Up Database
connection = sqlite3.connect('./databaseFiles/2.db')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS results (
        time NUMBER NOT NULL,
        position NUMBER,
        points NUMBER NOT NULL,
        incomplete TEXT,
        event TEXT NOT NULL,
        competitor NUMBER  NOT NULL,
        FOREIGN KEY(event) REFERENCES events(id),
        FOREIGN KEY(competitor) REFERENCES competitors(rowid)
    )''')
connection.commit()
connection.close()

# Competitor Database Functions


def createResult(time, position, points, incomplete, event, competitor):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO results (time, position, points, incomplete, event, competitor) VALUES (?,?,?,?,?,?)',
                   (time, position, points, incomplete, event, competitor))
    connection.commit()
    connection.close()


def updateResult(rowid, time, position, points, incomplete, event, competitor):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE results
        SET time=?, position=?, points=?, incomplete=?, event=?, competitor=?
        WHERE rowid=?''', (time, position, points, incomplete, event, competitor, rowid))
    connection.commit()
    connection.close()


def deleteResult(rowid):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM results WHERE rowid=?', (rowid,))
    connection.commit()
    connection.close()


def deleteAllResults():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM results')
    connection.commit()
    connection.close()


def deleteResultsByEvent(event):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM results WHERE event=?', (event,))
    connection.commit()
    connection.close()


def deleteResultsByCompetitor(competitor):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM results WHERE competitor=?', (competitor,))
    connection.commit()
    connection.close()


def findResults(rowid):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT time, position, points incomplete, event, competitor
        FROM results
        WHERE rowid=?''', (rowid,)).fetchone()
    connection.close()
    return resultToJSON(result)


def getAllResults():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT time, position,points, incomplete, event, competitor
        FROM results''').fetchall()
    connection.close()
    return list(map(resultToJSON, result))


def getResultsByCompetitor(competitor):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT time, position, points, incomplete, event, competitor
        FROM results
        WHERE competitor=?''', (competitor,)).fetchall()
    connection.close()
    return list(map(resultToJSON, result))


def getResultsByEvent(competitor):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT time, position, points, incomplete, event, competitor
        FROM results
        WHERE event=?''', (event,)).fetchall()
    connection.close()
    return list(map(resultToJSON, result))


def getResultsForCourse(league, course):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    results = cursor.execute('''
        SELECT competitors.name, competitors.ageClass, competitors.club,  GROUP_CONCAT(results.event,';'), GROUP_CONCAT(results.points,';')
        FROM competitors, results
        WHERE results.competitor=competitors.rowid AND competitors.course=? AND competitors.league=?
        GROUP BY competitors.rowid
        ''', (course, league)).fetchall()
    connection.close()
    resultsList = []
    for result in list(results):
        resultsList.append(courseResultToJSON(result, league))

    # Return results sorted with positions assigned
    sortedResults = sortFunctions.quickSortObjectsByProperty(resultsList, 'totalPoints')[::-1]
    return pointsFunctions.assignPosition(sortedResults)
