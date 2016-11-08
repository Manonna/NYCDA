'use strict'
//require necessary libraries
const express	 = require('express')
const fs	  	 = require('fs')
const pg 	  	 = require('pg')
const bodyParser = require('body-parser')
const app 		 = express()
//set connection path to database
const connectionString = 'postgres://postgres:postgres@localhost/bulletinboard'
//set the engine to pug and the view folder to the one in this location
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
//Make messages post to the postgreSQL database
app.post( '/guestbook', urlencodedParser, (req, res) => {
	let title 	 = req.body.title
	let body  	 = req.body.body

	pg.connect(connectionString, (err, client, done) => {
		client.query('insert into messages (title, body) values (\'' + title + '\', \'' + body + '\')', (err) => {
			if (err) throw err
			else console.log("New message posted")
				done()
				pg.end()
		})
	})
	res.redirect('/messages')
} )

//path to guestbook messages
//Takes the messages from database to render on messages page
app.get( '/messages', ( req, res ) => {
	pg.connect(connectionString, (err, client, done) => {
		client.query('select * from messages', (err, result) => {
			res.render( 'messages', {data: result.rows})
			done()
			pg.end()
		})
	})
	
})

//define port to listen on
app.listen(8000, () => {
	console.log( 'Server running' )
})