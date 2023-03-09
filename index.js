const express = require("express")
const fs = require("fs")
const parser = require("body-parser")
const path = require("path")
const app = express()
const body = parser.urlencoded({ extended: false })

const write = "/compose"

const PORT = 3000 | 5000 | process.env.PORT

const gex = (string) => {
	const str = string + "\\b"
	return new RegExp(str, "i")
}

app.use(express.static("public"))

app.use("/res", express.static(path.join(`${__dirname}/src`)))

app.get("/", (req, res) => {
	res.sendFile(`${__dirname}/src/index.html`)
})

app.get("/lists", (req, res) => {
	let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
	let p = json.poems
	let poems = []
	for(let i = p.length - 1; i >= 0; i--){
		poems.push(p[i])
	}
	let js = {
		"poems": poems
	}
	res.send(js)
})

app.get("/read", (req, res) => {
	res.sendFile(`${__dirname}/read.html`)
})

app.get("/download", (req,res) => {
	res.download(`${__dirname}/res/app.apk`)
})

app.get("/app_updates", (req, res) => {
	let json = {
		"description": "New update has arrived, kindly download the application for better experience",
		"versionName": "0.0.1",
		"forceToVersion": 1
	}
	res.send(JSON.stringify(json))
})

app.use("/read/:id", (req, res) => {
	const json = JSON.parse(fs.readFileSync("data.json", "utf8"))
	let js = {}
	for(let i in json.poems){
		if(json.poems[i].id == req.params.id){
			js = {
				"title": json.poems[i].title,
				"content": json.poems[i].content,
				"author": json.poems[i].author
			}
			break
		}
	}
	res.send(js)
})

app.post("/login", body, (req, res) => {
	let users = JSON.parse(fs.readFileSync("users.json", "utf8"))
	let username = req.body.username
	let password = req.body.password

	if(users[username.toLowerCase()] == undefined){
		res.send(JSON.stringify({
			"register": false,
			"msg": "Username might not be existed or wrong password"
		}))
	}else{
		if(users[username.toLowerCase()].password == password){
			res.send(JSON.stringify({
				"register": true,
				"msg": "You're now logged in"
			}))
		}else{
			res.send(JSON.stringify({
				"register": false,
				"msg": "Username might not be existed or wrong password"
			}))
		}
	}
})

app.post("/register", body, (req, res) => {
	let users = JSON.parse(fs.readFileSync("users.json", "utf8"))
	let username = req.body.username
	let password = req.body.password
	let passwordv2 = req.body.passwordv2

	if(users[username.toLowerCase()] == undefined){
		if(password == passwordv2){
			users[username.toLowerCase()] = {
				username,
				password
			}
			fs.writeFileSync("users.json", JSON.stringify(users), "utf8")
			res.send(JSON.stringify({
				"register": true,
				"msg": "Thank you for joining us, you are now alread signed in."
			}))
		}else{
			res.send(JSON.stringify({
				"register": false,
				"msg": "Mismatch Passwords"
			}))
		}
	}else{
		res.send(JSON.stringify({
			"register": false,
			"msg": "Username is already taken"
		}))
	}
})

app.post(write, body, (req, res) => {
	let users = JSON.parse(fs.readFileSync("users.json", "utf8"))
	const author = req.body.author || "Unknown Author"
	if(users[author.toLowerCase()] == undefined){
		return res.send(JSON.stringify({
			"isPosted": false,
			"msg": "Username is not existed to our database"
		}))
	}else{
		if(users[author.toLowerCase()].password == req.body.password){
			const title = req.body.title
			const content = req.body.content.replace(/\r/gi, "")
			if(title == undefined || content == undefined || title == "" || content == "")
				return res.send(JSON.stringify({
					"isPosted": false,
					"msg": "Incomplete data"
				}))
			let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
			let id = json.poems.length + 1
			json.poems.push({
				id,
				title,
				author,
				content
			})
			fs.writeFileSync("data.json", JSON.stringify(json), "utf8")
			res.send(JSON.stringify({
				"isPosted": true,
				"msg": "Your poem is now posted"
			}))
		}else{
			return res.send(JSON.stringify({
				"isPosted": false,
				"msg": "Username is not existed to our database"
			}))
		}
	}
})

app.post("/poem_update", body, (req, res) => {
	let users = JSON.parse(fs.readFileSync("users.json", "utf8"))
	const author = req.body.author || "Unknown Author"
	if(users[author.toLowerCase()] == undefined){
		return res.send(JSON.stringify({
			"isPosted": false,
			"msg": "Username is not existed to our database"
		}))
	}else{
		if(users[author.toLowerCase()].password == req.body.password){
			const title = req.body.title
			const poem_id = req.body.id
			const content = req.body.content.replace(/\r/gi, "")
			if(title == undefined || content == undefined || title == "" || content == "" || poem_id == "" || poem_id == undefined)
				return res.send(JSON.stringify({
					"isPosted": false,
					"msg": "Incomplete data"
				}))
			let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
			if(json.poems[poem_id - 1]['title'] != title || json.poems[poem_id - 1]['author'] != author){
				return res.send(JSON.stringify({
					"isPosted": false,
					"msg": "Declined Permission"
				}))
			}
			json.poems[poem_id - 1] = {
				id: parseInt(poem_id),
				title,
				author,
				content
			}
			fs.writeFileSync("data.json", JSON.stringify(json), "utf8")
			res.send(JSON.stringify({
				"isPosted": true,
				"msg": "Your poem is now updated"
			}))
		}else{
			return res.send(JSON.stringify({
				"isPosted": false,
				"msg": "Username is not existed to our database"
			}))
		}
	}
})

app.use("/search/:q", (req, res) => {
	let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
	let s = req.params.q
	if(s == undefined || s.replace(/\s/gi, "") == "") return res.send("No data found.")
	let xp = gex(s)
	let data = {
		"poems": []
	}
	if(json.poems.length <= 0){
		res.send("No poems posted.")
	}else{
		let id = 0
		json.poems.forEach(e => {
			if(xp.test(e.title) || xp.test(e.content)){
				data.poems.push({
					id: id,
					title: e.title,
					content: e.content
				})
			}
			id++
		})
		if(data.poems.length <= 0){
			res.send({
				"poems": [{
					title: "Notice",
					content: "There's no poem found on the server that matches the query"
				}]
			})
		}else{
			res.send(data)
		}
	}
})

app.listen(PORT, () => {
	console.log(`Listening with the port ${PORT}`)
})
