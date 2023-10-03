from flask import Flask, render_template, jsonify, request
from database.db import database
import json, hashlib

def encrypt(text):
	return hashlib.sha1(text.encode()).hexdigest()

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def index():
	return render_template("a.html")

@app.route("/login")
def login():
	return render_template("b.html")

@app.route("/api/get-all-poems")
def getAllPoems():
	if request.args.get("n"):
		params = int(request.args.get("n")) - 1
	else:
		params = 0
	limit = 10
	params = limit * params
	db = database()
	data = db.query(f"SELECT * FROM poems ORDER BY ID LIMIT {params}, {limit}")
	result = []
	for i in data.fetchall():
		user = db.query(f"SELECT * FROM users WHERE ID = {i[3]}").fetchone()
		result.append({
			"ID": i[0],
			"title": i[1],
			"content": i[2],
			"author": user[1]
		})
	return jsonify({
		"status": 200,
		"data": result
	})

@app.route("/api/get-poem", methods=["POST"])
def getPoem():
	req = request.data.poemID
	db = database()
	data = db.query(f"SELECT * FROM poems WHERE ID = {req}").fetchall()
	return jsonify({
		"ID": data[0],
		"title": data[1],
		"content": data[2],
		"author": data[3]
	})

@app.route("/api/confirm-user", methods=["POST"])
def confirmUser():
	req = json.loads(request.data)
	username = req['username']
	db = database()
	data = db.query(f"SELECT * FROM users WHERE penname = '{username}' COLLATE NOCASE").fetchall()
	return jsonify({
		"status": 200,
		"req": req,
		"msg": f"There are {len(data)} data/s",
		"total": len(data),
		"data": data
	})

@app.route("/api/credentials", methods=["POST"])
def credentials():
	data = json.loads(request.data)
	db = database()
	username = data['username'].replace("'", "\'").replace('"', '\"').replace("--", "- - ")
	password = encrypt(data['password'])
	if data['password1'] == "":
		x = db.query(f"SELECT * FROM users WHERE password = '{password}' AND penname = '{username}' COLLATE NOCASE").fetchone()
		if x:
			return jsonify({
				"status": 200,
				"ID": x[0],
				"username": x[1]
			})
		else:
			return jsonify({
				"status": 500,
				"msg": "Account not found"
			})
	else:
		if len(data['password']) >= 8:
			if encrypt(data['password1']) == password:
				username = username.replace("--", "-").replace("'", "").replace('"', "")
				db = database()
				db.query(f"INSERT INTO users (username, password) VALUES ('{username}', '{password}')")
				return jsonify({
					"status": 200,
					"msg": "New account Created successfully",
					"username": username
				})
			else:
				return jsonify({
					"status": 500,
					"msg": "Password not match"
				})
		else:
			return jsonify({
				"status": 500,
				"msg": "Password must be 8 characters"
			})