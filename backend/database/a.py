from db import database

db = database()

q = "19N0R3"

a = db.query(f"SELECT title FROM poems WHERE title LIKE '%{q}%' or content LIKE '%{1}%' UNION SELECT penname FROM users WHERE penname LIKE '%{q}%'")
print(a.fetchall())