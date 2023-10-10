from db import database

db = database()

q = "19N0R3"

a = db.query(f"SELECT * FROM poems RIGHT JOIN users ON poems.author = users.ID WHERE poems.title LIKE '%{q}%' OR poems.content LIKE '%{q}%' OR users.penname LIKE '%{q}%' ORDER BY poems.ID DESC LIMIT 5")
print(a.fetchall())