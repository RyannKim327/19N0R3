from flask import jsonify
from main import app
from database

@app.route("/api/getAllPoems")
def getAllPoems():
    db =