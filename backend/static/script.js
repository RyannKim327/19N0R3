window.onload = () => {
	document.getElementById("loading").style.display = "none"
}

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

const title = document.getElementById("title")
const content = document.getElementById("content")

let stored_data = ""

setInterval(() => {
	fetch("/api/getAllPoems").then(r => {
		return r.json()
	}).then((r) => {
		let new_data = JSON.stringify(r)
		let temp_data = r.data.reverse()
		const cookie_data = getCookie("poemID").replace(/=/gi, "")
		document.getElementById("title").textContent = temp_data[parseInt(cookie_data) - 1]['title']
		document.getElementById("content").innerHTML = temp_data[parseInt(cookie_data) - 1]['content'].replace(/\n/gi, "<br>")
		r.data.reverse()
		let search = document.getElementById("search").value
		let stored_search = ""
		if(stored_data != new_data || search != stored_search){
			document.getElementById("lists").innerHTML = ""
			stored_data = new_data
			stored_search = search

			// Update List

			for(let i = 0; i < r.data.length; i++){
				let list = r.data[i]
				search = search.toLoweCase()
				if(list['title'].toLoweCase().includes(search) || list['content'].toLoweCase().includes(search) || list['author'].toLoweCase().includes(search)){
					let _list = document.createElement("li")
					let _title = document.createElement("h4")
					let _author = document.createElement("h5")

					_title.textContent = list['title']
					_author.textContent = list['author']

					_list.appendChild(_title)
					_list.appendChild(_author)

					_list.onclick = (event) => {
						document.getElementById("title").textContent = list['title']
						document.getElementById("content").innerHTML = list['content'].replace(/\n/gi, "<br>")
						setCookie("poemID", list['ID'])
					}

					document.getElementById("lists").appendChild(_list)
				}
			}
		}
	})
})