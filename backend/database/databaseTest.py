from functools import reduce
def biggestPoints(points, number):
    print(points)
    if len(points) <= number:
        return range(len(points))
    else:
        biggest = []
        sortedPoints = points.copy()
        sortedPoints.sort(reverse = True)
        for counter in range(number):
            print(sortedPoints, type(sortedPoints))
            firstIndexOfValue = points.index(sortedPoints[counter])
            if firstIndexOfValue not in biggest:
                biggest.append(firstIndexOfValue)
            else:
                numberOfOccurances = 1
                if len(biggest) != 1:
                    numberOfOccurances = reduce((lambda count, currentValue: count + (points[currentValue] == sortedPoints[counter])), biggest, 0)
                biggest.append(points.index(sortedPoints[counter], numberOfOccurances))
        return biggest

print(biggestPoints([3,2,3,5],3))
