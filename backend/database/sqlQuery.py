import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

def query(args):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(args)
    connection.commit()
    connection.close()


def queryWithOneResult(args):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(args)
    result = cursor.fetchone()
    connection.commit()
    connection.close()
    return result


def queryWithResults(args):
    connection = psycopg2.connect(DATABASE_URL, sslmode='require')
    cursor = connection.cursor()
    cursor.execute(args)
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