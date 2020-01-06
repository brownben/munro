from collections import defaultdict
import statistics


def assignPoints(data, leagueScoringMethod):
    # Choses which points algorithm to use
    if leagueScoringMethod == "position99average":
        return positionBasedPoints99WithDraw(data)
    elif "position" in leagueScoringMethod:
        return assignPointsPosition(data, leagueScoringMethod)
    elif "timeAverage" in leagueScoringMethod:
        return assignPointsTimeAverage(data, leagueScoringMethod)
    else:
        return False


def assignPointsPosition(data, leagueScoringMethod):
    multiplier = 1
    startValue = 101

    if "Double" in leagueScoringMethod:
        multiplier = 2
    if "50" in leagueScoringMethod:
        startValue = 51
    if "99" in leagueScoringMethod:
        startValue = 100

    return positionBasedPoints(data, startValue, multiplier)


def assignPointsTimeAverage(data, leagueScoringMethod):
    if leagueScoringMethod == "timeAverage":
        return timeFromAveragePoints(data)
    elif leagueScoringMethod == "timeAverage100":
        return timeFromAveragePoints(data, 100, 20)
    else:
        return False


def positionBasedPoints(data, startValue=101, multiplier=1):
    # Assign points 100 for 1st, 99 for 2nd etc - 0 for incomplete course
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if validResult(result):
            resultWithPoints["points"] = (startValue * multiplier) - (
                result["position"] * multiplier
            )

        else:
            resultWithPoints["points"] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def positionBasedPoints99WithDraw(data):
    # Assign points 99 for 1st, 98 for 2nd etc - 0 for incomplete course - Average of Poitns for Draw
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        if validResult(result):
            positionOccurances = countOccuracesOfPosition(
                data, result["position"]
            )
            points = 100 - result["position"]
            resultWithPoints["points"] = (
                points + (points - positionOccurances) + 1
            ) / 2
        else:
            resultWithPoints["points"] = 0

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def validResult(result):
    return (
        isinstance(result["position"], int)
        and result["position"] > 0
        and not result["incomplete"]
    )


def timeFromAveragePoints(
    data, averagePoints=1000, standardDeviationPoints=200
):
    courseStats = calculateCourseAverage(data)
    dataWithPoints = []

    for result in data:
        resultWithPoints = result

        resultWithPoints["points"] = timeFromAverageCalculatePoints(
            result,
            courseStats[result["course"]],
            averagePoints,
            standardDeviationPoints,
        )

        dataWithPoints.append(resultWithPoints)

    return dataWithPoints


def timeFromAverageCalculatePoints(
    result, courseStats, averagePoints, standardDeviationPoints
):
    average = courseStats["average"]
    standardDeviation = courseStats["standardDeviation"]

    if isinstance(result["time"], int) or result["incomplete"]:
        return 0
    else:
        points = averagePoints + standardDeviationPoints * (
            (average - result["time"]) / standardDeviation
        )

        if points < 0:
            points = 0

        return round(points)


def calculateCourseAverage(data):
    courseTimes = defaultdict(list)
    for result in data:
        if isinstance(result["time"], int) and not result["incomplete"]:
            courseTimes[result["course"]].append(result["time"])

    courseStats = {}
    for course, timesList in courseTimes:
        courseStats[course] = {
            "average": statistics.mean(timesList),
            "standardDeviation": statistics.stdev(timesList),
        }

    return courseStats


def countOccuracesOfPosition(data, position):
    return len([1 for row in data if row["position"] == position])


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
            biggest.append(
                pointsArray.index(sortedPoints[counter], lastLocation + 1)
            )

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
    return sum([toInt(points[point]) for point in pointsList])


def assignPosition(results):
    # Assign 1st, 2nd, 3rd, etc based off total points
    lastPosition = 0
    position = 0
    lastPoints = -1
    for result in results:
        if result["totalPoints"] == lastPoints:
            result["position"] = lastPosition
            position += 1
        else:
            position += 1
            lastPosition = position
            result["position"] = position

        lastPoints = result["totalPoints"]

    return results


def toInt(integer):
    if integer == "":
        return 0

    return int(integer)
