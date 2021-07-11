from typing import Any, Dict
from flask import (
    Flask,
    Blueprint,
    request,
    send_from_directory,
    wrappers,
    redirect,
    g,
    Response,
)

# Monkey patch flask so it works for flask_restx
import flask.scaffold

flask.helpers._endpoint_from_view_func = flask.scaffold._endpoint_from_view_func  # type: ignore

from flask_compress import Compress
from flask_cors import CORS
from flask_talisman import Talisman
from flask_restx import Api

from .database.initialize import setup as initializeDatabase

from .routes.league import api as leagueRoutes
from .routes.event import api as eventRoutes
from .routes.competitor import api as competitorRoutes
from .routes.result import api as resultRoutes
from .routes.search import api as searchRoutes
from .routes.upload import api as uploadRoutes
from .routes.sitemap import generate_sitemap

# Set up Flask with plugins
STATIC_FOLDER = "./dist/static"
app = Flask(__name__, static_folder=STATIC_FOLDER, template_folder="./dist")
blueprint = Blueprint("api", __name__, url_prefix="/api")
api = Api(
    blueprint,
    title="Munro API",
    description="Get League, Event, Competitor and Results from Munro",
    validate=True,
)
app.url_map.strict_slashes = False
app.register_blueprint(blueprint)
CORS(app, resources={r"/api/*": {"origins": "*"}})
Compress(app)


if not app.debug:
    talisman = Talisman(
        app,
        frame_options="ALLOW_FROM",
        frame_options_allow_from="*",
        content_security_policy={
            "script-src": "'self' 'sha256-7znq/89hS4wzz2/DYmbizPP16RYMnUCUVak3lYPZl+c=' storage.googleapis.com",
            "default-src": "'self'",
            "style-src": "'self' 'unsafe-inline'",
            "connect-src": "'self' identitytoolkit.googleapis.com https://www.p.fne.com.au/",
        },
    )

# Register Routes
api.add_namespace(leagueRoutes, path="/leagues")
api.add_namespace(eventRoutes, path="/events")
api.add_namespace(competitorRoutes, path="/competitors")
api.add_namespace(resultRoutes, path="/results")
api.add_namespace(searchRoutes, path="/search")
api.add_namespace(uploadRoutes, path="/upload")

# Intialise and Teardown Database
# Database connection created and added to context for request in database/database.py

with app.app_context():
    initializeDatabase()


@app.teardown_appcontext
def teardownDatabase(exception: BaseException = None) -> Response:
    db = g.pop("db", None)

    if db is not None:
        db.close()

    return Response()


# Serve app files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def catch_all(path: str):
    return redirect("https://munroleagues.com" + request.path, 301)


@app.route("/api/<path:path>")
def api_catch_all(path: str) -> Dict[str, Any]:
    return {}


@app.route("/sitemap.txt")
def sitemap() -> wrappers.Response:
    return wrappers.Response(generate_sitemap(), mimetype="text/plain")


@app.route("/service-worker.js")
def static_from_root() -> wrappers.Response:
    return send_from_directory(STATIC_FOLDER, request.path[1:], cache_timeout=0)


if __name__ == "__main__":
    app.run()
