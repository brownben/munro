from typing import List, Tuple, Union

from .event import Event
from .league import League
from .database import queryWithResults
from ..utils.helpers import toInt
from ..utils.processResults import getIndexOfLargestNPoints


properties = ["id", "name", "ageClass", "club", "events", "points", "types", "course"]


class LeagueResult:
    id: int
    name: str
    ageClass: str
    club: str
    events: List[str]
    points: List[int]
    types: List[str]
    course: str

    def __init__(self, result: Union[dict, list]):
        for (index, value) in enumerate(result):
            setattr(self, properties[index], value)
        if not hasattr(self, "course"):
            self.course = None

    def toDictionary(self, league: League, events: List[Event]):
        numberOfCountingEvents = league.numberOfCountingEvents
        largestPoints = getIndexOfLargestNPoints(self.points, numberOfCountingEvents)
        pointsTotal = sum([toInt(self.points[point]) for point in largestPoints])

        results = [
            (
                {
                    "event": event.id,
                    "score": float(self.points[self.events.index(event.id)]),
                    "type": self.types[self.events.index(event.id)],
                    "counting": self.events.index(event.id) in largestPoints,
                }
                if event.id in self.events
                else None
            )
            for event in events
        ]

        return {
            "id": self.id,
            "name": self.name,
            "ageClass": self.ageClass,
            "club": self.club,
            "totalPoints": pointsTotal,
            "points": results,
            "course": self.course,
        }

    @staticmethod
    def getByLeague(leagueName: str):
        databaseResults = queryWithResults(
            """
            SELECT
                competitors.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                array_agg(results.event),
                array_agg(results.points),
                array_agg(results.type),
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND competitors.league=%s
                AND COALESCE(results.type, '') <> 'hidden'
            GROUP BY competitors.rowid
            """,
            (leagueName,),
        )

        return [LeagueResult(result) for result in databaseResults]

    @staticmethod
    def getByCourse(leagueName: str, course: str):
        databaseResults = queryWithResults(
            """
            SELECT
                competitors.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                array_agg(results.event),
                array_agg(results.points),
                array_agg(results.type)
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND competitors.league=%s
                AND (competitors.course=%s OR results.course=%s)
                AND COALESCE(results.type, '') <> 'hidden'
            GROUP BY competitors.rowid
            """,
            (leagueName, course, course),
        )

        return [LeagueResult(result) for result in databaseResults]
