window.onload = () => {
	document.getElementById("loading").style.display = "none"
}

const title = document.getElementById("title")
const content = document.getElementById("content")

let stored_data = ""

setInterval(() => {
	fetch("/api/getAllPoems").then(r => {
		return r.json()
	}).then((r) => {
		let new_data = JSON.stringify(r)
		if(stored_data != new_data){
			stored_data = new_data

			// Update List
			for(let i = 0; i < r.data.length)
		}
	})
})