import os
import psycopg2

DATABASE_URL = os.environ["DATABASE_URL"]


def connectToDatabase():
    connection = psycopg2.connect(DATABASE_URL, sslmode="require")
    cursor = connection.cursor()
    return connection, cursor


def closeDatabase(connection):
    connection.commit()
    connection.close()


def query(string, values=()):
    connection, cursor = connectToDatabase()
    cursor.execute(string, values)
    closeDatabase(connection)


def queryWithOneResult(string, values=()):
    connection, cursor = connectToDatabase()
    cursor.execute(string, values)
    result = cursor.fetchone()
    closeDatabase(connection)
    return result


def queryWithResults(string, values=()):
    connection, cursor = connectToDatabase()
    cursor.execute(string, values)
    result = cursor.fetchall()
    closeDatabase(connection)
    return result


def queryMultiple(args):
    connection, cursor = connectToDatabase()
    for arg in args:
        cursor.execute(arg)
    closeDatabase(connection)
