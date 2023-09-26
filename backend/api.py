from flask import jsonify
from main import app
from database import database

@app.route("/api/getAllPoems")
def getAllPoems():
    db = database()