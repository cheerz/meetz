const express		= require('express')
const cors			= require('cors')
const bodyParser 	= require('body-parser')
const compress		= require('compression')
const app			= express()
const router 		= express.Router()
const port 			= 8081
const http = require('axios')
const apiUrl = 'http://localhost:3000'

app.use(cors())
app.options('*', cors())
app.use('/scripts', express.static(`${__dirname}/node_modules`))
app.use(express.static(__dirname + '/client'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(compress())

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)

let availableCheerzers = []
http.get(apiUrl+'/cheerzers?available=true')
.then(response => {
	availableCheerzers = response.data
})
.catch(err => {
	console.log(err)
	return undefined
})

let resultsOfTheday = []
http.get(apiUrl+'/results')
.then(response => {
	resultsOfTheDay = response.data
	//console.log(response.data)
})
.catch(err => {
	console.log(err)
	return undefined
})

const getRandomCheerzers = (cheerzers, currentCheerzer) => {
	let results
	resultsOfTheDay.forEach(result => {
		console.log('result', result)
		results = result.group.filter(cheerzer => { cheerzer.id === currentCheerzer.id })
	})
	if(results.length > 0) {
		return results
	} else {
		const cheerzersToChooseFrom = cheerzers.slice(0, cheerzers.length).filter(c => c.name != currentCheerzer.name)
		const selectedCheerzers = []

		for (let i = 0; selectedCheerzers.length < 3; i++) {
			const randomInt = getRandomInt(0, cheerzersToChooseFrom.length)
			const randomCheerzer = cheerzersToChooseFrom[randomInt]

			if(selectedCheerzers.length > 0) {
				let selectedCheerzersNames = []
				selectedCheerzers.forEach(cheerzer => {
					selectedCheerzersNames.push(cheerzer.name)
				})

				if (randomCheerzer && !selectedCheerzersNames.includes(randomCheerzer.name)) {
					selectedCheerzers.push(randomCheerzer)
				}
			} else {
				selectedCheerzers.push(randomCheerzer)
			}
		}
		return selectedCheerzers
	}

}

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html')
})

// all routes will be prefixed with /api
app.use('/api', router)

router.route('/cheerzers/:current_cheerzer_name')
.get((req, res, next) => {
	const currChName = req.params.current_cheerzer_name
	const ranCheerzers = getRandomCheerzers(availableCheerzers, {name: currChName})

	setTimeout(() => {
		//let currentCheerzer = {name: "DavidG", id: 16, available: true}
		let currentCheerzer = availableCheerzers.find(c => c.name == currChName)
		let xxx = ranCheerzers.slice(0, ranCheerzers.length)
		xxx.push(currentCheerzer)

		availableCheerzers.forEach(c => console.log('name:::', c.name)) 


		http.post(apiUrl+'/results', {group: xxx})
		.then(response => {
			console.log('ehehehe', response.data)
		})
		.catch(err => {
			console.log(err)
			return undefined
		})

		res.json(ranCheerzers)
	}, 1000)
	

})

app.listen(port)
console.log(`Server running on port ${port}`)