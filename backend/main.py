from flask import Flask, render_template
from api import api

app = Flask(__name__, static_url_path="/static")

@app.route("/")
def index():
	return render_template("a.html")

api