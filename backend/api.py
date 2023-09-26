from flask import jsonify
class api:
    def __init__(self, app):
        self.app = app
    
    @app.route("")