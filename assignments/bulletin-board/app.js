'use strict'
//require necessary modules
const express = require('express')
const fs	  = require('fs')
const pg 	  = require('pg')

const app = express()
//set connection path to database
const connectionString = 'postgres://postgres:postgres@localhost/bulletinboard'

app.set ( 'view engine', 'pug' )
app.set ( 'views', dirname + '/views' )

//configure bodyparser
let urlencodedParser = bodyParser.urlencoded( { extended: true } )

//set path to static files
app.use( express.static( __dirname + '/static' ))

//Path to guestbook form
app.get( '/guestbook', ( req, res ) => {
	res.render( 'guestbook' )
} )

//path to guestbook messages
app.get( '/messages', ( req, res ) => {
	res.render( 'messages' )
})




//define port to listen on
app.listen(8000, () => {
	console.log( 'Server running' )
})