from flask_cors import CORS

def init_cors(app):
    """
    Initialize CORS for the Flask app.
    """
    # Allow all domains to access the API
    CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})
    # CORS(app, supports_credentials=True)