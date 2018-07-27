const http = axios
const apiUrl = 'http://localhost:8081'

const currentCheerzerName = window.localStorage.getItem('currentCheerzerName')
const cheerzers = window.localStorage.getItem('cheerzers')
const cheerzersElement = document.querySelector('.cheerzers')


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

if(cheerzers) {
	JSON.parse(cheerzers).forEach(cheerzer => {
		let el = document.createElement('p')
		el.className = 'cheerzer'
		el.innerHTML = cheerzer.name + '<br><img class="result_photo" src="photos/'+ cheerzer.name +'.jpg" />'
		cheerzersElement.appendChild(el)
	})
} else {
	setTimeout(() => {

		getRandomCheerzersToEatWith(currentCheerzerName).then(res => {
			window.localStorage.setItem('cheerzers', JSON.stringify(res))
			res.forEach(cheerzer => {
				let el = document.createElement('p')
				el.className = 'cheerzer'
				el.innerHTML = cheerzer.name + '<br><img class="result_photo" src="photos/'+ cheerzer.name +'.jpg" />'
				cheerzersElement.appendChild(el)
			})
		}, 1000)
	})
}

