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

//create signup functionality = new users
router.post('/signup', bodyParser.urlencoded( {extended: true} ), ( req, res) => {
	let password = req.body.password

	if( req.body.name.length === 0 ) {
		res.redirect( '/?message=' + encodeURIComponent( "Please fill out your name") )
		return
	}
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
	}).then( (user) => {
		if (user !== null) {
			res.redirect( '/?message=' + encodeURIComponent( "You already have an account, please login" ) )
		}
		else if (user === null) {
			bcrypt.hash(password, null, null, (err, hash) => {
				User.create( {
				name: req.body.name,
				email: req.body.email,
				password: hash
				}).then (() => {
					res.redirect('/home')
					})
			})
		}
	})
})

module.exports = router