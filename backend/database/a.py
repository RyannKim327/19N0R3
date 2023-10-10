from db import database

db = database()

q = "19N0R3"

a = db.query(f"SELECT * FROM poems WHERE title LIKE '%{q}%' or content LIKE '%{1}%' RIGHT JOIN ON poems.ID = users.ID")
print(a.fetchall())