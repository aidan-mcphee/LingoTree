from flask import Flask

from .routes.api_routes import api_bp
from .config import Config
from .extensions.supabase import init_supabase
from .extensions.flask_cors import init_cors

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    register_blueprints(app)
    register_extensions(app)
    
    print("App initiialized, routes = ", app.url_map)

    return app

def register_blueprints(app):
    app.register_blueprint(api_bp, url_prefix='/')

def register_extensions(app):
    init_supabase(app)
    init_cors(app)