from db import database

db = database()

q = "19N0R3"

a = db.query(f"SELECT * FROM poems RIGHT JOIN users ON poems.ID = users.ID WHERE title LIKE '%{q}%' or content LIKE '%{q}%' ")
print(a.fetchall())