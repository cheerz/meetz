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
	resultsOfTheday = response.data
})
.catch(err => {
	console.log(err)
	return undefined
})

const getRandomCheerzers = (cheerzers, currentCheerzer) => {
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

app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/index.html')
})

// all routes will be prefixed with /api
app.use('/api', router)

router.route('/cheerzers/:current_cheerzer_name')
.get((req, res, next) => {
	const ranCheerzers = getRandomCheerzers(availableCheerzers, {name: req.params.current_cheerzer_name})
	res.json(ranCheerzers)
	/*
	http.post(apiUrl+'/results', ranCheerzers)
	.then(response => {
		console.log('ehehehe', response.data)
	})
	.catch(err => {
		console.log(err)
		return undefined
	})
	*/
})

app.listen(port)
console.log(`Server running on port ${port}`)