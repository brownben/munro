from __future__ import annotations
from typing import Any, Dict, List, Optional

from .database import queryWithResults
from .league import League
from .event import Event
from .competitor import Competitor
from .result import Result
from ..utils.points import assignPoints
from ..utils.scoringHelpers import isAgeClassEligible
from ..utils.processResults import (
    assignPositionMultipleCourses as assignPosition,
    getCountingPoints,
    calculatePointsTotal,
    hasResults,
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

    def toDictionary(self, league: League, leagueEvents: List[Event]) -> Dict[str, Any]:
        results = [self.eventResult(event.id) for event in leagueEvents]
        resultsWithCounting = getCountingPoints(results, league, leagueEvents)

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
            ORDER BY events.date
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
            ORDER BY events.date ASC
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

    @staticmethod
    def getAgeClassResults(
        league: League, events: List[Event], ageClass: str
    ) -> Dict[int, Dict[str, Any]]:
        competitors: Dict[int, Dict[str, Any]] = {
            competitor.id: {**competitor.toDictionary(), "points": [None] * len(events)}
            for competitor in Competitor.getByLeague(league.getLeagueOfCompetitors())
            if isAgeClassEligible(competitor.ageClass, ageClass)
        }

        for eventIndex, event in enumerate(events):
            expectedCourse = (
                event.getAdditionalSettingsAsJSON()
                .get("ageClassMapping", {})
                .get(ageClass)
            )
            results = [
                result.toDictionary()
                for result in Result.getByEvent(event.id)
                if result.course == expectedCourse
                and competitors.get(result.competitor)
            ]

            resultsWithPositions = assignPosition(results)
            resultsWithPoints = assignPoints(resultsWithPositions, league.scoringMethod)

            for result in resultsWithPoints:
                competitor = competitors[result["competitor"]]
                competitor["points"][eventIndex] = PointsResult(
                    event=event.id,
                    score=int(result["points"]),
                    type=result["type"],
                    counting=None,
                )

        return {
            competitorId: competitor
            for competitorId, competitor in competitors.items()
            if hasResults(competitor)
        }

    @staticmethod
    def getByAgeClass(
        league: League, events: List[Event], ageClass: str
    ) -> List[Dict[str, Any]]:
        competitorsList: List[Dict[str, Any]] = list(
            LeagueResult.getAgeClassResults(league, events, ageClass).values()
        )
        competitors: List[Dict[str, Any]] = []

        for competitor in competitorsList:
            competitors.append(competitor)
            competitor["points"] = getCountingPoints(
                competitor["points"], league, events
            )
            competitor["totalPoints"] = calculatePointsTotal(competitor["points"])

        return competitors
