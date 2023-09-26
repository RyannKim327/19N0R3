from flask import jsonify
from main import app
from database.db import database

@app.route("/api/getAllPoems")
def getAllPoems():
    db = database()
    data = db.query("SELECT * FROM poems")
    result = []
    for i in data
    return jsonify({
        "status": 200,
        "data": result
    })