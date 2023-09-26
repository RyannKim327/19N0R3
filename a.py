import sqlite3, os

class database:
	def __init__(self):
		self.dbase = sqlite3.connect("a.sqlite")
		self.cur = self.dbase.cursor()
		self.cur.execute("""
			CREATE TABLE IF NOT EXISTS users (
				'ID' INTEGER PRIMARY KEY NOT NULL,
				'username' TEXT,
				'password' TEXT
			)
		""")

	def query(self, query: str):
		a = self.cur.execute(query)
		if not query.lower().startswith("select"):
			self.dbase.commit()
			return "Done"
		else:
			return a.fetchall()

if __name__ == "__main__":
	db = database()
	while True:
		try:
			query = input("Please enter your query here below\n\n$ ")
			while not query.endswith(";"):
				query += input("")
			print(db.query(query))
		except Exception as ex:
			print(ex)
		input()
		if os.system("cls"):
			os.system("clear")
