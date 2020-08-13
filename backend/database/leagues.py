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
            "courses": league[5].split(","),
            "description": league[6],
            "year": league[7],
            "dynamicEventResults": league[8],
            "moreInformation": league[9],
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
        competitor INT  NOT NULL,
        FOREIGN KEY(event) REFERENCES events(id)
        ON UPDATE CASCADE ON DELETE CASCADE
    )""",
        "CREATE EXTENSION IF NOT EXISTS pg_trgm",
        "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch ",
    ]
)


def fixInput(year, courses):
    try:
        year = int(year)
    except ValueError:
        year = 0

    courses = courses.replace(" ", "")

    return year, courses


def createLeague(data):
    year, courses = fixInput(data["year"], data["courses"])
    query(
        """
        INSERT INTO leagues (name,website,coordinator,scoringMethod,numberOfCountingEvents, courses,
        description, year, dynamicEventResults, moreInformation)
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,
        (
            data["name"],
            data["website"],
            data["coordinator"],
            data["scoringMethod"],
            data["numberOfCountingEvents"],
            courses,
            data["description"],
            year,
            data["dynamicEventResults"],
            data["moreInformation"],
        ),
    )


def updateLeague(data):
    year, courses = fixInput(data["year"], data["courses"])
    query(
        """
        UPDATE leagues
        SET name=%s,website=%s,coordinator=%s,scoringMethod=%s,numberOfCountingEvents=%s, courses=%s,description=%s, year=%s, dynamicEventResults=%s, moreInformation=%s
        WHERE name=%s""",
        (
            data["name"],
            data["website"],
            data["coordinator"],
            data["scoringMethod"],
            data["numberOfCountingEvents"],
            courses,
            data["description"],
            year,
            data["dynamicEventResults"],
            data["moreInformation"],
            data["oldName"],
        ),
    )


def deleteLeague(name):
    query("DELETE FROM leagues WHERE name=%s", (name,))


def findLeague(name):
    result = queryWithOneResult(
        """
        SELECT name,website,coordinator,scoringMethod,numberOfCountingEvents,courses, description, year, dynamicEventResults, moreInformation
        FROM leagues
        WHERE name=%s
        ORDER BY year DESC, name ASC""",
        (name,),
    )
    json = leagueToJSON(result)
    if json:
        json["numberOfEvents"] = getNumberOfEventsInLeague(json["name"])
    return json


def getAllLeagues():
    result = queryWithResults(
        """
        SELECT name,website,coordinator,scoringMethod,numberOfCountingEvents, courses, description, year, dynamicEventResults, moreInformation
        FROM leagues
        ORDER BY year DESC, name ASC"""
    )
    leagues = list(map(leagueToJSON, result))
    for league in leagues:
        league["numberOfEvents"] = getNumberOfEventsInLeague(league["name"])
    return leagues


def deleteAllLeagues():
    query("DELETE FROM leagues")


def getNumberOfEventsInLeague(name):
    result = queryWithResults(
        """
        SELECT COUNT(events.name)
        FROM events
        WHERE events.league=%s""",
        (name,),
    )
    return result[0][0]
