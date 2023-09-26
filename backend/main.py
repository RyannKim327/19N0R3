from flask import Flask, jsonify, render_template

app = Flask(__name__, static_files)

@app.route("/")
def index():
	return render_template("a.html")