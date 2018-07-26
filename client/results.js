const http = axios
const apiUrl = 'http://localhost:8081'

const currentCheerzerName = window.localStorage.getItem('currentCheerzerName')

// get 4 random people to eat with, from available people
const getRandomCheerzersToEatWith = (currentCheerzerName) => {
	return http.get(`http://localhost:8081/api/cheerzers/${currentCheerzerName}`)
	.then(response => {
		console.log('CHEERZERS:', response.data)
		
		return response.data
	})
	.catch(err => {
		console.log('ERR:', err)
		return undefined
	})
}

setTimeout(() => {
	getRandomCheerzersToEatWith(currentCheerzerName).then(res => {
		const cheerzersElement = document.querySelector('.cheerzers')
		res.forEach(cheerzer => {
				let el = document.createElement('p')
				el.innerHTML = cheerzer.name + '<br><img src="photos/'+ cheerzer.name +'.jpg" />'
				cheerzersElement.appendChild(el)
			})
	})
}, 1000)
