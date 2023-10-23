class SolarSystem:
	def __init__(self):
		alpha = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz "
		keyword = "MPOP Reverse II"
		self.key = []
		for i in range(len(keyword)):
			for j in range(len(alpha)):
				if alpha[j] == keyword[i]:
					self.key.append(j + 1)
					break

	def encrypt(self, text):
		_ = ""
		x = 0
		for i in text:
			_ += chr(ord(i) + self.key[x])
			x += 1
			if x >= len(self.key):
				x = 0
		return _

	def decrypt(self, text):
		_ = ""
		x = 0
		for i in text:
			_ += chr(ord(i) - self.key[x])
			x += 1
			if x >= len(self.key):
				x = 0
		return _
