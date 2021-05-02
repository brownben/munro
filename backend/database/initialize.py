from .database import query

setupLeagues = """
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
        subLeagueOf TEXT,
        additionalSettings TEXT,
        UNIQUE (name)
    )
"""

setupEvents = """
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
        secondaryLeague TEXT,
        requiredInTotal BOOLEAN,
        additionalSettings TEXT,
        UNIQUE (id),
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
    )
"""

setupCompetitors = """
    CREATE TABLE IF NOT EXISTS competitors (
        rowid SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        ageClass TEXT,
        club TEXT,
        course TEXT,
        league TEXT NOT NULL,
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
    )
"""

setupResults = """
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
    )
"""


setupTRGMExtension = "CREATE EXTENSION IF NOT EXISTS pg_trgm"
setupFuzzyExtension = "CREATE EXTENSION IF NOT EXISTS fuzzystrmatch "


def setup() -> None:
    print("init")
    query(setupLeagues)
    query(setupEvents)
    query(setupCompetitors)
    query(setupResults)
    query(setupTRGMExtension)
    query(setupFuzzyExtension)
    print("init end")
