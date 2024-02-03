function download(){
	location.href = "/download"
}

function sharelink(){
	navigator.clipboard.writeText(`Here's a like of a poem written by ${share['author']} entitled ${share['title']}\n\nYou may read it at https://pen-and-love.writers.repl.co/read/${share['ID']}`)
	alert("The content is already in your clipboard.")
}

function about(){
	document.getElementById("poem-contents").style.display = "block"
	document.getElementById("formlogin").style.display = "none"
	document.getElementById("title").textContent = "About"
	document.getElementById("author").textContent = ""
	document.getElementById("content").innerHTML = "<blockquote>The \"Pen and Love\" is a platform where we share the thoughts and ideas, as well as the emotions and love to one another.</blockquote>"
}

function home(){
	document.getElementById("poem-contents").style.display = "block"
	document.getElementById("formlogin").style.display = "none"
	let cookie_data = getCookie("poemID").replace(/=/gi, "")
	poem(cookie_data)
}

function credentials(){
	const base = document.createElement("div")
	const form = document.createElement("div")
	const title = document.createElement("h3")
	const username = document.createElement("label")
	const labelUsername = document.createElement("label")
	const iUsername = document.createElement("i")
	const user = document.createElement("input")
	const password = document.createElement("label")
	const labelpassword = document.createElement("label")
	const ipassword = document.createElement("i")
	const pass = document.createElement("input")
	const password1 = document.createElement("label")
	const labelpassword1 = document.createElement("label")
	const ipassword1 = document.createElement("i")
	const pass1 = document.createElement("input")
	const button = document.createElement("button")
	
	base.classList.add("container")
	base.classList.add("content")
	form.classList.add("form")
	form.id = "formlogin"
	title.textContent = "Credentials Form"

	username.classList.add("input")
	labelUsername.setAttribute("for", "username")

	iUsername.classList.add("fa-solid")
	iUsername.classList.add("fa-user")
	iUsername.classList.add("fa-2xs")

	user.id = "username"
	user.type = "text"

	labelUsername.appendChild(iUsername)
	username.appendChild(labelUsername)
	username.appendChild(user)

	password.classList.add("input")
	labelpassword.setAttribute("for", "password")

	ipassword.classList.add("fa-solid")
	ipassword.classList.add("fa-lock")
	ipassword.classList.add("fa-2xs")

	pass.id = "password"
	pass.type = "password"
	password.classList.add("input")

	labelpassword1.setAttribute("for", "password1")

	ipassword1.classList.add("fa-solid")
	ipassword1.classList.add("fa-check")
	ipassword1.classList.add("fa-2xs")

	pass1.id = "confirmPassword"
	pass1.type = "password"

	labelUsername.appendChild(iUsername)
	username.appendChild(labelUsername)
	username.appendChild(user)

	labelpassword.appendChild(ipassword)
	password.appendChild(labelpassword)
	password.appendChild(pass)

	labelpassword1.appendChild(ipassword1)
	password1.appendChild(labelpassword1)
	password1.appendChild(pass1)

	button.textContent = "Login"
	button.id = "proceed"

	user.onchange = (event) => {
		post("/api/confirm-user", {
				"method": "POST",
				"body": JSON.stringify({
					"username": user.value
				})
			}, (r) =>  {
				if(r.total > 0){
					password1.style.display = "none"
					button.textContent = "Login"
				}else{
					password1.style.display = "flex"
					button.textContent = "Register"
				}
			}
		)
	}

	form.appendChild(title)
	form.appendChild(username)
	form.appendChild(password)
	form.appendChild(password1)
	form.appendChild(button)

	document.getElementById("poem-contents").innerHTML = ""
	base.appendChild(form)
	document.getElementById("poem-contents").appendChild(base)

	button.onclick = () => {
		post("/api/credentials", {
			"method": "POST",
			"body": JSON.stringify({
				"username": user.value,
				"password": pass.value,	
				"password1": pass1.value
			})
		}, (response) => {
			setCookie("userID", response.ID)
			setCookie("username", response.username)
			setCookie("credentials", JSON.stringify({
				"username": response.username,
				"userID": response.ID
			}))
			document.getElementById("login").remove()
			document.getElementById("loginNav").remove()
		})
	}

}

if(getCookie("credentials") != ""){
	document.getElementById("login").textContent = "Publish"
	document.getElementById("loginNav").textContent = "Publish"
}
