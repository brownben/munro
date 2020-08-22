from flask import Flask, render_template, request, send_from_directory
from flask_compress import Compress
from flask_cors import CORS
from flask_restful import Api
from flask_talisman import Talisman
import os
import json

from routes import *


# Set up Flask with plugins
app = Flask(__name__, static_folder="./dist/static", template_folder="./dist")
api = Api(app)

CORS(app, resources={r"/api/*": {"origins": "*"}})
Compress(app)


if not app.debug:
    talisman = Talisman(
        app,
        frame_options="ALLOW_FROM",
        frame_options_allow_from="*",
        content_security_policy={
            "script-src": "'self' 'sha256-4RS22DYeB7U14dra4KcQYxmwt5HkOInieXK1NUMBmQI=' storage.googleapis.com",
            "default-src": "'self'",
            "style-src": "'self' 'unsafe-inline'",
            "connect-src": "'self' identitytoolkit.googleapis.com https://www.p.fne.com.au/",
        },
    )
else:
    from developmentForwarding import forwardToVue


@api.representation("application/json")
def output_json(data, code, headers):
    resp = app.make_response((json.dumps(data), code))
    resp.headers.extend({"X-Robots-Tag": "noindex", "max-age": 0})
    return resp


# Bind all logic with the routes
api.add_resource(leagues.Leagues, "/api/leagues")
api.add_resource(leagues.League, "/api/leagues/<name>")
api.add_resource(leagueEvents.LeagueEvents, "/api/leagues/<name>/events")
api.add_resource(
    leagueEvents.LeagueEventsWithUploadKey, "/api/leagues/<name>/events/uploadKey",
)
api.add_resource(
    leagueResults.ResultsForCourse, "/api/leagues/<name>/results/<course>",
)

api.add_resource(events.Events, "/api/events")
api.add_resource(events.EventsWithUploadKey, "/api/events/uploadKey")
api.add_resource(events.Event, "/api/events/<eventId>")
api.add_resource(events.EventWithUploadKey, "/api/events/<eventId>/uploadKey")
api.add_resource(
    resultsRecalculate.EventRecalculateResults,
    "/api/events/<eventId>/results/recalculate",
)
api.add_resource(
    eventsLatestResults.EventsLatestWithResults, "/api/events/latest-results",
)

api.add_resource(competitors.Competitors, "/api/competitors")
api.add_resource(competitorMerge.CompetitorMerge, "/api/competitors/merge")
api.add_resource(competitors.Competitor, "/api/competitors/<competitorId>")

api.add_resource(results.Results, "/api/results")
api.add_resource(resultsManual.ManualResult, "/api/results/manual")
api.add_resource(resultsTransfer.TransferResult, "/api/results/transfer")
api.add_resource(results.Result, "/api/results/<resultId>")
api.add_resource(eventResults.ResultsForEvent, "/api/events/<eventId>/results")
api.add_resource(
    competitorResults.ResultsForCompetitor, "/api/competitors/<competitorId>/results",
)

api.add_resource(uploadFile.Upload, "/api/upload")
api.add_resource(uploadStream.UploadStream, "/api/upload/stream")
api.add_resource(uploadResult.UploadResult, "/api/upload/result")

api.add_resource(search.Search, "/api/search")

# Serve app files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    # If in debug access files from VueJS Development Server
    if app.debug:
        return forwardToVue(path)

    return render_template("index.html")


@app.route("/api/<path:path>")
def api_catch_all(path):
    return {}


@app.route("/robots.txt")
@app.route("/manifest.json")
@app.route("/service-worker.js")
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:], cache_timeout=0)


if __name__ == "__main__":
    app.run()
