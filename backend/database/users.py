import sqlite3
from passlib.hash import pbkdf2_sha256 as sha256

# Hash Functions
def generateHash(password):
    return sha256.hash(password)


def verifyHash(password, hash):
    return sha256.verify(password, hash)

# Convert SQL Tuple to JSON
def userToJSON(user):
    if user:
        return {
            'username': user[0],
            'password': user[1]
        }
    else:
        return False


# Set Up Database
connection = sqlite3.connect('./databaseFiles/2.db')
cursor = connection.cursor()
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        username TEXT NOT NULL,
        password TEXT NOT NULL,
        PRIMARY KEY (username),
        UNIQUE (username))''')
connection.commit()
connection.close()

# User Database Functions


def createUser(username, password):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    hash = generateHash(password)
    cursor.execute(
        'INSERT INTO users (username, password) VALUES (?,?)', (username, hash))
    connection.commit()
    connection.close()


def findUser(username):
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute(
        'SELECT username, password FROM users WHERE username = ?', (username,)).fetchone()
    connection.close()
    return userToJSON(result)


def getAllUsers():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    result = cursor.execute('SELECT username, password FROM users').fetchall()
    connection.close()
    return map(userToJSON, result)


def deleteAllUsers():
    connection = sqlite3.connect('./databaseFiles/2.db')
    cursor = connection.cursor()
    cursor.execute('DELETE FROM users')
    connection.commit()
    connection.close()
