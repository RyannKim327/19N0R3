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

async function poem(poemID) {
	fetch("/api/get-poem", {
		"method": "POST",
		"body": JSON.stringify({
			"poemID": poemID
		})
	}).then(r => {
		return r.json()
	}).then(r => {
		let data = r
		document.getElementById("title").innerHTML = read(data['title'])
		document.getElementById("author").innerHTML = read(data['author'])
		document.getElementById("content").innerHTML = read(data['content']).replace(/\n/gi, "<br>")
		// console.log(r)
	})
}

window.onload = () => {
	document.getElementById("loading").style.display = "none"
	let cookie_data = getCookie("poemID").replace(/=/gi, "")
	poem(cookie_data)
}
let n = 0
let total = 0
document.getElementById("prev").onclick = (event) => {
	n--
	if(n <= 0){
		n = 0
	}
}

document.getElementById("next").onclick = (event) => {
	n++
	total = total / 15
	if(n >= 5){
		n = 0
	}
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