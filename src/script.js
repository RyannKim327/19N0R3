const get = async (url) => {
	return new Promise((resolve, reject) => {
		fetch(url).then(r => {
			resolve(r.json())
		}).catch(e => {
			reject(e)
		})
	})
}

let total = 0
let max = 25
let id = -1
let _s = () => {
	total = 0
	filter()
}

let filter = async () => {
	let data = await get("/lists")
	let list = data.poems
	let s = document.getElementById("search").value
	const lists = document.getElementById("lists")
	let t = ""
	if(list.length <= 0) return lists.innerHTML = "There is no Poem listed yet"
	for(let x = 0; x < list.length; x++){
	let e = list[x]
		if(s == ""){
			if(total < max){
				t += `<li onclick="read('${e.id}')">${e.title}</a></li>`
				total++
			}
		}else{
			let f = e.title.toLowerCase()
			let g = s.toLowerCase()
			if(f.includes(g)){
				if(total < max){
					t += `<li onclick="read('${e.id}')">${e.title}</a></li>`
					total++
				}
			}
		}
	}
	lists.innerHTML = t
}

async function read(id_num){
	let title = document.getElementById("poem-title")
	let content = document.getElementById("poem-content")
	let poem = await fetch(`/read/${id_num}`).then(r => {
		return r.json()
	}).catch(error => {
		console.error(`Error [Read]: ${e}`)
		return null
	})
	title.textContent = poem.title
	console.log(poem.content)
	content.innerHTML = poem.content.replace(/\r\n/gi, "<br>").replace(/\n/gi, "<br>").replace(/\\/gi, "\\")
}

window.onload = () => {
	_s()
}
let search = document.getElementById("search")
search.onkeyup = () => {
	_s()
}
