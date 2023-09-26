import sqlite3, hashlib, json

class database:
	def __init__(self):
		self.dbase = sqlite3.connect("backend/database/a.sqlite")
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

	def query(self, query: str):
		a = self.cur.execute(query)
		if not "SELECT" in query:
			self.dbase.commit()
		return a
	
	def createAccount(self, username: str, password: str, retype: str):
		password = hashlib.sha1(password.encode()).hexdigest()
		retype = hashlib.sha1(retype.encode()).hexdigest()
		if password != retype:
			return "Password not match"
		if len(password) < 8:
			return "Password must atleast 8 characters long"
		
		a = self.query(f"SELECT * FROM users WHERE penname = '{username}'").fetchall()
		if len(a) > 0:
			return "User is already existsed"
		else:
			self.query(f"""
				INSERT INTO users (penname, password) VALUES ('{username}', '{password}')
			""")
			return "Account created"