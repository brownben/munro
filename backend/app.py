from flask import (
    Flask,
    Blueprint,
    request,
    render_template,
    send_from_directory,
)
from flask_compress import Compress
from flask_cors import CORS
from flask_talisman import Talisman
from flask_restx import Api

from .database import setup as initializeDatabase

from .routes.league import api as leagueRoutes
from .routes.event import api as eventRoutes
from .routes.competitor import api as competitorRoutes
from .routes.result import api as resultRoutes
from .routes.search import api as searchRoutes


# Set up Flask with plugins
app = Flask(__name__, static_folder="./dist/static", template_folder="./dist")
blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(
    blueprint,
    title="Munro API",
    description="Get League, Event, Competitor and Results from Munro",
    validate=True,
)
app.register_blueprint(blueprint)
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

# Register Routes + Initilize Database
initializeDatabase()
api.add_namespace(leagueRoutes, path="/leagues")
api.add_namespace(eventRoutes, path="/events")
api.add_namespace(competitorRoutes, path="/competitors")
api.add_namespace(resultRoutes, path="/results")
api.add_namespace(searchRoutes, path="/search")


# Serve app files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path):
    return render_template("index.html")


@app.route("/api/<path:path>")
def api_catch_all():
    return {}


@app.route("/robots.txt")
@app.route("/manifest.json")
@app.route("/service-worker.js")
def static_from_root():
    return send_from_directory(app.static_folder, request.path[1:], cache_timeout=0)


if __name__ == "__main__":
    app.run()
