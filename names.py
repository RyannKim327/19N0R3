text = "19N0R3"
key = [13, 16, 15, 16]
_ = ""
x = 0
for i in text:
	_ += ord(i) + key
	x += 1
	if x >= len(key):
		x = 0