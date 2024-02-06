import urllib.parse

from fastapi.responses import PlainTextResponse
from fastapi.routing import APIRouter

from ..database import Events, LeagueClasses, Leagues


class SitemapBuilder:
    output: str
    url_base: str

    def __init__(self, url_base: str):
        self.output = ""
        self.url_base = url_base

    def add_url(self, route: str) -> None:
        escaped_route = urllib.parse.quote(route)
        self.output += f"{self.url_base}{escaped_route}\n"


static_urls = [
    "/",
    "/leagues",
    "/latest-results",
    "/about",
    "/developers",
    "/upload",
    "/upload/instructions",
    "/upload/file",
    "/upload/result",
    "/search",
]


router = APIRouter(tags=["Miscellaneous"])


@router.get("/sitemap.txt", response_class=PlainTextResponse)
async def sitemap() -> str:
    sitemap = SitemapBuilder(url_base="https://munroleagues.com")

    for url in static_urls:
        sitemap.add_url(url)

    for league in await Leagues.get_all():
        sitemap.add_url(f"/leagues/{league.name}")

        for course in await LeagueClasses.get_by_league(league.name):
            sitemap.add_url(f"/leagues/{league.name}/results/{course.name}")

    for event in await Events.get_all():
        sitemap.add_url(f"/events/{event.id}/results")

    return sitemap.output
