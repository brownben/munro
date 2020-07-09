from flask import Flask, render_template, request, send_from_directory
from flask_compress import Compress
from flask_cors import CORS
from flask_restful import Api
from flask_talisman import Talisman
import os
import json

# import requests # Enable for Development Forwarding

import competitorRoutes
import eventRoutes
import leagueRoutes
import resultRoutes
import uploadRoutes


# Set up Flask with plugins
app = Flask(__name__, static_folder="./dist/static", template_folder="./dist")
api = Api(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})
Compress(app)


talisman = Talisman(
    app,
    frame_options="ALLOW_FROM",
    frame_options_allow_from="*",
    content_security_policy={
        "script-src": "'self' 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI=' storage.googleapis.com",
        "default-src": "'self' www.googleapis.com",
        "img-src": "*",
        "style-src": "'self' 'unsafe-inline' fonts.googleapis.com",
        "font-src": "'self' fonts.googleapis.com fonts.gstatic.com",
    },
)
app.secret_key = os.urandom(25)


@api.representation("application/json")
def output_json(data, code, headers):
    resp = app.make_response((json.dumps(data), code))
    resp.headers.extend({"X-Robots-Tag": "noindex", "max-age": 0})
    return resp


# Bind all logic with the routes
api.add_resource(leagueRoutes.Leagues, "/api/leagues")
api.add_resource(leagueRoutes.League, "/api/leagues/<name>")
api.add_resource(leagueRoutes.LeagueEvents, "/api/leagues/<name>/events")
api.add_resource(
    leagueRoutes.LeagueEventsWithUploadKey,
    "/api/leagues/<name>/events/uploadKey",
)
api.add_resource(
    resultRoutes.ResultsForCourse, "/api/leagues/<name>/results/<course>"
)

api.add_resource(eventRoutes.Events, "/api/events")
api.add_resource(eventRoutes.EventsWithUploadKey, "/api/events/uploadKey")
api.add_resource(eventRoutes.Event, "/api/events/<eventId>")
api.add_resource(
    eventRoutes.EventWithUploadKey, "/api/events/<eventId>/uploadKey"
)
api.add_resource(
    eventRoutes.EventsLatestWithResults, "/api/events/latest-results"
)

api.add_resource(competitorRoutes.Competitors, "/api/competitors")
api.add_resource(competitorRoutes.CompetitorMerge, "/api/competitors/merge")
api.add_resource(competitorRoutes.Competitor, "/api/competitors/<competitorId>")

api.add_resource(resultRoutes.Results, "/api/results")
api.add_resource(resultRoutes.ManualResult, "/api/results/manual")
api.add_resource(resultRoutes.TransferResult, "/api/results/transfer")
api.add_resource(resultRoutes.ResultsForEvent, "/api/events/<eventId>/results")
api.add_resource(
    resultRoutes.ResultsForCompetitor,
    "/api/competitors/<competitorId>/results",
)

api.add_resource(uploadRoutes.Upload, "/api/upload")

# Serve app files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # If in debug access files from VueJS Development Server
    """
    if app.debug:
        return requests.get("http://localhost:8080/{}".format(path)).text
    """
    return render_template("index.html")


@app.route("/api/<path:path>")
def api_catch_all(path):
    return {}


@app.route("/robots.txt")
@app.route("/manifest.json")
@app.route("/service-worker.js")
def static_from_root():
    return send_from_directory(
        app.static_folder, request.path[1:], cache_timeout=0
    )


if __name__ == "__main__":
    app.run()
