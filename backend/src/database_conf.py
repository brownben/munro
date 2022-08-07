import os

from piccolo.engine.postgres import PostgresEngine

DB = PostgresEngine({"dsn": os.environ["DATABASE_URL"]})
