from .sqlQuery import queryWithResults as query

from .leagues import leagueToJSON
from .events import eventToJSON
from .competitors import competitorToJSON


def leaguesSearch(term: str):
    results = query(
        """
        SELECT
        leagues.name, leagues.website, leagues.coordinator, leagues.scoringMethod, leagues.numberOfCountingEvents, leagues.courses, leagues.description, leagues.year, leagues.dynamicEventResults, leagues.moreInformation, leagues.leagueScoring, clubRestriction, COUNT(events.id)
        FROM leagues
        LEFT JOIN events ON leagues.name=events.league
        WHERE %s %% ANY(STRING_TO_ARRAY(leagues.name, ' '))
            OR %s %% ANY(STRING_TO_ARRAY(leagues.description, ' '))
            OR CAST(leagues.year AS TEXT) = %s
            OR CAST(leagues.year AS TEXT) LIKE %s
        GROUP BY leagues.name
        ORDER BY SIMILARITY(leagues.name, %s) DESC
        """,
        [term, term, f"__{term}", term, term],
    )

    return [leagueToJSON(result) for result in results]


def eventsSearch(term: str):
    results = query(
        """
        SELECT
          id, name, date, resultUploaded, organiser, moreInformation, website, results, winsplits, routegadget, userSubmittedResults, league
        FROM events
        WHERE  %s %% ANY(STRING_TO_ARRAY(name, ' '))
            OR id LIKE %s
        ORDER BY SIMILARITY(id, %s) DESC
        """,
        [term, f"%term%", term],
    )

    return [eventToJSON(result) for result in results]


def competitorSearch(term: str):
    results = query(
        """
        SELECT
          rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE %s %% ANY(STRING_TO_ARRAY(name, ' '))
        ORDER BY SIMILARITY(name, %s) DESC
        """,
        [term] * 2,
    )

    return [competitorToJSON(result) for result in results]
