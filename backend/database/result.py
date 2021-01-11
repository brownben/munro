from typing import Optional, Union

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
]


class Result:
    time: int
    position: int
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

    def __init__(self, event: Union[dict, list]):
        if type(event) == dict:
            for key in event:
                self.setattr(key, event[key])

        else:
            for (index, value) in enumerate(event):
                key = properties[index]

                if not (hasattr(self, key) and getattr(self, key)):
                    setattr(self, key, value)

        if type(self.incomplete) == str:
            self.incomplete = self.incomplete == "true"

        if self.position == -1:
            self.position = ""

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
        }

    def createResult(self):
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
                competitors.course
            FROM competitors, results
            WHERE
                results.competitor=competitors.rowid
                AND competitor=%s
                AND COALESCE(results.type, '') <> 'hidden'
            ORDER BY events.date ASC
        """,
            (competitor,),
        )
        return [Result(result) for result in databaseResult]

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

    def deleteByEvent(eventId: str):
        query(
            """
            DELETE FROM results
            WHERE event=%s
            """,
            (eventId,),
        )
