import os
from typing import cast

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from piccolo.engine import engine_finder
from piccolo.engine.postgres import PostgresEngine

from .routes.competitor_pools import router as competitor_pools_router
from .routes.competitors import router as competitors_router
from .routes.events import router as events_router
from .routes.leagues import router as leagues_router
from .routes.misc import router as misc_router
from .routes.results import router as results_router
from .routes.search import router as search_router
from .routes.sitemap import router as sitemap_router
from .routes.upload import router as upload_router

os.environ["PICCOLO_CONF"] = "src.database_conf"

app = FastAPI(
    title="Munro Leagues",
    description="League Results. Sorted. The easiest way to calculate results for a series of sporting events",
    version="2.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)
app.add_middleware(GZipMiddleware)


app.include_router(competitors_router)
app.include_router(competitor_pools_router)
app.include_router(events_router)
app.include_router(leagues_router)
app.include_router(misc_router)
app.include_router(results_router)
app.include_router(search_router)
app.include_router(sitemap_router)
app.include_router(upload_router)


@app.on_event("startup")
async def open_database_connection_pool() -> None:  # coverage: ignore
    try:
        if engine := engine_finder():
            await cast(PostgresEngine, engine).start_connection_pool()
    except Exception:
        print("Unable to connect to the database")


@app.on_event("shutdown")
async def close_database_connection_pool() -> None:  # coverage: ignore
    try:
        if engine := engine_finder():
            await cast(PostgresEngine, engine).close_connection_pool()
    except Exception:
        print("Unable to connect to the database")
