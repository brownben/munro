from __future__ import annotations
from typing import Any, Callable, Dict, List, Optional, Tuple

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

    @staticmethod
    def getFilteredResults(
        league: League, events: List[Event], ageClass: str, course: Optional[str]
    ) -> Tuple[List[Dict[str, Any]], List[Event]]:
        competitors: Dict[int, Dict[str, Any]] = {
            competitor.id: {**competitor.toDictionary(), "points": [None] * len(events)}
            for competitor in Competitor.getByLeague(league.getLeagueOfCompetitors())
            if isAgeClassEligible(competitor.ageClass, ageClass)
        }
        eventsWithResults: List[Event] = []

        for eventIndex, event in enumerate(events):
            expectedCourse = course or (
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

            if len(results) > 0:
                eventsWithResults.append(event)
                eventIndex = len(eventsWithResults) - 1

                resultsWithPositions = assignPosition(results)
                resultsWithPoints = assignPoints(
                    resultsWithPositions, league.scoringMethod
                )

                for result in resultsWithPoints:
                    competitor = competitors[result["competitor"]]
                    competitor["points"][eventIndex] = PointsResult(
                        event=event.id,
                        score=int(result["points"]),
                        type=result["type"],
                        counting=None,
                    )

        return (
            [
                competitor
                for competitor in competitors.values()
                if hasResults(competitor)
            ],
            eventsWithResults,
        )

    @staticmethod
    def getWithFilter(
        league: League, events: List[Event], ageClass: str, course: Optional[str] = None
    ) -> Tuple[List[Dict[str, Any]], List[Event]]:
        competitors, events = LeagueResult.getFilteredResults(
            league, events, ageClass, course
        )

        for competitor in competitors:
            # Calculate scores of dynamic results
            standardScores = [
                point["score"]
                for point in competitor["points"]
                if point and point["type"] not in ["max", "average"]
            ]
            for point in competitor["points"]:
                if point and point["type"] == "max":
                    point["score"] = max(standardScores)
                elif point and point["type"] == "average":
                    point["score"] = round(sum(standardScores) / len(standardScores))

            competitor["points"] = getCountingPoints(
                competitor["points"], league, events
            )
            competitor["totalPoints"] = calculatePointsTotal(competitor["points"])

        return competitors, events
