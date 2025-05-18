from app import create_app

# Create the Flask application using the factory pattern
app = create_app()

# Expose the app as 'application' for WSGI compatibility
application = app