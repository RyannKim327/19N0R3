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
let poem_id = 1
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
				t += `<li class="poems_title" id="poem_id_${e.id}" onclick="execute('${e.id}')">${title} <sub>${e.author}</sub></a></li>`
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
	poem_id = id_num
	content.classList = ""
	document.getElementById("poem-content").style = undefined
	document.getElementById("home").style.color = "#00de00"
	document.getElementById("about").style.color = "#ffffff"
	document.getElementById("contact").style.color = "#ffffff"
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
		if(l.style.display == "block"){
			l.style.display = "none"
		}
	}
}

function sizing(){
	if(window.innerWidth > 760){
		document.getElementById("poems-lists-v2").style.display = "block"
	}
}

document.getElementById("home").onclick = () => {
	read(poem_id)
}

document.getElementById("about").onclick = () => {
	let title = document.getElementById("poem-title")
	let author = document.getElementById("poem-author")
	let content = document.getElementById("poem-content")
	title.textContent = "About"
	author.textContent = ""
	content.textContent = "Greetings, I am Ryann Kim Sesgundo, the one behind this project 19N0R3 Poetry. This is just a platform, where I try to practice my skills in development, also in designing, with the combination of my hobby, which is writing poems. There are lot of studies happens, before I've made this, ans lots of version released, and I'm much happy that you're here and reading some poems, written by the people and contributors behind this small platform. Enjoy and I hope that you'll liked it."
	content.style.textAlign = "justify"
	content.style.width = "50%"
	content.style.alignSelf = "center"
	content.style.overflow = "hidden"
	content.classList = "poem-about"
	document.getElementById("home").style.color = "#ffffff"
	document.getElementById("about").style.color = "#00de00"
	document.getElementById("contact").style.color = "#ffffff"
}

document.getElementById("contact").onclick = () => {
	let title = document.getElementById("poem-title")
	let author = document.getElementById("poem-author")
	let content = document.getElementById("poem-content")
	title.textContent = "Contact us"
	author.textContent = ""
	content.textContent = ""
	content.style.textAlign = "justify"
	content.style.width = "50%"
	content.style.alignSelf = "center"
	content.style.overflow = "hidden"
	content.classList = "poem-about"
	document.getElementById("home").style.color = "#ffffff"
	document.getElementById("about").style.color = "#ffffff"
	document.getElementById("contact").style.color = "#00de00"
}

document.getElementById("poems-nav-icon").onclick = () => {
	setTimeout(() => {
		if(window.innerWidth < 760){
			let l = document.getElementById("poems-lists-v2")
			if(l.style.display == "none"){
				l.style.display = "block"
			}
			
		console.log("h")
		}
	}, 100);
}

setInterval(sizing, 100)