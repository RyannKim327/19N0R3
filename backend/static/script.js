function setCookie(key, value){
	const date = new Date()
	date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
	let xp = `expires=${date.toUTCString()}`
	document.cookie = `${key}=${value};${xp};path=/`
}

function getCookie(key){
	const cookie = document.cookie
	const name = `${key}=`
	const decode = decodeURIComponent(cookie)
	const data = decode.split(";")
	for(let d in data){
		let new_data = data[d]
		while(new_data[0] == " "){
			new_data = new_data.substring(1)
		}
		if(new_data.indexOf(key) == 0){
			return new_data.substring(key.length, new_data.length)
		}
	}
	return ""
}

function read(text){
	let x = ""
	for(let _ = 0; _ <  text.length; _++){
		const code =  text.charCodeAt(_)
		if(code >= 5888 && code <= 5942){
			x += `<span class='baybayin'>${text[_]}</span>`
		}else{
			x +=  text[_]
		}
	}
	return x
}

const title = document.getElementById("title")
const content = document.getElementById("content")

let stored_data = ""
let time = 1000
let intervals = 0

let share = {}

async function poem(poemID) {
	post_request("/api/get-poem", {
		"method": "POST",
		"body": JSON.stringify({
			"poemID": poemID
		})
	}, (r) => {
		let data = r
		document.title = data['title']
		document.getElementById("title").innerHTML = read(data['title'])
		document.getElementById("author").innerHTML = read(data['author'])
		document.getElementById("content").innerHTML = read(data['content']).replace(/\n/gi, "<br>")
		share['title'] = data['title']
		share['author'] = data['author']
		share['ID'] = poemID
		// console.log(r)
	})
}

window.onload = () => {
	document.getElementById("loading").style.display = "none"
	let cookie_data = getCookie("poemID").replace(/=/gi, "")
	poem(cookie_data)
}
let page = 1
let total = 0

async function fetching(){
	let search = document.getElementById("search").value
	await get_request(`/api/get-all-poems?p=${page}&q=${search}`, (r) => {
		let new_data = JSON.stringify(r)
		if(stored_data != new_data){
			document.getElementById("lists").innerHTML = ""
			stored_data = new_data
			total = r.total
			for(let i = 0; i < r.data.length; i++){
				let list = r.data[i]
				search = search.toLowerCase()
				let _list = document.createElement("li")
				let _title = document.createElement("h4")
				let _author = document.createElement("h5")

				_title.innerHTML = read(list['title'])
				_author.innerHTML = read(list['author'])

				_list.appendChild(_title)
				_list.appendChild(_author)

				_list.onclick = (event) => {
					document.title = list['title']
					document.getElementById("title").innerHTML = read(list['title'])
					document.getElementById("content").innerHTML = read(list['content']).replace(/\n/gi, "<br>")
					poem(list['ID'])
					setCookie("poemID", list['ID'])
				}

				document.getElementById("lists").appendChild(_list)
				document.getElementById("pager").textContent = `Page ${page}`
			}
		}
	})
}

document.getElementById("next").onclick = (event) => {
	page++
	newTotal = Math.floor(total / 15)
	if(page > newTotal + 1){
		page = newTotal
	}
	fetching()
}

document.getElementById("prev").onclick = (event) => {
	page--
	if(page < 0){
		page = 0
	}
	fetching()
}

setInterval(async () => {
	if(getCookie("poemID") == ""){
		setCookie("poemID", 1)
	}
	
	fetching()

	if((intervals % 10) == 0){
		time = 15000
	}else{
		time = 1000
	}
	intervals++
}, time)