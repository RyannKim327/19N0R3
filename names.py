text = "19N0R3"
alpha = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz "
keyword = "MPOP Reverse II"
key = []
for i in range(len(keyword)):
	
_ = ""
x = 0
for i in text:
	_ += chr(ord(i) + key[x])
	x += 1
	if x >= len(key):
		x = 0

print(_)