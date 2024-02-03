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
	post("/api/poem", {
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
	})
}

window.onload = () => {
	document.getElementById("loading").style.display = "none"
	let cookie_data = getCookie("poemID").replace(/=/gi, "")
	poem(cookie_data)
	
	if(window.innerWidth <= 761){
		let poem_list = document.getElementById("poem-list")
		document.getElementById("content").onclick = (event) => {
			if(poem_list.style.display == "none"){
				poem_list.style.display = "none"
			}else{
				poem_list.style.display = "none"
			}	
			let mobile_nav = document.getElementById("mobile-nav")
			if(mobile_nav.style.display == "none"){
				mobile_nav.style.display = "none"
			}else{
				mobile_nav.style.display = "none"
			}
		}
		document.getElementById("ham-nav").onclick = (event) => {
			let mobile_nav = document.getElementById("mobile-nav")
			if(mobile_nav.style.display == "none"){
				mobile_nav.style.display = "flex"
			}else{
				mobile_nav.style.display = "none"
			}
		}
	}
}

let page = 1
let total = 0

async function fetching(){
	let search = document.getElementById("search").value ?? ""
	await get(`/api/all-poems?p=${page}&q=${search}`, (r) => {
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
					setCookie("poemID", list['ID'])
					poem(list['ID'])
					if(window.innerWidth <= 761){
						let poem_list = document.getElementById("poem-list")
						if(poem_list.style.display == "none"){
							poem_list.style.display = "none"
						}else{
							poem_list.style.display = "none"
						}
					}
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