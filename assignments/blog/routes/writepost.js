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
//create blogpost model
let Blogpost = db.define( 'blogpost', {
	title: Sequelize.STRING,
	body: Sequelize.STRING
})
//create relationships
User.hasMany( Blogpost )
Blogpost.belongsTo( User )


router.use( session( {
	secret: 'muy secreto si si',
	resave: true,
	saveUninitialized: false
} ) )

//functionality for creating a new blogpost
router.post('/blogpost', bodyParser.urlencoded( {extended: true} ), ( req, res ) => {
	//error handling
	//empty title:
	if (req.body.title.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Please give your post a title") )
		return
	}
	//empty body:
	if (req.body.laundry.length === 0) {
		res.redirect('/?message=' + encodeURIComponent("Your post needs some body..") )
		return
	}
	//find the current user to link the post to the right user.
	User.findOne({
		where: {
			name: req.session.user.name
		}
	}).then( (user) => {
		user.createBlogpost({
			title: req.body.title,
			body: req.body.laundry
	}).then( () => {
		res.redirect('/home')
	})
	})
})

module.exports = router