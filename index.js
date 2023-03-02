const express = require("express")
const fs = require("fs")
const parser = require("body-parser")
const path = require("path")
const app = express()
const body = parser.urlencoded({ extended: false })

const write = "/write/my/poem"

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

app.get(write, (req, res) => {
	res.sendFile(__dirname + "/write.html")
})

app.post(write, body, (req, res) => {
	const title = req.body.title
	const author = req.body.author || "Unknown Author"
	const content = req.body.content.replace(/\-([\w]+)\-\n/gi, "").replace(/\r/gi, "")
	if(title == undefined || content == undefined || title == "" || content == "")
		return res.send("No Result")
	let json = JSON.parse(fs.readFileSync("data.json", "utf8"))
	let id = json.poems.length + 1
	json.poems.push({
		id,
		title,
		author,
		content
	})
	fs.writeFileSync("data.json", JSON.stringify(json), "utf8")
	res.send("Success")
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
