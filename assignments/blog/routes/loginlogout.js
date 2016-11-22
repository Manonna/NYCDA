'use strict'
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const bcrypt	= require('bcrypt-nodejs')
const session = require ('express-session')
const Sequelize = require('sequelize')

const db 		 = new Sequelize ( 'blog', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	server: 'localhost',
	dialect: 'postgres'
} )

let User = db.define( 'user', {
	name: Sequelize.STRING,
	email: {type: Sequelize.STRING, unique: true},
	password: Sequelize.STRING
})

router.use( session( {
	secret: 'muy secreto si si',
	resave: true,
	saveUninitialized: false
} ) )

router.get( '/', ( req, res ) => {
	res.render( 'main', {
		message: req.query.message,
		user: req.session.user
	} )
} )

//create login functionality
router.post( '/login', bodyParser.urlencoded( {extended: true} ), ( req, response ) => {
	let password = req.body.password

	if( req.body.email.length === 0 ) {
		response.redirect( '/?message=' + encodeURIComponent( "Please fill out your email" ) )
		return
	}
	if ( req.body.password.length === 0 ) {
		response.redirect( '/?message=' + encodeURIComponent( "Please fill out your password" ) )
		return
	}
	User.findOne( {
		where: {
			email: req.body.email
		}
	} ).then( ( user ) => {
		bcrypt.compare(password, user.password, (err, res) =>{
			console.log(res)
			if (user !== null && res == true) {
				req.session.user = user
				response.redirect( '/home' )
			} else {
				response.redirect( '/?message=' + encodeURIComponent( "Invalid email or password" ) )
			}
			}, ( err ) => {
				response.redirect( '/?message=' + encodeURIComponent( "Invalid email or password" ) )
			} )
		})
})

//create logout option
router.get( '/logout', ( req, res ) => {
	req.session.destroy( ( err )=> {
		if ( err ) {
			throw err
		}
		res.redirect( '/?message=' + encodeURIComponent( "Successfully logged out" ) )
	} )
} )

module.exports = router