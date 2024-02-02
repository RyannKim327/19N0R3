function setCookie(key, value){
	const date = new Date()
	date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000))
	let xp = `expires=${date.toUTCString()}`
	document.cookie = `${key}=${value};${xp};path=/`
}

// document.getElementById("username").onkeyup = (event) => {
// 	fetch("/api/confirm-user", {
// 		method: "POST",
// 		body: JSON.stringify({
// 			"username": document.getElementById("username").value
// 		})
// 	}).then(response => {
// 		return response.json()
// 	}).then(response => {
// 		if(response.total){
// 			alert("Meron")
// 		}else{
// 			alert("wala")
// 		}
// 	}).catch(error => {
// 		console.error(`Error: ${error}`)
// 	})
// }

document.getElementById("proceed").onclick = () => {
	fetch("/api/credentials", {
		method: "POST",
		body: JSON.stringify({
			"username": document.getElementById("username").value,
			"password": document.getElementById("password").value,
			"password1": document.getElementById("password1").value
		})
	}).then(response => {
		return response.json()
	}).then(response => {
		setCookie("userID", response.ID)
		setCookie("username", response.username)
		alert("Logged in")
	}).catch(error => {
		alert(`There's an error encountered: ${error}`)
	})
}