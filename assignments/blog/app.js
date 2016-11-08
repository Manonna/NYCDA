'use strict'
//require necessary libraries
const express 	= require ( 'express' )
const sequelize = require ( 'sequelize' )
//create app
const app 		= express()
//setup link to database
const db 		= new sequelize ( 'blog', 'postgres', 'postgres', {
	host: 'localhost',
	dialect: 'postgres'
} )

app.get('/ping', (req, res) => {
	res.send('pong')
})



app.listen(8000, () => {
	console.log("I hear ya, 8000")
})