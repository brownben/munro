import routes
import os

import requests
from flask import Flask, render_template, session
from flask_compress import Compress
from flask_cors import CORS
from flask_restful import Api

# Set up Flask with plugins
app = Flask(__name__,
            static_folder="../dist/static",
            template_folder="../dist")
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
api = Api(app)
compress = Compress(app)
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

api.add_resource(routes.Competitors, '/api/competitors')

api.add_resource(routes.Results, '/api/results')

api.add_resource(routes.Upload, '/api/upload')

# Serve app files


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    # If in debug access files from VueJS Development Server
    #if app.debug:
    #   return requests.get('http://localhost:8080/{}'.format(path)).text
    return render_template("index.html")


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
