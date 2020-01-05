import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']


def query(string, values=()):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(string, values)
    connection.commit()
    connection.close()


def queryWithOneResult(string, values=()):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(string, values)
    result = cursor.fetchone()
    connection.commit()
    connection.close()
    return result


def queryWithResults(string, values=()):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(string, values)
    result = cursor.fetchall()
    connection.commit()
    connection.close()
    return result


def queryMultiple(args):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    for arg in args:
        cursor.execute(arg)
    connection.commit()
    connection.close()
