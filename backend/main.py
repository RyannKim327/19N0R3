from flask import Flask, render_template, jsonify
from database.db import database

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def index():
	return render_template("a.html")



@app.route("/api/getAllPoems")
def getAllPoems():
	db = database()
	data = db.query("SELECT * FROM poems")
	result = []
	for i in data.fetchall():
		result.append(i)
		# result.append({
		# 	"id": i['id'],
		# 	"title": i['title'],
		# 	"content": i['content'],
		# 	"author": i['author']
		# })
	return jsonify({
		"status": 200,
		"data": result
	})