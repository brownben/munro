import routes
import os

import requests
from flask import Flask, render_template, session, request, send_from_directory
from flask_compress import Compress
from flask_cors import CORS
from flask_restful import Api
from flask_talisman import Talisman

# Set up Flask with plugins
app = Flask(__name__,
            static_folder="./dist/static",
            template_folder="./dist")
api = Api(app)
CORS(app, resources={r"/api/*": {"origins": "*"}})
Compress(app)

talisman = Talisman(
    app,
    frame_options='ALLOW_FROM',
    frame_options_allow_from='*',
    content_security_policy={
        'default-src': "'self' www.googleapis.com",
        'img-src': '*',
        'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
        'font-src': 'fonts.googleapis.com fonts.gstatic.com'
    }
)
app.secret_key = os.urandom(25)

# Bind all logic with the routes
api.add_resource(routes.Leagues, '/api/leagues')
api.add_resource(routes.League, '/api/leagues/<name>')
api.add_resource(routes.LeagueEvents, '/api/leagues/<name>/events')
api.add_resource(routes.LeagueEventsWithUploadKey,
                 '/api/leagues/<name>/events/uploadKey')
api.add_resource(routes.ResultsForCourse,
                 '/api/leagues/<name>/results/<course>')

api.add_resource(routes.Events, '/api/events')
api.add_resource(routes.EventsWithUploadKey, '/api/events/uploadKey')
api.add_resource(routes.Event, '/api/events/<id>')
api.add_resource(routes.EventWithUploadKey, '/api/events/<id>/uploadKey')
api.add_resource(routes.ResultsForEvent, '/api/events/<id>/results')

api.add_resource(routes.Competitors, '/api/competitors')
api.add_resource(routes.CompetitorMerge, '/api/competitors/merge')
api.add_resource(routes.Competitor, '/api/competitors/<id>')
api.add_resource(routes.ResultsForCompetitor, '/api/competitors/<id>/results')

api.add_resource(routes.Results, '/api/results')
api.add_resource(routes.TransferResult, '/api/results/transfer')

api.add_resource(routes.Upload, '/api/upload')

# Serve app files


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # If in debug access files from VueJS Development Server
    # if app.debug:
    #    return requests.get('http://localhost:8080/{}'.format(path)).text
    return render_template("index.html")


@app.route('/robots.txt')
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:])


if __name__ == "__main__":
    app.run()
