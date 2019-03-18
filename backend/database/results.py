import sqlite3
from functools import reduce

from . import events, leagues


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


def quickSort(array):
    # Check if length 1, as at length 1 the array is sorted
    if len(array) > 1:
        # Set pivot value
        pivot = len(array) - 1
        smallArray = []
        bigArray = []
        # Compare to pivot then place in relevant array
        for item in range(len(array) - 1):
            if int(array[item]) <= int(array[pivot]):
                smallArray.append(array[item])
            else:
                bigArray.append(array[item])
        # Combine the two lists and quicksort each to ensure sort
        return quickSort(smallArray) + [array[pivot]] + quickSort(bigArray)
    else:
        return array


def getPointsForEvent(result, eventId):
    # Find Event matching the ID
    filteredPoints = filter(lambda event: event['event'] == eventId, result)
    filteredPoints = list(filteredPoints)
    # If found return event
    if len(filteredPoints) != 0:
        return filteredPoints[0]['points']
    else:
        return ''


def biggestPoints(points, number):
    # Finds the x greatest values in the list and returns their index
    # If less than number just return the array
    if len(points) == 0:
        return []
    elif len(points) <= number:
        return list(range(len(points)))
    else:
        biggest = []
        # Sort list then reverse it to have it descending
        sortedPoints = quickSort(points)[::-1]
        for counter in range(number):
            # Find index of the x largest item
            firstIndexOfValue = points.index(sortedPoints[counter])
            # If equal value is not in biggesst array add it

            if firstIndexOfValue not in biggest:
                biggest.append(firstIndexOfValue)
            else:
                # Else find the location of the values next occurance, by finding number of occurances of this value in the biggest array, then find the index of the (old number of occurances + 1)th occurance of this value
                numberOfOccurances = 0
                if len(biggest) > 0:
                    numberOfOccurances = countOccurancesFromArrayOfIndexes(
                        sortedPoints[counter], sortedPoints, biggest)
                biggest.append(points.index(
                    sortedPoints[counter], numberOfOccurances))
        return biggest


def countOccurancesFromArrayOfIndexes(searchItem, array, arrayOfIndexes):
    occurances = 0
    for item in arrayOfIndexes:
        if searchItem == array[item]:
            occurances += 1
    return occurances


def calculateTotal(pointsList, points):
    # Sum all points in array
    totalPoints = 0
    for point in pointsList:
        if points[point] != '':
            totalPoints += int(points[point])
    return totalPoints


def assignPosition(results):
    # Assign 1st, 2nd, 3rd, etc based off total points
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
        largestPoints = biggestPoints(points, numberOfCountingEvents)
        totalPoints = calculateTotal(largestPoints, points)

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
    return assignPosition(sorted(resultsList, key=lambda result: result['totalPoints'], reverse=True))
