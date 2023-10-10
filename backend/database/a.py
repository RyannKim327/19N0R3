from db import database

db = database()

q = "19N0R3"

a = db.query(f"SELECT * FROM poems WHERE title LIKE '%{q}%' or content LIKE '%{1}%' JOIN RIGHT SELECT *, ID FROM users WHERE penname LIKE '%{q}%'")
print(a.fetchall())