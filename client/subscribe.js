const http = axios
const apiUrl = 'http://localhost:3000'

const addCheerzer = (name, available) => {
	return http.post(apiUrl+'/cheerzers', {name, available})
	.then(response => {
		return response.data
	})
	.catch(err => console.log(err))
}


const x = () => {
	const submitButton = document.querySelector('.subscribeButton')
	submitButton.onclick = subscribe
}

const subscribe = (ev) => {
	const cheerzerName = document.querySelector('.name').value
	return addCheerzer(cheerzerName, true).then(res => {
		const formElement = document.querySelector('.subscribeForm')
		const subscribedElement = document.querySelector('.subscribed')

		formElement.style.display = 'none'
		subscribedElement.style.display = 'block'

		window.localStorage.setItem('cheerzerName', cheerzerName)

		console.log('YOU SUBSCRIBED', res)
	})
	.catch(err => {
		console.log(err)
	})
}

window.onload = x


