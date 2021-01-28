from __future__ import annotations
from typing import Any, Dict, List, Optional, Union

from .database import query, queryWithResult, queryWithResults

properties = ["id", "name", "ageClass", "club", "course", "league"]


class Competitor:
    id: int
    name: str
    ageClass: str
    club: str
    course: str
    league: str

    def __init__(self, competitor):
        if type(competitor) == dict:
            for key in competitor:
                setattr(self, key, competitor[key])

        else:
            for (index, key) in enumerate(properties):
                setattr(self, key, competitor[index])

    def toDictionary(self) -> Dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "ageClass": self.ageClass,
            "club": self.club,
            "course": self.course,
            "league": self.league,
        }

    def create(self) -> int:
        databaseResult = queryWithResult(
            """
            INSERT INTO competitors (
                name,
                ageClass,
                club,
                course,
                league
            ) VALUES (%s,%s,%s,%s,%s)
            RETURNING rowid
            """,
            (self.name, self.ageClass, self.club, self.course, self.league),
        )
        return databaseResult[0]

    def update(self) -> None:
        query(
            """
            UPDATE competitors SET
                name=%s,
                ageClass=%s,
                club=%s,
                course=%s,
                league=%s
            WHERE rowid=%s
            """,
            (self.name, self.ageClass, self.club, self.course, self.league, self.id),
        )

    @staticmethod
    def getAll() -> List[Competitor]:
        databaseResult = queryWithResults(
            """
            SELECT
                rowid,
                name,
                ageClass,
                club,
                course,
                league
            FROM competitors
            """
        )
        return [Competitor(result) for result in databaseResult]

    @staticmethod
    def getById(eventId: str) -> Competitor:
        databaseResult = queryWithResult(
            """
            SELECT
                rowid,
                name,
                ageClass,
                club,
                course,
                league
            FROM competitors
            WHERE rowid=%s
            """,
            (eventId,),
        )
        return Competitor(databaseResult)

    @staticmethod
    def getByLeague(league: str) -> List[Competitor]:
        databaseResult = queryWithResults(
            """
            SELECT
                rowid,
                name,
                ageClass,
                club,
                course,
                league
            FROM competitors
            WHERE league=%s
            """,
            (league,),
        )
        return [Competitor(result) for result in databaseResult]

    @staticmethod
    def getByNameCourseAndLeague(
        name: str, course: str, league: str
    ) -> Optional[Competitor]:
        databaseResult = queryWithResult(
            """
            SELECT
                rowid,
                name,
                ageClass,
                club,
                course,
                league
            FROM competitors
            WHERE
                name=%s
                AND course=%s
                AND league=%s
            """,
            (name, course, league),
        )
        if not databaseResult:
            return None
        return Competitor(databaseResult)

    @staticmethod
    def merge(competitorKeep: int, competitorMerge: int) -> None:
        query(
            """
            UPDATE results
            SET competitor=%s
            WHERE competitor=%s
        """,
            (competitorKeep, competitorMerge),
        )
        query(
            """
            DELETE FROM competitors
            WHERE rowid=%s
        """,
            (competitorMerge,),
        )

    @staticmethod
    def deleteById(id: int) -> None:
        query(
            """
            DELETE FROM competitors
            WHERE rowid=%s
            """,
            (id,),
        )

    @staticmethod
    def deleteAll() -> None:
        query("DELETE FROM competitors")
