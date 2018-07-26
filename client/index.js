// const axios = require('axios');

const http = axios
const apiUrl = 'http://localhost:3000'

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

const allCheerzers = ['Milisa', 'Romain', 'Marie-Blanche', 'Sara', 'Guillaume', 'Elodie', 'Elif', 'Robin', 
'Thomas', 'DavidG', 'Arnaud', 'Hugo', 'Kevin', 'DavidP', 'Leo', 'Denis', 'Johnny', 'Charles', 'Tom', 'Melissa', 'Thiefaine', 'AlexandreW', 'Aminata', 'AlexandreC',
'Daniel', 'Charlotte', 'Theo', 'Maxime', 'Raphaele', 'Yao', 'Cindy', 'Ana', 'Pierre', 'Damien', 'Amel', 'Tristan', 'Maxime', 'Maria', 'Mapy', 'Sandra', 'Marie-Julia', 
'Julien', 'Mathieu', 'Valentine', 'Aurel', 'Antoine', 'Bea', 'Valeria', 'Denisse']

const getAvailableCheerzers = () => {
	return http.get(apiUrl+'/cheerzers')
	.then(response => {
		// console.log(response.data)
		return response.data
	})
	.catch(err => {
		console.log(err)
		return undefined
	})
}

const updateAvailability = (name) => {
	http.post(apiUrl+'/cheerzers', {name})
	.then(response => {
		console.log(response.data)
	})
	.catch(err => console.log(err))
}

const deleteAvailability = (name) => {
	console.log('here', availableCheerzers)
	const cheerzerToDelete = availableCheerzers.find(cheerzer => cheerzer.name === name)

	return http.put(apiUrl+'/cheerzers/'+cheerzerToDelete.id, {name, available: false})
	.then(response => {
		console.log(response.data)
	})
	.catch(err => console.log(err))
}

let availableCheerzers = []

getAvailableCheerzers().then(res => {
	availableCheerzers = res
})


/*
setTimeout(() => {
	deleteAvailability('Guillaume')
}, 1000)
*/



/*
const player = 'Guillaume'

const getFourPeople = () => {
	const cheerzers = allCheerzers.slice(0, allCheerzers.length).filter(c => c != player)
	const selectedCheerzers = []


	for(let i = 0; selectedCheerzers.length < 4; i++) {
		const randomInt = getRandomInt(0, cheerzers.length)
		const randomCheerzer = cheerzers[randomInt]

		if(!selectedCheerzers.includes(randomCheerzer)) {
			selectedCheerzers.push(randomCheerzer)
		}
	}

	console.log(selectedCheerzers)
}

getFourPeople()
*/
