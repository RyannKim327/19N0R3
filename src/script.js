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
			if(total < 10){
				t += `<li><a href="read?id=${e.id}">${e.title}</a></li>`
				total++
			}
		}else{
			let f = e.title.toLowerCase()
			let g = s.toLowerCase()
			if(f.includes(g)){
				if(total < 10){
					t += `<li><a href="read/?id=${e.id}">${e.title}</a></li>`
					total++
				}
			}
		}
	}
	lists.innerHTML = t
}

window.onload = () => {
	_s()
}