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