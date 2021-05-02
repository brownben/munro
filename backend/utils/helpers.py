from typing import List, Dict, Any

from ..database.event import Event
from ..database.league import League

ResultDict = Dict[str, Any]


def toInt(integer: str) -> int:
    if integer == "":
        return 0
    return int(integer)


def sortByTime(results: List[ResultDict]) -> List[ResultDict]:
    return sorted(results, key=lambda x: x["time"], reverse=True)


def sortByTotalPoints(results: List[ResultDict]) -> List[ResultDict]:
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


def processSimpleResult(
    result: str, event: Event, course: str, league: League
) -> Dict[str, Any]:
    splitResult = result.split(",")
    return {
        "type": course + splitResult[1],
        "name": splitResult[0],
        "time": toSeconds(splitResult[2]),
        "incomplete": splitResult[3].upper() != "OK",
        "ageClass": "",
        "club": "",
        "position": "",
        "points": 0,
        "course": course if len(splitResult) == 4 else splitResult[4],
        "event": event.id,
        "league": league.getLeagueOfCompetitors(),
    }
