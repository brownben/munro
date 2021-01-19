from typing import List


def toInt(integer: str) -> int:
    if integer == "":
        return 0
    return int(integer)


def sortByTime(results: List[dict]) -> List[dict]:
    return sorted(results, key=lambda x: x["time"], reverse=True)


def sortByTotalPoints(results: List[dict]) -> List[dict]:
    return sorted(results, key=lambda x: x["totalPoints"], reverse=True)


def toSeconds(time: str) -> int:
    splitTime = time.split(":")

    if time == "" or len(splitTime) not in [2, 3]:
        return 0

    if len(splitTime) == 2:
        hours = 0
        minutes = int(splitTime[0])
        seconds = int(splitTime[1])
    else:
        hours = int(splitTime[0])
        minutes = int(splitTime[1])
        seconds = int(splitTime[2])

    return (hours * 3600) + (minutes * 60) + seconds
