from collections import defaultdict
import statistics


def toInt(integer):
    if integer == "":
        return 0
    return int(integer)


def validResult(result):
    return (
        type(result["position"]) == int
        and result["position"] > 0
        and not result["incomplete"]
    )


def calculateTotal(pointsList, points):
    # Sum all points selected in an array
    return sum([toInt(points[point]) for point in pointsList])


def countOccuracesOfPosition(data, position):
    return len([1 for row in data if row["position"] == position])


def countOccurancesFromArrayOfIndexes(searchItem, array, arrayOfIndexes):
    occurances = 0
    for item in arrayOfIndexes:
        if searchItem == array[item]:
            occurances += 1
    return occurances


def positionOfLastOccurance(searchItem, array, arrayOfIndexes):
    location = -1
    for index in arrayOfIndexes:
        if array[index] == searchItem:
            location = index
    return location


def calculateCourseAverage(data):
    courseTimes = defaultdict(list)
    for result in data:
        if validResult(result):
            courseTimes[result["course"]].append(result["time"])

    courseStats = {}

    for course, timesList in courseTimes.items():
        try:
            standardDeviation = statistics.stdev(timesList)
        except:
            standardDeviation = 0

        courseStats[course] = {
            "average": statistics.mean(timesList),
            "standardDeviation": standardDeviation,
        }

    return courseStats
