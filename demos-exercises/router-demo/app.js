'use strict'
const express  = require( 'express' )
const app 	   = express( )

let pingRouter = require( __dirname + '/routes/ping' )
let duckRouter = require( __dirname + '/routes/duck')

app.use( '/router', pingRouter )
app.use( '/animals', duckRouter )

app.listen( 8000, ( ) => {
	console.log( 'server running' )
} )