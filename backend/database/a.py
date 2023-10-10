from db import database

db = database()



a = db.query("SELECT title FROM poems WHERE ID = 1 UNION SELECT penname FROM users WHERE penname LIKE '%19N0R3%'")
print(a.fetchall())