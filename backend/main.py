from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route("/")
def index():
	return render_template("a.html")