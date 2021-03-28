import urllib.parse

from ..database.league import League
from ..database.event import Event
from ..database.competitor import Competitor

static_urls = [
    "/",
    "/search",
    "/leagues",
    "/latest-results",
    "/about",
    "/developers",
    "/upload",
    "/upload/instructions",
    "/upload/file",
    "/upload/maprun",
    "/upload/result",
]


class SitemapBuilder:
    output: str
    url_base: str

    def __init__(self, url_base: str):
        self.output = ""
        self.url_base = url_base

    def add_url(self, route: str) -> None:
        escaped_route = urllib.parse.quote(route)
        self.output += f"{self.url_base}{escaped_route}\n"


def generate_sitemap() -> str:
    sitemap = SitemapBuilder(url_base="https://munroleagues.com")

    for url in static_urls:
        sitemap.add_url(url)

    leagues = League.getAll()
    for league in leagues:
        sitemap.add_url(f"/leagues/{league.name}")
        sitemap.add_url(f"/leagues/{league.name}/results/Overall")

        for course in league.courses:
            sitemap.add_url(f"/leagues/{league.name}/results/{course}")

        if league.dynamicEventResults:
            events = Event.getByLeague(league.name)
            for event in events:
                sitemap.add_url(f"/events/{event.id}/results")

    competitors = Competitor.getAll()
    for competitor in competitors:
        sitemap.add_url(f"/competitors/{competitor.id}")

    return sitemap.output
