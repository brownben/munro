import sqlite3

# Convert SQL Tuple to JSON


def competitorToJSON(competitor):
    # Convert data from SQL to Object
    if (competitor):
        return {
            'rowId': competitor[0],
            'name': competitor[1],
            'ageClass': competitor[2],
            'club': competitor[3],
            'course': competitor[4],
            'league': competitor[5]
        }
    else:
        return False


# Set Up Database
connection = sqlite3.connect('./databaseFiles/2.db')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS competitors (
        name TEXT NOT NULL,
        ageClass TEXT,
        club TEXT,
        course TEXT,
        league TEXT NOT NULL,
        FOREIGN KEY(league) REFERENCES leagues(name)
    )''')
connection.commit()
connection.close()

# Competitor Database Functions


def createCompetitor(name, ageClass, club, course, league):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO competitors (name, ageClass, club, course, league) VALUES (?,?,?,?,?)',
                   (name, ageClass, club, course, league))
    rowId = cursor.lastrowid
    connection.commit()
    connection.close()
    return rowId


def updateCompetitor(oldName, name, ageClass, club, course, league):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE competitors
        SET name=?,ageClass=?,club=?,course=?, league=?
        WHERE name=?''', (name, ageClass, club, course, league, oldName))
    connection.commit()
    connection.close()


def deleteCompetitor(rowid):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM competitors WHERE rowid=?', (rowid,))
    connection.commit()
    connection.close()


def findCompetitor(name):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE name=?''', (name,)).fetchone()
    connection.close()
    return competitorToJSON(result)


def getAllCompetitors():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors''').fetchall()
    connection.close()
    return list(map(competitorToJSON, result))


def getCompetitorsByLeague(league):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE league=?''', (league,)).fetchall()
    connection.close()
    return list(map(competitorToJSON, result))


def deleteAllCompetitors():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM competitors')
    connection.commit()
    connection.close()
