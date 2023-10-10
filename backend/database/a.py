from db import database

db = database()

q = "sana"

a = db.query(f"SELECT * FROM poems RIGHT JOIN users ON poems.author = users.ID WHERE poems.title LIKE '%{q}%' OR poems.content LIKE '%{q}%' OR users.penname LIKE '%{q}%'")
print(a.fetchall())