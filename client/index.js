const http = axios
const apiUrl = 'http://localhost:3000'
const startButton = document.querySelector('.start')

const currentCheerzerName = window.localStorage.getItem('cheerzerName')
const currentCheerzerAvailability = window.localStorage.getItem('available')

const welcomeElement = document.querySelector('.welcome')
const welcomeBackElement = document.querySelector('.welcome_back')
const availableElement = document.querySelector('.available')
const unavailableElement = document.querySelector('.unavailable')
const cancelButton = document.querySelector('.cancel')
const hotButton = document.querySelector('.hot')

const getAvailableCheerzers = () => {
	return http.get(apiUrl+'/cheerzers')
	.then(response => {
		return response.data
	})
	.catch(err => {
		console.log(err)
		return undefined
	})
}

const updateCheerzerAvailability = (name, available) => {
	const cheerzerToModify = availableCheerzers.find(cheerzer => cheerzer.name === name)

	console.log('cheerzerToModify', cheerzerToModify)

	return http.put(apiUrl+'/cheerzers/'+cheerzerToModify.id, {name, available})
	.then(response => {
		console.log(response.data)
	})
	.catch(err => console.log(err))
}

const onStartButtonClicked = ev => {
	const subscribeElement = document.querySelector('.subscribe')
	welcomeElement.style.display = 'none'
	subscribeElement.style.display = 'block'
}

let availableCheerzers = []

getAvailableCheerzers().then(res => {
	availableCheerzers = res
})

if (currentCheerzerName) {
	welcomeElement.style.display = 'none'
	welcomeBackElement.style.display = 'block'
	if (currentCheerzerAvailability === 'true') {
		unavailableElement.style.display = 'none'
	} else {
		availableElement.style.display = 'none'
	}
}

startButton.onclick = onStartButtonClicked

cancelButton.onclick = ev => {
	updateCheerzerAvailability(currentCheerzerName, false)
	window.localStorage.setItem('available', false)
	unavailableElement.style.display = 'block'
	availableElement.style.display = 'none'
}

hotButton.onclick = ev => {
	updateCheerzerAvailability(currentCheerzerName, true)
	window.localStorage.setItem('available', true)
	unavailableElement.style.display = 'none'
	availableElement.style.display = 'block'
}
