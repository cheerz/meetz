const http = axios
const apiUrl = 'http://localhost:3000'

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

const addCheerzer = (name, available) => {
	http.post(apiUrl+'/cheerzers', {name, available})
	.then(response => {
		console.log(response.data)
		availableCheerzers.push(response.data)
	})
	.catch(err => console.log(err))
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

// get 4 random people to eat with, from available people
const getRandomCheerzersToEatWith = () => {
	return http.get('http://localhost:8081/api/cheerzers/Guillaume')
	.then(response => {
		console.log('CHEERZERS:', response.data)
		return response.data
	})
	.catch(err => {
		console.log('ERR:', err)
		return undefined
	})
}


let availableCheerzers = []

getAvailableCheerzers().then(res => {
	availableCheerzers = res
})

getRandomCheerzersToEatWith()

/*
addCheerzer('Melissa', false)

setTimeout(() => {
 	updateCheerzerAvailability('Melissa', true)
}, 1000)
*/
