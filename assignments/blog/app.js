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
//create blogpost model
let Blogpost = db.define( 'blogpost', {
	title: Sequelize.STRING,
	body: Sequelize.STRING
})
//create comment model
let Comment = db.define( 'comment', {
	content: Sequelize.STRING
})
//create relationships
User.hasMany( Blogpost )
Blogpost.belongsTo( User )
User.hasMany( Comment )
Comment.belongsTo( User )
Blogpost.hasMany( Comment )
Comment.belongsTo( Blogpost )

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
//homepage configuration = the profile
app.get( '/home', ( req, res ) => {
	let curuser = req.session.user
	if ( curuser === undefined ) {
		res.redirect( '/?message=' + encodeURIComponent( 'Please log in to view your profile' ) )
	} else {
		User.findOne({ 
			where: {
				email: req.session.user.email
			},
			include: [{
				model: Blogpost,
				attributes: ['title', 'body']
			} ]
		}).then( (user) =>{
				res.render( 'home', {
					user: user
				})
			})
	}
} )
app.get('/allposts', (req, res) => {
	Blogpost.findAll({
		attributes: ['title', 'body'],
		include: [{
			model: User,
			attributes: ['name']
		}]
	}).then((posts)=>{
		res.send(posts)
	})
})

app.get('/ownposts', (req, res) => {
	User.findOne({
		where: {
			email: req.session.user.email
		},
		attributes: ['name'],
		include: [{
			model:Blogpost,
			attributes: ['title', 'body']
		}]
	}).then( (user) =>{
		res.send( user )
	})
})
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
//create signup functionality = new users
app.post('/signup', bodyParser.urlencoded( {extended: true} ), ( req, res) => {
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
			User.create( {
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			}).then (() => {
				res.redirect('/home')
			})
		}
	})
})
//create logout option
app.get( '/logout', ( req, res ) => {
	req.session.destroy( ( err )=> {
		if ( err ) {
			throw err
		}
		res.redirect( '/?message=' + encodeURIComponent( "Successfully logged out" ) )
	} )
} )
//functionality for creating a new blogpost
app.post('/blogpost', bodyParser.urlencoded( {extended: true} ), ( req, res ) => {
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

db.sync( {force: true} ).then( ( ) => {
	User.create( {
		name: "mrAnderson",
		email: "mr@ander.son",
		password: "theone"
	} ).then( (user) =>{
		user.createBlogpost( {
			title: "secretlover",
			body: "I love neo"
		})
	}).then( ( ) => {
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