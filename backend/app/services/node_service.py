from flask import current_app

def get_Nodes():
    supabase = current_app.supabase
    response = supabase.table('nodes').select('*').execute()
    return response.data