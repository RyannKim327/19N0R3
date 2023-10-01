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

x = []
y = 1
while(y < 60){
    f1 = random.randint(0, len(f))
    l1 = random.randint(0, len(l))
    n = f1 + " " l1
    if not n in x:
        x.append(n)
        print()
        y += 1
}