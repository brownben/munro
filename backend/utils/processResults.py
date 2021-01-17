from heapq import nlargest
from typing import List


def assignPosition(results: List[dict]):
    """ Assign 1st, 2nd, 3rd, etc based off total points """

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


def getIndexOfLargestNPoints(points: List[int], number: int):
    return nlargest(number, range(len(points)), points.__getitem__)
