from flask import Flask, render_template, jsonify, request, send_from_directory, current_app
from database.db import database
from hash import SolarSystem
import json, hashlib, os

def encrypt(text):
	return hashlib.sha1(text.encode()).hexdigest()

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def index():
	return render_template("a.html")

@app.route("/read/<int:poemID>")
def read(poemID):
	db = database()
	data = db.query(f"SELECT * FROM poems WHERE ID = {poemID}").fetchall()[0]
	author = db.query(f"SELECT * FROM users WHERE ID = {data[3]}").fetchall()[0][1]
	html = f"<title>{data[1]}</title>"
	html += f"<meta name='og:description' content='Author: {author}'>"
	html += f"<meta name='description' content='Author {author}'>"
	html += f"<meta name='og:title' content='{data[1]}'>"
	html += "<script>"
	html += "function setCookie(key, value){"
	html += "const date = new Date();"
	html += "date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));"
	html += "let xp = `expires=${date.toUTCString()}`;"
	html += "document.cookie = `${key}=${value};${xp};path=/`;"
	html += "}"
	html += f"setCookie('poemID', {poemID});"
	html += "location.href = '/../..';"
	html += "</script>"
	return html

@app.route("/login")
def login():
	return render_template("b.html")

@app.route("/test")
def test():
	return render_template("c.html")

@app.route("/download")
def download():
	return send_from_directory(directory=os.path.join(current_app.root_path, "static"), path="app.apk")

@app.route("/api/add-poem")
def addPoem():
	solar = SolarSystem()
	title = solar.encrypt("Sample")
	content = solar.encrypt("Sample content")
	db = database()
	db.query(f"INSERT INTO poems (title, author, content) VALUES ('{title}', 1, '{content}')")
	return "Done"

@app.route("/api/all-poems")
def getAllPoems():
	if request.args.get("p"):
		if request.args.get("p").isdigit():
			params = int(request.args.get("p")) - 1
		else: params = 0
	else:
		params = 0
	if params <= 0:
		params = 0
	limit = 15
	params = limit * params
	db = database()
	if request.args.get("q") == "":
		data = db.query(f"SELECT * FROM poems LEFT JOIN users ON poems.author = users.ID ORDER BY ID DESC LIMIT {params}, {limit}")
	else:
		q = request.args.get("q").replace("-", "").replace("'", "").replace('"', '')
		data = db.query(f"SELECT * FROM poems LEFT JOIN users ON poems.author = users.ID WHERE poems.title LIKE '%{q}%' OR poems.content LIKE '%{q}%' OR users.penname LIKE '%{q}%' ORDER BY ID DESC LIMIT {params}, {limit}")
	result = []
	for i in data.fetchall():
		user = db.query(f"SELECT * FROM users WHERE ID = {i[3]}").fetchall()[0]
		result.append({
			"ID": i[0],
			"title": i[1],
			"content": i[2],
			"author": user[1]
		})
	total = db.query("SELECT COUNT(*) FROM poems").fetchall()[0][0]
	return jsonify({
		"status": 200,
		"total": total,
		"data": result
	})

@app.route("/api/poem", methods=["POST"])
def getPoem():
	req = json.loads(request.data)['poemID']
	db = database()
	data = db.query(f"SELECT * FROM poems WHERE ID = {req}").fetchall()[0]
	user = db.query(f"SELECT * FROM users WHERE ID = {data[3]}").fetchall()[0][1]
	return jsonify({
		"ID": data[0],
		"title": data[1],
		"content": data[2],
		"author": user
	})

@app.route("/api/confirm-user", methods=["POST"])
def confirmUser():
	req = json.loads(request.data)
	username = req['username']
	db = database()
	data = db.query(f"SELECT * FROM users WHERE penname = '{username}' COLLATE NOCASE").fetchall()
	if len(data) > 0:
		return jsonify({
			"status": 200,
			"req": req,
			"msg": f"There are {len(data)} data/s",
			"total": len(data),
			"data": data
		})
	else:
		return jsonify({
			"status": 404,
			"mgs": "The credentials wasn't matched in any of the data we have, please try again"
		})

@app.route("/api/credentials", methods=["POST"])
def credentials():
	data = json.loads(request.data)
	db = database()
	username = data['username'].replace("'", "\'").replace('"', '\"').replace("--", "-")
	password = encrypt(data['password'])
	if data['password1'] == "":
		x = db.query(f"SELECT * FROM users WHERE password = '{password}' AND penname = '{username}' COLLATE NOCASE").fetchall()[0]
		if x:
			return jsonify({
				"status": 200,
				"ID": x[0],
				"username": x[1]
			})
		else:
			return jsonify({
				"status": 404,
				"msg": "Account not found"
			})
	else:
		if len(data['password']) >= 8:
			if encrypt(data['password1']) == password:
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

@app.route("/api/send-to-admin", methods=["POST"])
def sendToAdmin():
	data = json.loads(request.data)
	message = data['msg']
	time = data['time']
	zone = data['timezone']
	db = database()
	db.query(f"INSERT INTO reports (msg, time, timezone) VALUES ('{message}', '{time}', '{zone}')")
	return jsonify({
		"status": 200,
		"msg": "We sent a feedback to the developer"
	})

if __name__ == "__main__":
	app.debug = True
	app.run(host="0.0.0.0", port=5000)