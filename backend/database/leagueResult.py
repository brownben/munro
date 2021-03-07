from __future__ import annotations
from backend.utils.scoringHelpers import isAgeClassEligible
from typing import Any, Dict, List, Optional, Union

from .event import Event
from .league import League
from .database import queryWithResults
from ..utils.processResults import (
    getCountingPoints,
    calculatePointsTotal,
    PointsResult,
)


properties = [
    "id",
    "name",
    "ageClass",
    "club",
    "events",
    "points",
    "types",
    "courses",
    "course",
]


class LeagueResult:
    id: int
    name: str
    ageClass: str
    club: str
    events: List[str]
    points: List[int]
    types: List[str]
    courses: List[str]
    course: Optional[str]

    def __init__(self, result: List[Any]):
        for (index, value) in enumerate(result):
            setattr(self, properties[index], value)
        if not hasattr(self, "course"):
            self.course = None

    def toDictionary(
        self, league: League, leagueEvents: List[Event], ageClass: str = ''
    ) -> Dict[str, Any]:
        if ageClass:
            results = [
                self.ageClassEventResult(event, ageClass) for event in leagueEvents
            ]
        else:
            results = [self.eventResult(event.id) for event in leagueEvents]

        resultsWithCounting = getCountingPoints(
            results, league.numberOfCountingEvents, leagueEvents
        )

        return {
            "id": self.id,
            "name": self.name,
            "ageClass": self.ageClass,
            "club": self.club,
            "totalPoints": calculatePointsTotal(resultsWithCounting),
            "points": resultsWithCounting,
            "course": self.course,
        }

    def eventResult(self, event: str) -> PointsResult:
        if event in self.events:
            eventIndex = self.events.index(event)
            return PointsResult(
                event=event,
                score=int(self.points[eventIndex]),
                type=self.types[eventIndex],
                counting=None,
            )

        return PointsResult(event=None, score=None, type=None, counting=None)

    def ageClassEventResult(self, event: Event, ageClass: str) -> PointsResult:
        if event.id in self.events:
            eventIndex = self.events.index(event.id)
            course = self.courses[eventIndex]
            matchesAgeClass = isAgeClassEligible(ageClass, self.ageClass)
            expectedCourse = (
                event.getAdditionalSettingsAsJSON()
                .get("ageClassMapping", {})
                .get(ageClass)
            )

            if course == expectedCourse and matchesAgeClass:
                return PointsResult(
                    event=event.id,
                    score=int(self.points[eventIndex]),
                    type=self.types[eventIndex],
                    counting=None,
                )

        return PointsResult(event=None, score=None, type=None, counting=None)

    @staticmethod
    def getByLeague(leagueName: str, subLeagueOf: str) -> List[LeagueResult]:
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
                array_agg(results.course),
                competitors.course
            FROM competitors, results, events
            WHERE
                results.competitor=competitors.rowid
                AND (competitors.league=%s OR competitors.league=%s)
                AND COALESCE(results.type, '') <> 'hidden'
                AND results.event=events.id
                AND (events.league=%s OR events.secondaryLeague=%s)
            GROUP BY competitors.rowid
            """,
            (leagueName, subLeagueOf, leagueName, leagueName),
        )

        return [LeagueResult(result) for result in databaseResults]

    @staticmethod
    def getByCourse(
        leagueName: str, masterLeague: str, course: str
    ) -> List[LeagueResult]:
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
                array_agg(results.course)
            FROM competitors, results, events
            WHERE
                results.competitor=competitors.rowid
                AND (competitors.league=%s OR competitors.league=%s)
                AND (competitors.course=%s OR results.course=%s)
                AND COALESCE(results.type, '') <> 'hidden'
                AND results.event=events.id
                AND (events.league=%s OR events.secondaryLeague=%s)
            GROUP BY competitors.rowid
            """,
            (leagueName, masterLeague, course, course, leagueName, leagueName),
        )

        return [LeagueResult(result) for result in databaseResults]
