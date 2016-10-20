'use strict'
// npm init, npm install -- save express, pug, body-parser 
//Require necessary modules
const express = require ( 'express' )
const fs	  = require ( 'fs' )

const app	  = express ( )

//setting view engine and views directory
app.set ( 'view engine', 'pug' )
app.set ( 'views', __dirname + '/views' )

//--------------------------part 1-----------------------------
//Page with a form that takes in a person's pension plan
app.get ( '/index', (req, res) => {
	res.render ( 'index' )
})



app.listen (8000, () => {
	console.log( 'Server running..' )
})