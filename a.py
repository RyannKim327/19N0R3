from backend.database.db import database

db = database()

a = db.query("SELECT * FROM poems WHERE ID = 1 UNION SELECT * FROM users WHERE penname LIKE '%19N0R3%'")
print(a)