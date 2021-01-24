from typing import Literal, Optional, Union

from .event import Event
from .database import query, queryWithResult, queryWithResults

properties = [
    "time",
    "position",
    "points",
    "incomplete",
    "event",
    "competitor",
    "type",
    "course",
    "id",
    "name",
    "ageClass",
    "club",
    "course",
    "eventName",
]


class Result:
    id: int
    time: int
    position: Union[int, Literal[""]]
    points: int
    incomplete: bool
    type: str
    course: str

    event: str
    competitor: int

    # competitor data
    name: Optional[str]
    ageClass: Optional[str]
    club: Optional[str]

    def __init__(self, result: Union[dict, list]):
        if type(result) == dict:
            for key in result:
                setattr(self, key, result[key])

        else:
            for (index, value) in enumerate(result):
                key = properties[index]

                if not (hasattr(self, key) and getattr(self, key)):
                    setattr(self, key, value)

        if type(self.incomplete) == str:
            self.incomplete = self.incomplete == "true"

        if self.position == -1:
            self.position = ""

        if not hasattr(self, "eventName"):
            self.eventName = None

    def toDictionary(self):
        return {
            "id": self.id,
            "time": self.time,
            "position": self.position,
            "points": self.points,
            "incomplete": self.incomplete,
            "type": self.type,
            "course": self.course,
            "event": self.event,
            "competitor": self.competitor,
            "name": self.name,
            "ageClass": self.ageClass,
            "club": self.club,
            "eventName": self.eventName,
            "eventId": self.event,
        }

    def create(self):
        if self.position == "":
            self.position = -1

        query(
            """
            INSERT INTO results (
                time,
                position,
                points,
                incomplete,
                event,
                competitor,
                type,
                course
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                self.time,
                self.position,
                self.points,
                self.incomplete,
                self.event,
                self.competitor,
                self.type,
                self.course,
            ),
        )

    @staticmethod
    def updatePoints(resultId: int, points: int):
        query(
            """
            UPDATE results
            SET points=%s
            WHERE rowid=%s
            """,
            (points, resultId),
        )

    @staticmethod
    def updateIncomplete(resultId: int, incomplete: bool):
        query(
            """
            UPDATE results
            SET incomplete=%s
            WHERE rowid=%s
            """,
            (incomplete, resultId),
        )

    def updateType(self, type: str):
        query(
            """
            UPDATE results
            SET type=%s
            WHERE rowid=%s
            """,
            (type, self.id),
        )

    def getEvent(self):
        return Event.getById(self.event)

    @staticmethod
    def getById(rowid: int):
        databaseResult = queryWithResult(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course
            FROM competitors, results
            WHERE
                results.rowid=%s
                AND results.competitor=competitors.rowid
        """,
            (rowid,),
        )
        return Result(databaseResult)

    @staticmethod
    def getByEvent(eventId: str):
        databaseResult = queryWithResults(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND event=%s
                AND COALESCE(results.type, '') <> 'hidden'
            ORDER BY competitors.course ASC, results.position ASC
        """,
            (eventId,),
        )
        return [Result(result) for result in databaseResult]

    @staticmethod
    def getDynamicResultsByLeague(league: str):
        databaseResult = queryWithResults(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND competitor.league=%s
                AND COALESCE(results.type, '') <> 'hidden'
                AND results.type IS NOT NULL
            ORDER BY competitors.course ASC, results.position ASC
        """,
            (league,),
        )
        return [Result(result) for result in databaseResult]

    @staticmethod
    def getByCompetitor(competitor: int):
        databaseResult = queryWithResults(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course,
                events.name
            FROM competitors, results, events
            WHERE
                results.competitor=competitors.rowid
                AND results.event=events.id
                AND competitor=%s
                AND COALESCE(results.type, '') <> 'hidden'
            ORDER BY events.date ASC
        """,
            (competitor,),
        )
        return [Result(result) for result in databaseResult]

    @staticmethod
    def getNonDynamicPointsByCompetitor(competitor: int):
        result = queryWithResult(
            """
            SELECT string_agg(results.points::text,';')
            FROM results, competitors
            WHERE
                results.competitor=competitors.rowid
                AND COALESCE(type,'') <> 'max'
                AND COALESCE(type,'') <> 'average'
                AND COALESCE(type,'') <> 'manual'
                AND COALESCE(type,'') <> 'hidden'
                AND competitors.rowid=%s
            GROUP BY competitors.rowid
            """,
            (competitor,),
        )
        return [int(result) for result in result[0].split(";")]

    @staticmethod
    def getAll():
        databaseResult = queryWithResults(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND COALESCE(results.type, '') <> 'hidden'
        """
        )
        return [Result(result) for result in databaseResult]

    @staticmethod
    def getByEventForRecalc(eventId: str):
        databaseResult = queryWithResults(
            """
            SELECT
                results.time,
                results.position,
                results.points,
                results.incomplete,
                results.event,
                results.competitor,
                results.type,
                results.course,
                results.rowid,
                competitors.name,
                competitors.ageClass,
                competitors.club,
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND event=%s
                AND COALESCE(type, '') <> 'manual'
                AND COALESCE(type, '') <> 'max'
                AND COALESCE(type, '') <> 'average'
            ORDER BY competitors.course ASC, results.time ASC
            """,
            (eventId,),
        )
        return [Result(result).toDictionary() for result in databaseResult]

    @staticmethod
    def updateFromRecalc(data: dict):
        query(
            """
            UPDATE results
            SET
                time=%s,
                position=%s,
                points=%s,
                incomplete=%s
            WHERE rowid=%s
            """,
            (
                data["time"],
                data["position"],
                data["points"],
                data["incomplete"],
                data["rowid"],
            ),
        )

    @staticmethod
    def transfer(competitor: int, result: int):
        query(
            """
            UPDATE results
            SET competitor=%s
            WHERE rowid=%s
            """,
            (competitor, result),
        )

    @staticmethod
    def deleteByEvent(eventId: str):
        query(
            """
            DELETE FROM results
            WHERE event=%s
            """,
            (eventId,),
        )
