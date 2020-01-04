import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

# Convert SQL Tuple to JSON


def competitorToJSON(competitor):
    # Convert data from SQL to Object
    if (competitor):
        return {
            'id': competitor[0],
            'name': competitor[1],
            'ageClass': competitor[2],
            'club': competitor[3],
            'course': competitor[4],
            'league': competitor[5]
        }
    else:
        return False


# Competitor Database Functions


def createCompetitor(name, ageClass, club, course, league):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('INSERT INTO competitors (name, ageClass, club, course, league) VALUES (%s,%s,%s,%s,%s) RETURNING rowid;',
                   (name, ageClass, club, course, league))
    rowId = cursor.fetchone()[0]
    connection.commit()
    connection.close()
    return rowId


def updateCompetitor(competitorId, name, ageClass, club, course, league):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        UPDATE competitors
        SET name=%s,ageClass=%s,club=%s,course=%s, league=%s
        WHERE rowid=%s''', (name, ageClass, club, course, league, competitorId))
    connection.commit()
    connection.close()


def deleteCompetitor(rowid):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM competitors WHERE rowid=%s', (rowid,))
    connection.commit()
    connection.close()


def findCompetitor(competitorId):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE rowid=%s''', (competitorId,))
    result = cursor.fetchone()
    connection.close()
    return competitorToJSON(result)


def getAllCompetitors():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors''')
    result = cursor.fetchall()
    connection.close()
    return list(map(competitorToJSON, result))


def getCompetitorsByLeague(league):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
        SELECT rowid, name, ageClass, club, course, league
        FROM competitors
        WHERE league=%s''', (league,))
    result = cursor.fetchall()
    connection.close()
    return list(map(competitorToJSON, result))


def deleteAllCompetitors():
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM competitors')
    connection.commit()
    connection.close()


def mergeCompetitors(competitorKeep, competitorMerge):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute('''
    UPDATE results
    SET competitor=%s
    WHERE competitor=%s
    ''', (competitorKeep, competitorMerge))
    cursor.execute('''
    DELETE FROM competitors
    WHERE rowid=%s
    ''', (competitorMerge,))
    connection.commit()
    connection.close()
