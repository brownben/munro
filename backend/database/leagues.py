from .sqlQuery import (
    query,
    queryWithOneResult,
    queryWithResults,
    queryMultiple,
)


def leagueToJSON(league):
    # Convert SQL output to JSON Object
    if league:
        return {
            "name": league[0],
            "website": league[1],
            "coordinator": league[2],
            "scoringMethod": league[3],
            "numberOfCountingEvents": league[4],
            "courses": league[5].split(",") if league[5] else "",
            "description": league[6],
            "year": league[7],
            "dynamicEventResults": league[8],
            "moreInformation": league[9],
            "leagueScoring": league[10] or "course",
            "clubRestriction": league[11] or "",
            "numberOfEvents": league[12],
        }
    else:
        return False


# Set Up Database

queryMultiple(
    [
        """
    CREATE TABLE IF NOT EXISTS leagues (
        name TEXT NOT NULL PRIMARY KEY,
        website TEXT,
        coordinator TEXT,
        scoringMethod TEXT NOT NULL,
        numberOfCountingEvents INT,
        courses TEXT,
        description TEXT,
        moreInformation TEXT,
        year INTEGER,
        dynamicEventResults BOOLEAN,
        leagueScoring TEXT,
        clubRestriction TEXT,
        UNIQUE (name))""",
        """
    CREATE TABLE IF NOT EXISTS events (
        id TEXT NOT NULL PRIMARY KEY,
        name TEXT NOT NULL,
        date TEXT,
        resultUploaded BOOLEAN,
        organiser TEXT,
        moreInformation TEXT,
        website TEXT,
        results TEXT,
        winsplits TEXT,
        routegadget TEXT,
        userSubmittedResults BOOLEAN,
        league TEXT NOT NULL,
        uploadKey TEXT,
        UNIQUE (id),
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
        )""",
        """
    CREATE TABLE IF NOT EXISTS competitors (
        rowid SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        ageClass TEXT,
        club TEXT,
        course TEXT,
        league TEXT NOT NULL,
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
    )""",
        """
    CREATE TABLE IF NOT EXISTS results (
        rowid SERIAL PRIMARY KEY,
        time INT NOT NULL,
        position INT,
        points INT NOT NULL,
        incomplete TEXT,
        event TEXT NOT NULL,
        competitor INT NOT NULL,
        course TEXT,
        FOREIGN KEY(event) REFERENCES events(id)
        ON UPDATE CASCADE ON DELETE CASCADE
    )""",
        "CREATE EXTENSION IF NOT EXISTS pg_trgm",
        "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch ",
    ]
)


def fixYear(year):
    try:
        return int(year)
    except ValueError:
        return 0


def createLeague(data):
    query(
        """
        INSERT INTO leagues (name,website,coordinator,scoringMethod,numberOfCountingEvents, courses,
        description, year, dynamicEventResults, moreInformation, leagueScoring, clubRestriction)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,
        (
            data["name"],
            data["website"],
            data["coordinator"],
            data["scoringMethod"],
            data["numberOfCountingEvents"],
            data["courses"],
            data["description"],
            fixYear(data["year"]),
            data["dynamicEventResults"],
            data["moreInformation"],
            data["leagueScoring"],
            data["clubRestriction"],
        ),
    )


def updateLeague(data):
    query(
        """
        UPDATE leagues
        SET name=%s,website=%s,coordinator=%s,scoringMethod=%s,numberOfCountingEvents=%s, courses=%s,description=%s, year=%s, dynamicEventResults=%s, moreInformation=%s, leagueScoring=%s, clubRestriction=%s
        WHERE name=%s""",
        (
            data["name"],
            data["website"],
            data["coordinator"],
            data["scoringMethod"],
            data["numberOfCountingEvents"],
            data["courses"],
            data["description"],
            fixYear(data["year"]),
            data["dynamicEventResults"],
            data["moreInformation"],
            data["leagueScoring"],
            data["clubRestriction"],
            data["oldName"],
        ),
    )


def deleteLeague(name):
    query("DELETE FROM leagues WHERE name=%s", (name,))


def findLeague(name):
    return leagueToJSON(
        queryWithOneResult(
            """
        SELECT leagues.name, leagues.website, leagues.coordinator, leagues.scoringMethod, leagues.numberOfCountingEvents, leagues.courses, leagues.description, leagues.year, leagues.dynamicEventResults, leagues.moreInformation, leagues.leagueScoring, clubRestriction, COUNT(events.id)
        FROM leagues
        LEFT JOIN events ON leagues.name=events.league
        WHERE leagues.name=%s
        GROUP BY leagues.name
        ORDER BY leagues.year DESC, leagues.name ASC
        """,
            (name,),
        )
    )


def getAllLeagues():
    result = queryWithResults(
        """
        SELECT leagues.name, leagues.website, leagues.coordinator, leagues.scoringMethod, leagues.numberOfCountingEvents, leagues.courses, leagues.description, leagues.year, leagues.dynamicEventResults, leagues.moreInformation, leagues.leagueScoring, clubRestriction, COUNT(events.id)
        FROM leagues
        LEFT JOIN events ON leagues.name=events.league
        GROUP BY leagues.name
        ORDER BY year DESC, name ASC
        """
    )
    return list(map(leagueToJSON, result))


def deleteAllLeagues():
    query("DELETE FROM leagues")
