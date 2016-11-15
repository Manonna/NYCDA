'use strict'
//require necessary libraries
const express 	 = require ( 'express' )
const Sequelize  = require ( 'sequelize' )
const bodyParser = require ( 'body-parser' )
const session 	 = require ( 'express-session' )
//create app
const app 		 = express( )
//set static resources to the following directory
app.use( express.static(__dirname + '/static' ) )
//setup link to database
const db 		 = new Sequelize ( 'blog', 'postgres', 'postgres', {
	server: 'localhost',
	dialect: 'postgres'
} )
//Create necessary models
//create user model
let User = db.define( 'user', {
	name: Sequelize.STRING,
	email: {type: Sequelize.STRING, unique: true},
	password: Sequelize.STRING
})

app.use( session( {
	secret: 'muy secreto si si',
	resave: true,
	saveUninitialized: false
} ) )

//setting views to the following directory and engine to pug
app.set( 'views', __dirname + '/views' )
app.set( 'view engine', 'pug' )
//test server connection
//app.get( '/ping', ( req, res ) => {
//	res.send( 'pong' )
//} )

app.get( '/', ( req, res ) => {
	res.render( 'main', {
		message: req.query.message,
		user: req.session.user
	} )
} )
//homepage configuration
app.get( '/home', ( req, res ) => {
	let user = req.session.user
	if ( user === undefined ) {
		res.redirect( '/?message=' + encodeURIComponent( 'Please log in to view your profile' ) )
	} else {
		res.render( 'home', {
			user: user
		} )
	}
} )
//create login functionality
app.post( '/login', bodyParser.urlencoded( {extended: true} ), ( req, res ) => {
	if( req.body.email.length === 0 ) {
		res.redirect( '/?message=' + encodeURIComponent( "Please fill out your email" ) )
		return
	}
	if ( req.body.password.length === 0 ) {
		res.redirect( '/?message=' + encodeURIComponent( "Please fill out your password" ) )
		return
	}
	User.findOne( {
		where: {
			email: req.body.email
		}
	} ).then( ( user ) => {
		if ( user !== null && req.body.password === user.password ) {
			req.session.user = user
			res.redirect( '/home' )
		} else {
			res.redirect( '/?message=' + encodeURIComponent( "Invalid email or password" ) )
		}
	}, ( err ) => {
		res.redirect( '/?message=' + encodeURIComponent( "Invalid email or password" ) )
	} )
} )
//create logout option
app.get( '/logout', ( req, res ) => {
	req.session.destroy( ( err )=> {
		if ( err ) {
			throw err
		}
		res.redirect( '/?message=' + encodeURIComponent( "Successfully logged out" ) )
	} )
} )

db.sync( {force: true} ).then( ( ) => {
	User.create( {
		name: "mrAnderson",
		email: "mr@ander.son",
		password: "theone"
	} ).then( ( ) => {
		let server = app.listen( 8000, ( ) => {
			console.log( 'I hear ya on port: ' + server.address( ).port )
		} )
	} )
}, (err ) => {
	console.log( 'sync failed: ' )
	console.log( err )
}  )

//listen on port 8000
//app.listen( 8000, ( ) => {
//	console.log( "I hear ya, 8000" )
//} )