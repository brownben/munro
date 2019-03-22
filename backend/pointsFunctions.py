import sortFunctions


def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if leagueScoringMethod == 'position':
        return positionBasedPoints(data)
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
        sortedPoints = sortFunctions.quickSort(points)[::-1]
        for counter in range(number):
            # Find index of the x largest item
            firstIndexOfValue = points.index(sortedPoints[counter])
            # If equal value is not in biggest array add it

            if firstIndexOfValue not in biggest:
                biggest.append(firstIndexOfValue)
            else:
                # Else find the location of the values next occurance, by finding number of occurances of this value in the biggest array, then find the index of the (old number of occurances + 1)th occurance of this value
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
    lastPoints = -1
    for result in results:
        if result['totalPoints'] == lastPoints:
            result['position'] = position
        else:
            position += 1
            result['position'] = position

        lastPoints = result['totalPoints']

    return results
