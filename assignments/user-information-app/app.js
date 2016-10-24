'use strict'
//import necessary modules
const express 	 = require('express')
const fs	  	 = require ('fs')
const bodyParser = require ('body-parser')
const app	 	 =	express()

app.set ( 'view engine', 'pug' )
app.set ( 'views', __dirname + '/views' )

let urlencodedParser = bodyParser.urlencoded({ extended: true })
let jsonParser 		 = bodyParser.json()

app.use(express.static(__dirname + '/static'))

//user list path
app.get( '/users', (req, res) =>{
	console.log ('rendering....')
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err
			let parsedData = JSON.parse(data)
		console.log(parsedData)
		res.render('index', {data: parsedData})
	})
})

//user search path
app.get( '/search', (req, res) =>{
	res.render('search')
})

//user search function
app.post( '/search', urlencodedParser, (req, res) => {
	console.log("someone searched for " + "\"" + req.body.name + "\"")

	//create empty array to loop over in pug
	let searchResult = []

	//read and parse users.json
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err
			let parsedData = JSON.parse(data)

		//loop over users.json to check if the search term matches first or last name
		for (var i = parsedData.length - 1; i >= 0; i--) {
			if (parsedData[i].firstname == req.body.name || parsedData[i].lastname == req.body.name) {
				searchResult.push (parsedData[i])
				res.render('result', {result: searchResult})
				//console.log(searchResult)
			}
		}
	})
})

//add user path
app.get ( '/add', (req, res) =>{
	res.render('add')
})

//add user function
app.post('/add', urlencodedParser, (req, res) => {
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err
			let parsedData = JSON.parse(data)
		parsedData.push(req.body)
		data = JSON.stringify(parsedData)
		fs.writeFile(__dirname + '/users.json', data, (err) => {
			if (err) throw err
				console.log('new user added:' + req.body)
				res.redirect('/users')
		})
	})
	
})



app.listen(8000, () => {
	console.log('Server running')
})