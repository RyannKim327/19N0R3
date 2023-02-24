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
let max = 20
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
				let title = e.title.replace(/(\(.*?\))/gi, "")
				t += `<li onclick="execute('${e.id}')">${title} <sub>${e.author}</sub></a></li>`
				total++
			}
		}else{
			let f = e.title.toLowerCase()
			let g = s.toLowerCase()
			let h = e.author.toLowerCase()
			if(f.includes(g) || h.includes(g)){
				if(total < max){
					let title = e.title.replace(/(\(.*?\))/gi, "")
					t += `<li onclick="execute('${e.id}')">${title} <sub>${e.author}</sub></a></li>`
					total++
				}
			}
		}
	}
	lists.innerHTML = t
	document.getElementById("poems-lists").textContent = "Poems lists - [" + list.length + " poems]"
}

async function read(id_num){
	let title = document.getElementById("poem-title")
	let author = document.getElementById("poem-author")
	let content = document.getElementById("poem-content")
	let poem = await fetch(`/read/${id_num}`).then(r => {
		return r.json()
	}).catch(error => {
		console.error(`Error [Read]: ${e}`)
		return null
	})
	title.textContent = poem.title
	author.textContent = poem.author
	content.innerHTML = poem.content.replace(/\r\n/gi, "<br>").replace(/\n/gi, "<br>").replace(/\\/gi, "\\")
	if(window.innerWidth < 760){
		document.getElementById("poems-lists-v2").style = "none"
	}
}

window.onload = () => {
	if(window.innerWidth < 760){
		document.getElementById("poems-lists-v2").style = "none"
	}
	_s()
}
let search = document.getElementById("search")
search.onkeyup = () => {
	_s()
}
read(1)

function execute(id_num){
	read(id_num)
	document.getElementById("search").value = ""
	_s()
}

document.getElementById("poems-nav").onclick = () => {
	if(window.innerWidth < 760){
		let l = document.getElementById("poems-lists-v2")
		if(l.style.display == "none"){
			l.style.display = "block"
		}else{
			l.style.display = "none"
		}
	}
}

function sizing(){
	if(window.innerWidth > 760){
		document.getElementById("poems-lists-v2").style.display = "block"
	}
	setTimeout(sizing, 100)
}
sizing()