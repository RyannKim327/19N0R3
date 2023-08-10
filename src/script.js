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
let page = 0
let set_of_poems = []
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
	let num_of_filter = 0
	set_of_poems = list
	if(list.length <= 0) return lists.innerHTML = "There is no Poem listed yet"
	for(let x = page; x < list.length; x++){
		let e = list[x]
		if(s == ""){
			if(total < max){
				let title = e.title.replace(/(\(.*?\))/gi, "")
				t += `<li class="poems_title" id="poem_id_${e.id}" onclick="execute('${e.id}')">${title} <sub>${e.author}</sub></a></li>`
				total++
			}
			num_of_filter++
		}else{
			let f = e.title.toLowerCase()
			let g = s.toLowerCase()
			let h = e.author.toLowerCase()
			if(f.includes(g) || h.includes(g)){
				if(total < max){
					let title = e.title.replace(/(\(.*?\))/gi, "")
					t += `<li onclick="execute('${e.id}')">${title} <sub>${e.author}</sub></a></li>`
					total++
					num_of_filter++
				}
			}
		}
	}
	if(num_of_filter <= 0){
		t += "<li>There is no poems with this filter</li>"
	}
	lists.innerHTML = t
	document.getElementById("poems-lists").textContent = "Poems lists - [" + list.length + " poems]"
}

async function read(id_num){
	let title = document.getElementById("poem-title")
	let author = document.getElementById("poem-author")
	let content = document.getElementById("poem-content")
	let api = await fetch(`/read/${id_num}`)
	let poem = await api.json()
	if(poem.content == undefined || poem.title == undefined){
		poem_id = 1
		api = await fetch(`/read/1`)
		poem = await api.json()
	}
	let txt = ""
	let lists = [
		"-i-", "-ii-", "-iii-", '-iv-', '-v-',
		'-vi-', '-vii-', '-viii-', '-ix-', '-x-',
		"-xi-", "-xii-", "-xiii-", '-xiv-', '-xv-',
		'-xvi-', '-xvii-', '-xviii-', '-xix-', '-xx-',
		"-xxi-", "-xxii-", "-xxiii-", '-xxiv-', '-xxv-',
		'-xxvi-', '-xxvii-', '-xxviii-', '-xxix-', '-xxx-'
	]
	let txts = poem.content.replace(/\r/gi, "").split("\n\n")
	for(let i = 0; i < txts.length; i++){
		let values = txts[i].replace(/\n/gi, "<br>").replace(/-([\w]+)-/gi, "")
		txt += `<br><span class='poems-stanza'>${lists[i]}</span>${values}<br>`
	}
	let x = ""
	for(let _ = 0; _ < poem.title.length; _++){
		const code = poem.title.charCodeAt(_)
		if(code >= 5888 && code <= 5942){
			x += `<span class='baybayin'>${poem.title[_]}</span>`
		}else{
			x += poem.title[_]
		}
	}
	title.innerHTML = x
	x = ""
	for(let _ = 0; _ <  poem.author.length; _++){
		const code =  poem.author.charCodeAt(_)
		if(code >= 5888 && code <= 5942){
			x += `<span class='baybayin'>${ poem.author[_]}</span>`
		}else{
			x +=  poem.author[_]
		}
	}
	author.innerHTML = x
	x = ""
	for(let _ = 0; _ <  txt.length; _++){
		const code =  txt.charCodeAt(_)
		if(code >= 5888 && code <= 5942){
			x += `<span class='baybayin'>${ txt[_]}</span>`
		}else{
			x +=  txt[_]
		}
	}
	content.innerHTML = x
	poem_id = id_num
	content.classList = ""
	document.getElementById("poem-content").style = undefined
	document.getElementById("about").style.color = "var(--color)"
	document.getElementById("home").style.color = "var(--selected)"
	if(window.innerWidth < 760){
		document.getElementById("poems-lists-v2").style = "none"
	}
	document.title = poem.title
	document.querySelector("meta[name='og:title']").setAttribute("content", poem.title)
	document.querySelector("meta[name='og:description']").setAttribute("content", `By: ${poem.author}`)
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

function execute(id_num){
	read(id_num)
	document.getElementById("search").value = ""
	window.location.search = "?p=" + id_num
	_s()
}

document.getElementById("poems-nav").onclick = () => {
	if(window.innerWidth < 760){
		let l = document.getElementById("poems-lists-v2")
		if(l.style.display != "none"){
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
	window.location.search = "?p=" + poem_id
}

let isActiveAbout = false

document.getElementById('base-container').onclick = () => {
	if(isActiveAbout){
		document.getElementById('abt-dev').style.display = 'none'
		isActiveAbout = false
	}
}

document.getElementById("about").onclick = () => {
	if(!isActiveAbout){
		document.getElementById('abt-dev').style.display = 'flex'
		setTimeout(() => {
			isActiveAbout = true
		}, 500)
	}
}

document.getElementById("share").onclick = () => {
	navigator.clipboard.writeText(`${window.location}`)
	alert("Copied to clipboard")
}

document.getElementById("poems-nav-icon").onclick = () => {
	setTimeout(() => {
		if(window.innerWidth < 760){
			let l = document.getElementById("poems-lists-v2")
			if(l.style.display != "block"){
				l.style.display = "block"
			}
		}
	}, 1000);
}

document.getElementById("download").onclick = () => {
	location.href = "/download"
}

setInterval(sizing, 100)

const url = window.location.search
const url_data = new URLSearchParams(url)
if(url_data.get('p') != null){
	read(url_data.get('p'))
}else{
	read(1)
}

let next_page = document.getElementById("poem-next-page")
let prev_page = document.getElementById("poem-prev-page")
next_page.onclick = () => {
	if((page + max) <= set_of_poems.length){
		page += max
		_s()
	}
}
prev_page.onclick = () => {
	if((page - max) >= 0){
		page -= max
		_s()
	}
}