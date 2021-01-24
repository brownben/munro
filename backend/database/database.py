import os
import psycopg2
from typing import Any, Tuple

DATABASE_URL = os.environ.get("DATABASE_URL", "")


class DatabaseConnection:
    def __init__(self):
        self.connection = psycopg2.connect(DATABASE_URL, sslmode="require")
        self.cursor = self.connection.cursor()

    def execute(self, string: str, values=tuple()):
        self.cursor.execute(string, values)

    def getResult(self):
        return self.cursor.fetchone()

    def getResults(self):
        return self.cursor.fetchall()

    def close(self):
        self.connection.commit()
        self.connection.close()


def query(query: str, values=tuple()) -> None:
    connection = DatabaseConnection()
    connection.execute(query, values)
    connection.close()


def queryWithResult(query: str, values=tuple()) -> Any:
    connection = DatabaseConnection()
    connection.execute(query, values)
    result = connection.getResult()
    connection.close()
    return result


def queryWithResults(query: str, values=tuple()) -> Tuple[Any]:
    connection = DatabaseConnection()
    connection.execute(query, values)
    result = connection.getResults()
    connection.close()
    return result
