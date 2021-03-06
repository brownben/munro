from __future__ import annotations
from typing import Any, Dict, List

from .database import DatabaseConnection
from .league import League
from .event import Event
from .competitor import Competitor


class Search:
    leagues: List[League]
    events: List[Event]
    competitors: List[Competitor]

    def __init__(self, searchTerm: str):
        self.databaseConnection = DatabaseConnection()
        self.leagues = self.searchLeagues(searchTerm)
        self.events = self.searchEvents(searchTerm)
        self.competitors = self.searchCompetitors(searchTerm)
        self.databaseConnection.close()

    def toDictionary(self) -> Dict[str, List[Dict[str, Any]]]:
        return {
            "leagues": [league.toDictionary() for league in self.leagues],
            "events": [event.toDictionary() for event in self.events],
            "competitors": [
                competitor.toDictionary() for competitor in self.competitors
            ],
        }

    def searchLeagues(self, searchTerm: str) -> List[League]:
        self.databaseConnection.execute(
            """
            SELECT
                leagues.name,
                leagues.year,
                leagues.description,
                leagues.moreInformation,
                leagues.coordinator,
                leagues.website,
                leagues.courses,
                leagues.leagueScoring,
                leagues.scoringMethod,
                leagues.numberOfCountingEvents,
                leagues.dynamicEventResults,
                leagues.clubRestriction,
                leagues.subLeagueOf,
                leagues.additionalSettings,
                COUNT(events.id)
            FROM leagues
            LEFT JOIN events ON leagues.name=events.league
            WHERE
                %s %% ANY(STRING_TO_ARRAY(leagues.name, ' '))
                OR %s %% ANY(STRING_TO_ARRAY(leagues.description, ' '))
                OR CAST(leagues.year AS TEXT) = %s
                OR CAST(leagues.year AS TEXT) LIKE %s
            GROUP BY leagues.name
            ORDER BY SIMILARITY(leagues.name, %s) DESC
            """,
            (searchTerm, searchTerm, f"__{searchTerm}", searchTerm, searchTerm),
        )
        databaseResults = self.databaseConnection.getResults() or []
        return [League(result) for result in databaseResults]

    def searchEvents(self, searchTerm: str) -> List[Event]:
        self.databaseConnection.execute(
            """
            SELECT
                id,
                name,
                date,
                website,
                organiser,
                moreInformation,
                league,
                resultUploaded,
                results,
                winsplits,
                routegadget,
                userSubmittedResults,
                secondaryLeague,
                requiredInTotal,
                additionalSettings,
                uploadKey
            FROM events
            WHERE
                %s %% ANY(STRING_TO_ARRAY(name, ' '))
                OR id LIKE %s
            ORDER BY SIMILARITY(id, %s) DESC
            """,
            (searchTerm, f"%term%", searchTerm),
        )

        databaseResults = self.databaseConnection.getResults() or []
        return [Event(result) for result in databaseResults]

    def searchCompetitors(self, searchTerm: str) -> List[Competitor]:
        self.databaseConnection.execute(
            """
            SELECT
                rowid,
                name,
                ageClass,
                club,
                course,
                league
            FROM competitors
            WHERE %s %% ANY(STRING_TO_ARRAY(name, ' '))
            ORDER BY SIMILARITY(name, %s) DESC
            """,
            (searchTerm, searchTerm),
        )

        databaseResults = self.databaseConnection.getResults() or []
        return [Competitor(result) for result in databaseResults]
