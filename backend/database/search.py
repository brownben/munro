from .sqlQuery import queryWithResults as query

from .leagues import leagueToJSON
from .events import eventToJSON
from .competitors import competitorToJSON


def leaguesSearch(term):
    results = query(
        """
        SELECT
          name, website, coordinator, scoringMethod, numberOfCountingEvents, courses, description, year, dynamicEventResults, moreInformation
        FROM leagues
        WHERE %s %% ANY(STRING_TO_ARRAY(name, ' '))
            OR %s %% ANY(STRING_TO_ARRAY(description, ' '))
            OR CAST(year AS TEXT) = %s
            OR CAST(year AS TEXT) LIKE %s
        ORDER BY SIMILARITY(name, %s) DESC
        """,
        [term, term, f"__{term}", term, term],
    )

    return list(map(leagueToJSON, results))


def eventsSearch(term):
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

    return list(map(eventToJSON, results))


def competitorSearch(term):
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

    return list(map(competitorToJSON, results))
