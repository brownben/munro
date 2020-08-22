from .helpers import *


def biggestPoints(points, number):
    # Finds the x greatest values in the list and returns their index
    # If less than number just return the array
    if len(points) == 0:
        return []
    elif len(points) <= number:
        return list(range(len(points)))
    else:
        return findBiggestPoints(points, number)


def findBiggestPoints(points, number):
    biggest = []
    pointsArray = [toInt(item) for item in points]

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
                sortedPoints[counter], pointsArray, biggest
            )
            biggest.append(pointsArray.index(sortedPoints[counter], lastLocation + 1))

    return biggest
