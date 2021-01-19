from typing import List, Union
from .database import query, queryWithResult, queryWithResults

properties = [
    "name",
    "year",
    "description",
    "moreInformation",
    "coordinator",
    "website",
    "coursesTemp",
    "leagueScoring",
    "scoringMethod",
    "numberOfCountingEvents",
    "dynamicEventResults",
    "clubRestriction",
    "numberOfEvents",
]


class League:
    # Basic League Information
    name: str
    year: int
    description: str
    moreInformation: str
    coordinator: str
    website: str

    # Scoring Options
    coursesTemp: str
    courses: List[str]
    leagueScoring: str
    scoringMethod: str
    numberOfCountingEvents: int
    dynamicEventResults: bool
    clubRestriction: str

    # Dynamic Properties
    numberOfEvents: int

    def __init__(self, league: Union[dict, list]):
        if type(league) == dict:
            for key in league:
                setattr(self, key, league[key])

        else:
            for (index, key) in enumerate(properties):
                setattr(self, key, league[index])

        if hasattr(self, "coursesTemp"):
            self.courses = self.coursesTemp.split(",")

    def toDictionary(self):
        return {
            "name": self.name,
            "year": self.year,
            "description": self.description,
            "moreInformation": self.moreInformation,
            "coordinator": self.coordinator,
            "website": self.website,
            "courses": self.courses,
            "leagueScoring": self.leagueScoring,
            "scoringMethod": self.scoringMethod,
            "numberOfCountingEvents": self.numberOfCountingEvents,
            "dynamicEventResults": self.dynamicEventResults,
            "clubRestriction": self.clubRestriction,
            "numberOfEvents": self.numberOfEvents,
        }

    def create(self):
        query(
            """
            INSERT INTO leagues (
                name,
                year,
                description,
                moreInformation,
                coordinator,
                website,
                courses,
                leagueScoring,
                scoringMethod,
                numberOfCountingEvents,
                dynamicEventResults,
                clubRestriction
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """,
            (
                self.name,
                self.year,
                self.description,
                self.moreInformation,
                self.coordinator,
                self.website,
                ",".join(self.courses),
                self.leagueScoring,
                self.scoringMethod,
                self.numberOfCountingEvents,
                self.dynamicEventResults,
                self.clubRestriction,
            ),
        )

    def update(self, oldName: str):
        query(
            """
            UPDATE leagues SET
                name=%s,
                year=%s,
                description=%s,
                moreInformation=%s,
                coordinator=%s,
                website=%s,
                courses=%s,
                leagueScoring=%s,
                scoringMethod=%s,
                numberOfCountingEvents=%s,
                dynamicEventResults=%s,
                clubRestriction=%s
            WHERE name=%s""",
            (
                self.name,
                self.year,
                self.description,
                self.moreInformation,
                self.coordinator,
                self.website,
                ",".join(self.courses),
                self.leagueScoring,
                self.scoringMethod,
                self.numberOfCountingEvents,
                self.dynamicEventResults,
                self.clubRestriction,
                oldName,
            ),
        )

    @staticmethod
    def getAll():
        databaseResult = queryWithResults(
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
                COUNT(events.id)
            FROM leagues
            LEFT JOIN events ON leagues.name=events.league
            GROUP BY leagues.name
            ORDER BY year DESC, name ASC
            """
        )
        return [League(result) for result in databaseResult]

    @staticmethod
    def getByName(name: str):
        databaseResult = queryWithResult(
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
                COUNT(events.id)
            FROM leagues
            LEFT JOIN events ON leagues.name=events.league
            WHERE leagues.name=%s
            GROUP BY leagues.name
            ORDER BY leagues.year DESC, leagues.name ASC
            """,
            (name,),
        )
        return League(databaseResult)

    @staticmethod
    def exists(name: str) -> bool:
        return bool(League.getByName(name))

    @staticmethod
    def deleteByName(name: str):
        query(
            """
            DELETE FROM leagues
            WHERE name=%s
            """,
            (name,),
        )

    @staticmethod
    def deleteAll():
        query("DELETE FROM leagues")
