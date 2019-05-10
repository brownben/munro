def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if leagueScoringMethod == 'position':
        return positionBasedPoints(data)
    elif leagueScoringMethod == 'position50':
        return positionBasedPointsFifty(data)
    elif leagueScoringMethod == 'position99':
        return positionBasedPoints99(data)
    elif leagueScoringMethod == 'position99average':
        return positionBasedPoints99WithDraw(data)
    else:
        return False


def positionBasedPoints(data):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if type(result['position']) == type(1) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 101 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPointsFifty(data):
    # Assign points 50 for 1st, 49 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if type(result['position']) == type(1) and result['position'] > 0 and not result['incomplete']:
            resultWithPoints['points'] = 51 - result['position']

        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints

def positionBasedPoints99(data):
    # Assign points 50 for 1st, 49 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if type(result['position']) == type(1) and result['position'] > 0 and not result['incomplete']:
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

        if type(result['position']) == type(1) and result['position'] > 0 and not result['incomplete']:
            positionOccurances = countOccuracesOfPosition (data, result['position'])
            if positionOccurances == 1:
                resultWithPoints['points'] = 100 - result['position']
            else:
                points = 0
                for points in range(positionOccurances):
                    points += 100 - result['position'] - points
                resultWithPoints['points'] = points / positionOccurances
        else:
            resultWithPoints['points'] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints

def countOccuracesOfPosition (data, position):
    occurances = 0

    for row in data:
        if(row['position'] == position):
            occurances += 1

    return occurances
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
                lastLocation = positionOfLastOccurance(sortedPoints[counter], pointsArray, biggest)
                biggest.append(pointsArray.index(sortedPoints[counter], lastLocation + 1))

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
    return index


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
