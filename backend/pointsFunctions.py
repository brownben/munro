from collections import defaultdict
import statistics


def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if leagueScoringMethod == 'position':
        return positionBasedPoints(data)
    elif leagueScoringMethod == 'positionDouble':
        return positionBasedPointsDouble(data)
    elif leagueScoringMethod == 'position50':
        return positionBasedPointsFifty(data)
    elif leagueScoringMethod == 'position50Double':
        return positionBasedPointsFiftyDouble(data)
    elif leagueScoringMethod == 'position99':
        return positionBasedPoints99(data)
    elif leagueScoringMethod == 'position99average':
        return positionBasedPoints99WithDraw(data)
    elif leagueScoringMethod == 'timeAverage':
        return timeFromAveragePoints(data)
    elif leagueScoringMethod == 'timeAverage100':
        return timeFromAveragePointsHundred(data)
    else:
        return False


def positionBasedPoints(data):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance(result['position'],int) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 101 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPointsDouble(data):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance(result['position'], int) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 202 - (result['position'] * 2)

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPointsFifty(data):
    # Assign points 50 for 1st, 49 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance(result['position'], int) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 51 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPointsFiftyDouble(data):
    # Assign points 50 for 1st, 49 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance(result['position'], int) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 102 - (result['position'] * 2)

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPoints99(data):
    # Assign points 50 for 1st, 49 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance(result['position'], int) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 100 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPoints99WithDraw(data):
    # Assign points 99 for 1st, 98 for 2nd etc - 0 for incomplete course - Average of Poitns for Draw
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance((result['position'], int) and result['position'] > 0 and not result['incomplete']:
            positionOccurances = countOccuracesOfPosition(
                data, result['position'])
            points = (100 - result['position'])
            if positionOccurances == 1:
                resultWithPoints['points'] = points
            else:
                resultWithPoints['points'] = (
                    points + (points - positionOccurances))/2
        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def timeFromAveragePoints(data):
    times = [result['time'] for result in data if isinstance(
        result['time'], int) and not result['incomplete']]
    print(times)
    standardDeviation = statistics.stdev(times)
    average = statistics.mean(times)
    print('Standard Dev', standardDeviation)
    print('Average', average)
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if isinstance((result['time'], int) or result['incomplete']:
            resultWithPoints['points'] = 0
        else:
            points = 1000 + 200 * \
                ((average - result['time'])/standardDeviation)
            if (points < 0):
                points = 0
            resultWithPoints['points'] = round(points)

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def timeFromAveragePointsHundred(data):
    courseStats = calculateCourseAverage(data)
    dataWithPoints = []

    for result in data:
        average = courseStats[result['course']]['average']
        standardDeviation = courseStats[result['course']]['standardDeviation']
        resultWithPoints = result

        if isinstance((result['time'], int) or result['incomplete']:
            resultWithPoints['points'] = 0
        else:
            points = 100 + 20 * ((average - result['time'])/standardDeviation)

            if (points < 0):
                points = 0

            resultWithPoints['points'] = round(points)

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def calculateCourseAverage(data):
    courseTimes = defaultdict(list)
    for result in data:
        if isinstance(result['time'], int) and not result['incomplete']:
            courseTimes[result['course']].append(result['time'])

    courseStats = {}
    for course, timesList in courseTimes:
        courseStats[course] = {
            'average': statistics.mean(timesList),
            'standardDeviation': statistics.stdev(timesList),
        }

    return courseStats


def countOccuracesOfPosition(data, position):
    return len([1 for row in data if row['position'] == position])


def biggestPoints(points, number):
    # Finds the x greatest values in the list and returns their index
    # If less than number just return the array
    if len(points) == 0:
        return []
    elif len(points) <= number:
        return list(range(len(points)))
    else:
        biggest = []
        pointsArray = []
        for item in points:
            if item != '':
                pointsArray.append(int(item))
            else:
                pointsArray.append(0)

        # Sort list then reverse it to have it descending
        sortedPoints = sorted(pointsArray, reverse=True)
        for counter in range(number):
            # Find index of the x largest item
            firstIndexOfValue = pointsArray.index(sortedPoints[counter])
            # If equal value is not in biggest array add it

            if firstIndexOfValue not in biggest:
                biggest.append(firstIndexOfValue)

            else:
                # Else find the the last location of the value and look for the next occurance after that, append the index of that item to biggest
                lastLocation = positionOfLastOccurance(
                    sortedPoints[counter], pointsArray, biggest)
                biggest.append(pointsArray.index(
                    sortedPoints[counter], lastLocation + 1))

        return biggest


def countOccurancesFromArrayOfIndexes(searchItem, array, arrayOfIndexes):
    occurances = 0
    for item in arrayOfIndexes:
        if searchItem == array[item]:
            occurances += 1
    return occurances


def positionOfLastOccurance(searchItem, array, arrayOfIndexes):
    location = 0
    for index in arrayOfIndexes:
        if array[index] == searchItem:
            location = index
    return location


def calculateTotal(pointsList, points):
    # Sum all points in array
    totalPoints = 0
    for point in pointsList:
        if points[point] != '':
            totalPoints += int(points[point])
    return totalPoints


def assignPosition(results):
    # Assign 1st, 2nd, 3rd, etc based off total points
    lastPosition = 0
    position = 0
    lastPoints = -1
    for result in results:
        if result['totalPoints'] == lastPoints:
            result['position'] = lastPosition
            position += 1
        else:
            position += 1
            lastPosition = position
            result['position'] = position

        lastPoints = result['totalPoints']

    return results
