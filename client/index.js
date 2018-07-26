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

const updateCheerzerAvailability = (name, available) => {
	const cheerzerToModify = availableCheerzers.find(cheerzer => cheerzer.name === name)

	console.log('cheerzerToModify', cheerzerToModify)

	return http.put(apiUrl+'/cheerzers/'+cheerzerToModify.id, {name, available})
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
addCheerzer('Melissa', false)

setTimeout(() => {
 	updateCheerzerAvailability('Melissa', true)
}, 1000)
*/
