import sqlite3
from . import events, leagues
from functools import reduce

def resultToJSON(result):
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

def quickSort(array):
    if len(array) > 1:
        pivot = len(array) - 1
        smallArray = []
        bigArray = []
        for item in range(len(array) - 1):
            if str(array[item]) <= str(array[pivot]):
                smallArray.append(array[item])
            else:
                bigArray.append(array[item])
        return quickSort(smallArray) + [array[pivot]] + quickSort(bigArray)
    else:
        return array

def getPointsForEvent(result, eventId):
    filteredPoints = filter(lambda event: event['event'] == eventId, result)
    filteredPoints = list(filteredPoints)
    if len(filteredPoints) != 0:
        return filteredPoints[0]['points']
    else:
        return ''

def biggestPoints(points, number):
    if len(points) <= number:
        return range(len(points))
    else:
        biggest = []
        sortedPoints = quickSort(points)[::-1]
        for counter in range(number):
            firstIndexOfValue = points.index(sortedPoints[counter])
            if firstIndexOfValue not in biggest:
                biggest.append(firstIndexOfValue)
            else:
                numberOfOccurances = 1
                if len(biggest) != 1:
                    numberOfOccurances = reduce((lambda count, currentValue: count + (points[currentValue] == sortedPoints[counter])), biggest, 0)
                biggest.append(points.index(sortedPoints[counter], numberOfOccurances))
        return biggest

def calculateTotal(pointsList, points):
    totalPoints = 0
    for point in pointsList:
        totalPoints += points[point]
    return totalPoints

def assignPosition(results):
    position = 0
    lastPoints = 0
    for result in results:
        if result['totalPoints'] == lastPoints:
            result['position'] = position
        else:
          position += 1
          result['position'] = position

        lastPoints = result['totalPoints']

    return results

def courseResultToJSON(result, league):
    currentLeague = leagues.findLeague(league)
    eventsList = events.getEventsOfLeague(league)

    if currentLeague and eventsList:
        numberOfCountingEvents = currentLeague['numberOfCountingEvents']
        eventsWithResults = filter(lambda event: event['resultUploaded'], eventsList)

        eventList = result[3].split(';')
        pointsList = result[4].split(';')
        eventsByCompetitor = []
        for event in range(len(result[3].split(';'))):
            eventsByCompetitor.append({
                'event': eventList[event],
                'points': int(pointsList[event])
            })

        points = []
        for event in eventsWithResults:
            points.append(getPointsForEvent(eventsByCompetitor, event['id']))

        largestPoints = biggestPoints(points, numberOfCountingEvents)
        totalPoints = calculateTotal(largestPoints, points)

        if (result):
            return {
                'name': result[0],
                'ageClass': result[1],
                'club': result[2],
                'points': points,
                'totalPoints':totalPoints,
                'largestPoints':largestPoints
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
    result = cursor.execute('''
        SELECT competitors.name, competitors.ageClass, competitors.club,  GROUP_CONCAT(results.event,';'), GROUP_CONCAT(results.points,';')
        FROM competitors, results
        WHERE results.competitor=competitors.rowid AND competitors.course=? AND competitors.league=?
        GROUP BY competitors.rowid
        ''', (course, league)).fetchall()
    connection.close()
    resultsList = []
    for result in list(result):
        resultsList.append(courseResultToJSON(result, league))

    return assignPosition(sorted(resultsList, key = lambda result: result['totalPoints'], reverse=True))
