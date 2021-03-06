import os
import psycopg2
from flask import g
from typing import Any, Tuple

DATABASE_URL = os.environ.get("DATABASE_URL", "")


class DatabaseConnection:
    def __init__(self) -> None:
        self.connection = psycopg2.connect(DATABASE_URL)
        self.cursor = self.connection.cursor()

    def execute(self, string: str, values=tuple()) -> None:
        self.cursor.execute(string, values)

    def getResult(self) -> Any:
        return self.cursor.fetchone()

    def getResults(self) -> Tuple[Any]:
        return self.cursor.fetchall()

    def commit(self) -> None:
        self.connection.commit()

    def close(self) -> None:
        self.connection.commit()
        self.connection.close()


def getDatabaseConnection() -> DatabaseConnection:
    if "db" not in g:
        g.db = DatabaseConnection()

    return g.db


def query(query: str, values=tuple()) -> None:
    connection = getDatabaseConnection()
    connection.execute(query, values)
    connection.commit()


def queryWithResult(query: str, values=tuple()) -> Any:
    connection = getDatabaseConnection()
    connection.execute(query, values)
    result = connection.getResult()
    return result


def queryWithResults(query: str, values=tuple()) -> Tuple[Any]:
    connection = getDatabaseConnection()
    connection.execute(query, values)
    result = connection.getResults()
    return result
