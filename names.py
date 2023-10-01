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

surnames = [
	"Smith",
	"Johnson",
	"Williams",
	"Brown",
	"Jones",
	"Miller",
	"Davis",
	"García",
	"Rodriguez",
	"Martinez",
	"Hernandez",
	"López",
	"Gonzalez",
	"Perez",
	"Wilson",
	"Anderson",
	"Thomas",
	"Taylor",
	"Moore",
	"Jackson",
	"Martin",
	"Lee",
	"Harris",
	"Clark",
	"Lewis",
	"Walker",
	"Hall",
	"Young",
	"Allen",
	"King",
	"Wright",
	"Scott",
	"Hill",
	"Green",
	"Adams",
	"Baker",
	"Nelson",
	"Carter",
	"Mitchell",
	"Perez",
	"Roberts",
	"Turner",
	"Phillips",
	"Campbell",
	"Parker",
	"Evans",
	"Edwards",
	"Collins",
	"Stewart",
	"Sanchez",
	"Morris",
	"Rogers",
	"Reed",
	"Cook",
	"Morgan",
	"Bell",
	"Murphy",
	"Bailey",
	"Rivera",
	"Cooper",
	"Richardson",
	"Cox",
	"Howard",
	"Ward",
	"Torres",
	"Peterson",
	"Gray",
	"Ramirez",
	"James",
	"Watson",
	"Brooks",
	"Kelly",
	"Sanders",
	"Price",
	"Bennett",
	"Wood",
	"Barnes",
	"Ross",
	"Henderson",
	"Coleman",
	"Jenkins",
	"Perry",
	"Powell",
	"Long",
	"Patterson",
	"Hughes",
	"Flores",
	"Washington",
	"Butler",
	"Simmons",
	"Foster",
	"Gonzales",
	"Bryant",
	"Alexander",
	"Russell",
	"Griffin",
	"Diaz",
	"Hayes",
	"Myers",
	"Ford",
	"Hamilton"
]

f = ""

if random.randint(0, 1) == 1:
	n = random.randint(0, len(name_pairs) - 1)
	n2 = random.randint(0, len(name_pairs) - 1)
	l = random.randint(0, len(surnames) - 1)
	f += f"{name_pairs[n][0]} {name_pairs[n2][1]} {surnames[l]}"
else:
	n = random.randint(0, len(name_pairs) - 1)
	l = random.randint(0, len(surnames) - 1)
	f += f"{name_pairs[n]} {surnames[l]}"

print(f)