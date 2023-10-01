import random

name_pairs = [
    ("Emma", "Liam"),
    ("Olivia", "Noah"),
    ("Sophia", "Jackson"),
    ("Ava", "Aiden"),
    ("Isabella", "Lucas"),
    ("Mia", "Ethan"),
    ("Amelia", "Oliver"),
    ("Harper", "Elijah"),
    ("Evelyn", "Grayson"),
    ("Abigail", "Logan"),
    ("Aria", "Mason"),
    ("Ella", "Carter"),
    ("Scarlett", "Caleb"),
    ("Chloe", "Henry"),
    ("Lily", "Samuel"),
    ("Zoey", "Leo"),
    ("Layla", "Alexander"),
    ("Riley", "Benjamin"),
    ("Nora", "Jack"),
    ("Mila", "Wyatt"),
    ("Aubrey", "Owen"),
    ("Aurora", "James"),
    ("Hannah", "Lincoln"),
    ("Penelope", "Dylan"),
    ("Addison", "Ethan"),
    ("Scarlett", "Wyatt"),
    ("Brooklyn", "Jackson"),
    ("Sofia", "Levi"),
    ("Victoria", "Caleb"),
    ("Eleanor", "Daniel"),
    ("Ellie", "Mateo"),
    ("Stella", "Julian"),
    ("Hailey", "Grayson"),
    ("Aaliyah", "Leo"),
    ("Lucy", "Isaiah"),
    ("Elizabeth", "Eli"),
    ("Luna", "Aaron"),
    ("Willow", "Charles"),
    ("Hannah", "Josiah"),
    ("Hazel", "Hudson"),
    ("Grace", "Christopher"),
    ("Addison", "Lincoln"),
    ("Paisley", "Andrew"),
    ("Gabriella", "Isaac"),
    ("Scarlett", "Joshua"),
    ("Savannah", "Adrian"),
    ("Zoey", "Jack"),
    ("Skylar", "Logan"),
    ("Bella", "David")
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
