import os
from supabase import create_client, Client

supabase: Client = None

def init_supabase(app):
    global supabase
    url = app.config["SUPABASE_URL"]
    key = app.config["SUPABASE_KEY"]
    app.supabase = create_client(url, key)