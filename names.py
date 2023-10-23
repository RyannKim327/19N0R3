text = "19N0R3"
alpha = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz "
keyword = "MPOP Reverse II"
key = []
for i in range(len(keyword)):
	for j in range(len(alpha)):
		if alpha[j] == keyword[i]:
			key.append(j + 1)
			break

def encrypt(key, text):
	_ = ""
	x = 0
	for i in text:
		_ += chr(ord(i) + key[x])
		x += 1
		if x >= len(key):
			x = 0
	