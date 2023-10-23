import sqlite3

class database:
	def __init__(self):
		self.dbase = sqlite3.connect("backend/database/b.sqlite", check_same_thread=False)
		self.cur = self.dbase.cursor()
		self.cur.execute("""
			CREATE TABLE IF NOT EXISTS poems (
				'ID' INTEGER PRIMARY KEY NOT NULL,
				'title' TEXT,
				'content' TEXT,
				'author' INTEGER
			)
		""")
		self.cur.execute("""
			CREATE TABLE IF NOT EXISTS users (
				'ID' INTEGER PRIMARY KEY NOT NULL,
				'penname' TEXT,
				'password' TEXT
			)
		""")
		self.cur.execute("""
			CREATE TABLE IF NOT EXISTS reports (
				'ID' INTEGER PRIMARY KEY NOT NULL,
				'msg' TEXT,
				'time' TEXT,
				'timezone' TEXT
			)
		""")

	def query(self, query: str):
		a = self.cur.execute(query)
		if not "SELECT" in query:
			self.dbase.commit()
			return "Done"
		else:
			return a