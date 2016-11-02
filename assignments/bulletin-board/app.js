'use strict'
//require necessary modules
const express	 = require('express')
const fs	  	 = require('fs')
const pg 	  	 = require('pg')
const bodyParser = require('body-parser')

const app = express()
//set connection path to database
const connectionString = 'postgres://postgres:postgres@localhost/bulletinboard'

app.set ( 'view engine', 'pug' )
app.set ( 'views', __dirname + '/views' )

//configure bodyparser
let urlencodedParser = bodyParser.urlencoded( { extended: true } )

//set path to static files
app.use( express.static( __dirname + '/static' ))

//Path to guestbook form
app.get( '/bulletinboard', ( req, res ) => {
	res.render( 'guestbook' )
} )

app.post( '/guestbook', urlencodedParser, (req, res) => {
	let title = req.body.title
	let body  = req.body.body

	pg.connect(connectionString, (err, client, done) => {
		console.log("this works")
		client.query('insert into messages (title, body) values (\'' + title + '\', \'' + body + '\')', (err) => {
			if (err) throw err
			else console.log ("message posted")
			done()
			pg.end()
		})
	})
	res.render( 'messages' )
} )

//path to guestbook messages
app.get( '/messages', ( req, res ) => {
	res.render( 'messages' )
})




//define port to listen on
app.listen(8000, () => {
	console.log( 'Server running' )
})