import random

f = [
    "Nicanor",
    "Eleonora",
    "Sebastian",
    "Enrico",
    "Rene",
    "Mario",
    "Maria",
    "Antonio",
    "Eliazar"
]

l = [
    "De Jesus",
    "De Dios",
    "Martinez",
    "Tianco",
    "Dela Cruz",
    "Cruz",
    "Ramos",
    "Dela Peña",
    "Delos Reyes",
    "Reyes"
]

x = ["Nicanor Mercado"]
y = 1
while(y <= 60):
    f1 = f[random.randint(0, len(f) - 1)]
    l1 = l[random.randint(0, len(l) - 1)]
    n = f1 + " " + l1
    if not n in x:
        x.append(n)
        print(y, n)
        y += 1
