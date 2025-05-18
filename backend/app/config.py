from dotenv import load_dotenv
from os import environ, path

load_dotenv()

class Config:
    SUPABASE_URL = environ.get('SUPABASE_URL')
    SUPABASE_KEY = environ.get('SUPABASE_KEY')
    SECRET_KEY = environ.get('SECRET_KEY', 'your_default_secret_key')
    DEBUG = environ.get('DEBUG', 'False').lower() in ('true', '1', 't')
    FLASK_RUN_PORT = int(environ.get('FLASK_RUN_PORT', 5000))
    FLASK_DEBUG = environ.get('FLASK_DEBUG', '0').lower() in ('true', '1', 't')
    FLASK_APP = environ.get('FLASK_APP', 'app:create_app')