text = "19N0R3"
alpha = "AaBbCcdefghijklmnopqrstuvwxyz"
key = [13, 16, 15, 16]
_ = ""
x = 0
for i in text:
	_ += chr(ord(i) + key[x])
	x += 1
	if x >= len(key):
		x = 0

print(_)