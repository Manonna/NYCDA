'use strict'
//import necessary modules
const express 	 = require('express')
const fs	  	 = require ('fs')
const bodyParser = require ('body-parser')
const app	 	 =	express()

app.set ( 'view engine', 'pug' )
app.set ( 'views', __dirname + '/views' )

app.get( '/users', (req, res) =>{
	console.log ('rendering....')
	fs.readFile(__dirname + '/users.json', (err, data) => {
		if (err) throw err
		let parsedData = JSON.parse(data)
		console.log(parsedData)
		res.render('index', {data: parsedData})
	})
})

app.get( '/search', (req, res) =>{
	res.render('search')
})

app.listen(8000, () => {
	console.log('Server running')
})