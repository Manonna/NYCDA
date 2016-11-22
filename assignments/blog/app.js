'use strict'
//require necessary libraries
const express 	 = require ( 'express' )
const Sequelize  = require ( 'sequelize' )
const bodyParser = require ( 'body-parser' )
const session 	 = require ( 'express-session' )
const bcrypt	 = require ( 'bcrypt-nodejs' )
//create app
const app 		 = express( )
//set static resources to the following directory
app.use( express.static(__dirname + '/static' ) )
//setup link to database
const db 		 = new Sequelize ( 'blog', process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
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

//require routes
let loginlogoutRouter = require(__dirname + '/routes/loginlogout')
let signupRouter = require (__dirname + '/routes/signup')
let homeRouter = require(__dirname + '/routes/home')
let writepostRouter = require(__dirname + '/routes/writepost')
let ownpostsRouter = require(__dirname + '/routes/ownposts')
let allpostsRouter = require(__dirname + '/routes/allposts')

app.use('/', loginlogoutRouter)
app.use('/', signupRouter)
app.use('/', homeRouter)
app.use('/', writepostRouter)
app.use('/', ownpostsRouter)
app.use('/', allpostsRouter)

db.sync( {force: true} ).then( ( ) => {
	bcrypt.hash("theone", null, null, (err, hash) => {
		User.create( {
		name: "mrAnderson",
		email: "mr@ander.son",
		password: hash
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
})
