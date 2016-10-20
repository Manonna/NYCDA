'use strict'
//importing necessary modules

const fs = require( 'fs' )

// Read the customer json
fs.readFile(__dirname + '/customer.json', 'utf8', (err, data) => {
	// Parse the file to a readable object
	let parsedData = JSON.parse( data )
	calcCompound( parsedData )
} )

//Helper functions
let roundDecimal = ( number ) => {
	return Math.round( number * 100 ) / 100
}

let addCommas = ( number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

let prettyNumber = ( number ) => {
	return addCommas( roundDecimal( number ) )
}

// Function to calculate compound interest from a customer object
let calcCompound = ( customer ) => {
	//Set end amount prop and calculate total duration
	customer.pension.endamount = {
		pessimistic: customer.finances.startcapital,
		average: customer.finances.startcapital,
		optimistic: customer.finances.startcapital
	}
	customer.pension.duration = ( customer.pension.age - customer.age )

	//Do the interest math
	for (var i = customer.pension.duration - 1; i >= 0; i--) {

		//add monthly spend to all the scenarios
		customer.pension.endamount.pessimistic += ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.average += ( customer.finances.monthlyadd * 12 )
		customer.pension.endamount.optimistic += ( customer.finances.monthlyadd * 12 )

		//calculate added interest
		customer.pension.endamount.pessimistic *= customer.pension.interest.pessimistic
		customer.pension.endamount.average *= customer.pension.interest.average
		customer.pension.endamount.optimistic *= customer.pension.interest.optimistic
	}
	//output our data to user
	console.log("Welcome to our advanced pension planner, " + customer.name + "!")
	console.log("You are starting with €" + customer.finances.startcapital + " and add a monthly amount of €" + customer.finances.monthlyadd)
	//output interest calculations
	console.log("When you retire at age " + customer.pension.age + " you will have the following:")
	console.log("In a pessimistic scenario: €" + prettyNumber(customer.pension.endamount.pessimistic))
	console.log("In a average scenario: €" + prettyNumber(customer.pension.endamount.average))
	console.log("In a optimistic scenario: €" + prettyNumber(customer.pension.endamount.optimistic))
}

