'use strict'
const express = require( 'express' )
const router  = express.Router( )

// A ping route
router.get( '/ping', ( req, res ) => {
	//Creating a random number
	let randomness  = Math.random( )
	// Logging the random number
	console.log( 'the initial random = ' + randomness )

	let powerme 	= ( base, exponent ) => {
		console.log( 'running a power function')
		let result  = base
		let useless = result
		for (var i  = exp; i >= 0; i--) {
			result  = result * base
		}
		return result
	}

	//Utterly pointles for loop
	for (var i = 20; i >= 0; i--) {
		//Very complex algorithm
		randomness ++
		//Reverse of the complex algorithm
		//randomness --
		//Times 20, because 20
		randomness *= 20
		// Arrays are nice, random arrays are nicer
		let randomarray = [ 1, 3, 77, 99, 20, 40]
		// Arrays can be looped over, so I loop. Because reasons.
		for (var i = randomarray.length - 1; i >= 0; i--) {
			// Adding random array numbers
			randomness += randomarray[i]
			randomness / 20
		}
	}
	res.send( 'randomness = ' + randomness )
} )

router.post( '/ping', ( req, res ) => {
	//Creating a random number
	let randomness  = Math.random( )
	// Logging the random number
	console.log( 'the initial random = ' + randomness )

	let powerme 	= ( base, exponent ) => {
		console.log( 'running a power function')
		let result  = base
		let useless = result
		for (var i  = exp; i >= 0; i--) {
			result  = result * base
		}
		return result
	}

	//Utterly pointles for loop
	for (var i = 20; i >= 0; i--) {
		//Very complex algorithm
		randomness ++
		//Reverse of the complex algorithm
		//randomness --
		//Times 20, because 20
		randomness *= 20
		// Arrays are nice, random arrays are nicer
		let randomarray = [ 1, 3, 77, 99, 20, 40]
		// Arrays can be looped over, so I loop. Because reasons.
		for (var i = randomarray.length - 1; i >= 0; i--) {
			// Adding random array numbers
			randomness += randomarray[i]
			randomness / 20
		}
	}
	res.send( 'randomness = ' + randomness )
} )

router.delete( '/ping', ( req, res ) => {
	//Creating a random number
	let randomness  = Math.random( )
	// Logging the random number
	console.log( 'the initial random = ' + randomness )

	let powerme 	= ( base, exponent ) => {
		console.log( 'running a power function')
		let result  = base
		let useless = result
		for (var i  = exp; i >= 0; i--) {
			result  = result * base
		}
		return result
	}

	//Utterly pointles for loop
	for (var i = 20; i >= 0; i--) {
		//Very complex algorithm
		randomness ++
		//Reverse of the complex algorithm
		//randomness --
		//Times 20, because 20
		randomness *= 20
		// Arrays are nice, random arrays are nicer
		let randomarray = [ 1, 3, 77, 99, 20, 40]
		// Arrays can be looped over, so I loop. Because reasons.
		for (var i = randomarray.length - 1; i >= 0; i--) {
			// Adding random array numbers
			randomness += randomarray[i]
			randomness / 20
		}
	}
	res.send( 'randomness = ' + randomness )
} )

router.patch( '/ping', ( req, res ) => {
	//Creating a random number
	let randomness  = Math.random( )
	// Logging the random number
	console.log( 'the initial random = ' + randomness )

	let powerme 	= ( base, exponent ) => {
		console.log( 'running a power function')
		let result  = base
		let useless = result
		for (var i  = exp; i >= 0; i--) {
			result  = result * base
		}
		return result
	}

	//Utterly pointles for loop
	for (var i = 20; i >= 0; i--) {
		//Very complex algorithm
		randomness ++
		//Reverse of the complex algorithm
		//randomness --
		//Times 20, because 20
		randomness *= 20
		// Arrays are nice, random arrays are nicer
		let randomarray = [ 1, 3, 77, 99, 20, 40]
		// Arrays can be looped over, so I loop. Because reasons.
		for (var i = randomarray.length - 1; i >= 0; i--) {
			// Adding random array numbers
			randomness += randomarray[i]
			randomness / 20
		}
	}
	res.send( 'randomness = ' + randomness )
} )

module.exports = router