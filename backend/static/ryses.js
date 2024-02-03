async function get(url, _then){
	fetch(url).then(response => {
		return response.json()
	}).then(_then).catch(e => {
		console.log(e)
	})
}

async function post(url, params, _then){
	fetch(url, params).then(r => {
		return r.json()
	}).then(_then).catch(e => {
		console.log(e)
	})
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
