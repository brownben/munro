import sqlite3


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
            'moreInformation': league[7]
        }
    else:
        return False


# Set Up Database
connection = sqlite3.connect('./databaseFiles/2.db')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS leagues (
        name TEXT NOT NULL,
        website TEXT,
        logo TEXT,
        coordinator TEXT,
        scoringMethod TEXT NOT NULL,
        numberOfCountingEvents NUMBER,
        courses TEXT,
        moreInformation TEXT,
        PRIMARY KEY (name),
        UNIQUE (name))''')
connection.commit()
connection.close()

# League Database Functions


def createLeague(name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo):
    courses = courses.replace(' ', '')
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO leagues (name,website,logo,coordinator,scoringMethod,numberOfCountingEvents, courses, moreInformation) VALUES (?,?,?,?,?,?,?,?)',
                   (name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo))
    connection.commit()
    connection.close()


def updateLeague(oldName, name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo):
    courses = courses.replace(' ', '')
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE leagues
        SET name=?,website=?,logo=?,coordinator=?,scoringMethod=?,numberOfCountingEvents=?, courses=?,moreInformation=?
        WHERE name=?''', (name, website, logo, coordinator, scoringMethod, noOfEvents, courses, moreInfo, oldName))
    connection.commit()
    connection.close()


def deleteLeague(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM leagues WHERE name=?', (name,))
    connection.commit()
    connection.close()


def findLeague(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT name,website,logo,coordinator,scoringMethod,numberOfCountingEvents,courses, moreInformation
        FROM leagues
        WHERE name=?''', (name,)).fetchone()
    connection.close()
    json = leagueToJSON(result)
    if(json):
        json['numberOfEvents'] = getNumberOfEventsInLeague(json['name'])
    return json


def getAllLeagues():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT name,website,logo,coordinator,scoringMethod,numberOfCountingEvents, courses, moreInformation
        FROM leagues
        ORDER BY name ASC''').fetchall()
    connection.close()
    leagues = list(map(leagueToJSON, result))
    for league in leagues:
        league['numberOfEvents'] = getNumberOfEventsInLeague(league['name'])
    return leagues


def deleteAllLeagues():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM leagues')
    connection.commit()
    connection.close()


def getNumberOfEventsInLeague(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT COUNT(events.name)
        FROM events
        WHERE events.league=?''', (name,)).fetchall()
    connection.close()
    return result[0][0]
