from typing import List


def toInt(integer):
    if integer == "":
        return 0
    return int(integer)


def sortByTime(results: List[dict]) -> List[dict]:
    return sorted(results, key=lambda x: x["time"], reverse=True)


def sortByTotalPoints(results: List[dict]) -> List[dict]:
    return sorted(results, key=lambda x: x["totalPoints"], reverse=True)
