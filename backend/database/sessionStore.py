import time
import sqlite3

connection = sqlite3.connect('./databaseFiles/sessions.db')
cursor = connection.cursor()
cursor.execute('DROP TABLE IF EXISTS sessions')
cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
        username TEXT,
        logInTime NUMBER,
        PRIMARY KEY (username),
        UNIQUE (username)
    )''')
connection.close()


def login(username):
    connection = sqlite3.connect('./databaseFiles/sessions.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM sessions WHERE username=?', (username,))
    cursor.execute('INSERT INTO sessions (username, logInTime) VALUES (?,?)',
                   (username, round(time.time())))
    connection.commit()
    connection.close()


def checkLogin(username):
    connection = sqlite3.connect('./databaseFiles/sessions.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT username, logInTime FROM sessions WHERE username=?', (username, )).fetchone()
    connection.close()
    if (result):
        return result[1] > (time.time() - 60*60*30)
    else:
        return False


def logout(username):
    if(username):
        connection = sqlite3.connect('./databaseFiles/sessions.db')
        cursor = connection.cursor()
        cursor.execute('DELETE FROM sessions WHERE username=?', (username,))
        connection.commit()
        connection.close()
