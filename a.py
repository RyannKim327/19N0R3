from backend.database.db import database

db = database()

a = db.query("")
print(a)