from flask import Flask, render_template, jsonify
from database.db import database

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def index():
	return render_template("a.html")



@app.route("/api/getAllPoems")
def getAllPoems():
	db = database()
	data = db.query("SELECT * FROM poems ORDER BY ID DESC")
	result = []
	for i in data.fetchall():
		user = db.query(f"SELECT * FROM users WHERE ID = {i[3]}").fetchone()
		result.append({
			"id": i[0],
			"title": i[1],
			"content": i[2],
			"author": user[1]
		})
	return jsonify({
		"status": 200,
		"data": result
	})

