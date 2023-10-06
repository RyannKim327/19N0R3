async function get_request(url, _then, _catch){
	fetch(url).then(r => {
		return r.json()
	}).then(_then).catch(_catch)
}

async function post_request(url, params, _then, _catch){
	fetch(url, params).then(r => {
		return r.json()
	}).then(_then).catch(_catch)
}