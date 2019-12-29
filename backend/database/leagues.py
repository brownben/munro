import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']


def leagueToJSON(league):
    # Convert SQL output to JSON Object
    if (league):
        return {
            'name': league[0],
            'website': league[1],
            'logo': league[2],
            'coordinator': league[3],
            'scoringMethod': league[4],
            'numberOfCountingEvents': league[5],
            'courses': league[6].split(','),
            'description': league[7],
            'year': league[8],
        }
    else:
        return False


# Set Up Database
connection = psycopg2.connect(DATABASE_URL, sslmode='require')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS leagues (
        name TEXT NOT NULL PRIMARY KEY,
        website TEXT,
        logo TEXT,
        coordinator TEXT,
        scoringMethod TEXT NOT NULL,
        numberOfCountingEvents INT,
        courses TEXT,
        moreInformation TEXT,
        year INTEGER,
        UNIQUE (name))''')
cursor.execute('''
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
        league TEXT NOT NULL,
        uploadKey TEXT,
        UNIQUE (id),
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
        )''')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS competitors (
        rowid SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        ageClass TEXT,
        club TEXT,
        course TEXT,
        league TEXT NOT NULL,
        FOREIGN KEY(league) REFERENCES leagues(name)
        ON UPDATE CASCADE ON DELETE CASCADE
    )''')
cursor.execute('''
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
    )''')
connection.commit()
connection.close()

# League Database Functions


def createLeague(name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo, year):
    try:
        year = int(year)
    except:
        year = 0
    courses = courses.replace(' ', '')
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO leagues (name,website,logo,coordinator,scoringMethod,numberOfCountingEvents, courses, moreInformation, year) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)',
                   (name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo, year))
    connection.commit()
    connection.close()


def updateLeague(oldName, name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo, year):
    try:
        year = int(year)
    except:
        year = 0
    courses = courses.replace(' ', '')
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE leagues
        SET name=%s,website=%s,logo=%s,coordinator=%s,scoringMethod=%s,numberOfCountingEvents=%s, courses=%s,moreInformation=%s, year=%s
        WHERE name=%s''', (name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo,year, oldName))
    connection.commit()
    connection.close()


def deleteLeague(name):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM leagues WHERE name=%s', (name,))
    connection.commit()
    connection.close()


def findLeague(name):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT name,website,logo,coordinator,scoringMethod,numberOfCountingEvents,courses, moreInformation, year
        FROM leagues
        WHERE name=%s
        ORDER BY year DESC, name ASC''', (name,))
    result = cursor.fetchone()
    connection.close()
    json = leagueToJSON(result)
    if(json):
        json['numberOfEvents'] = getNumberOfEventsInLeague(json['name'])
    return json


def getAllLeagues():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT name,website,logo,coordinator,scoringMethod,numberOfCountingEvents, courses, moreInformation, year
        FROM leagues
        ORDER BY year DESC, name ASC''')
    result = cursor.fetchall()
    connection.close()
    leagues = list(map(leagueToJSON, result))
    for league in leagues:
        league['numberOfEvents'] = getNumberOfEventsInLeague(league['name'])
    return leagues


def deleteAllLeagues():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM leagues')
    connection.commit()
    connection.close()


def getNumberOfEventsInLeague(name):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT COUNT(events.name)
        FROM events
        WHERE events.league=%s''', (name,))
    result = cursor.fetchall()
    connection.close()
    return result[0][0]
