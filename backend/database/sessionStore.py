import sqlite3
import time

# Set up session store database
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
    # Place new record in database for the new session, clearing any old sessions
    connection = sqlite3.connect('./databaseFiles/sessions.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM sessions WHERE username=?', (username,))
    cursor.execute('INSERT INTO sessions (username, logInTime) VALUES (?,?)',
                   (username, round(time.time())))
    connection.commit()
    connection.close()


def checkLogin(username):
    # Check session exists for user and that their session has not timed out (30min)
    connection = sqlite3.connect('./databaseFiles/sessions.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT username, logInTime FROM sessions WHERE username=?', (username, )).fetchone()
    connection.close()
    if (result):
        return result[1] > (time.time() - 60*30)
    else:
        return False


def logout(username):
    # Remove all sessions for the user
    if(username):
        connection = sqlite3.connect('./databaseFiles/sessions.db')
        cursor = connection.cursor()
        cursor.execute('DELETE FROM sessions WHERE username=?', (username,))
        connection.commit()
        connection.close()
