'use strict'
//import necessary modules
const fs = require ( 'fs' )

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

//function that reads and parses customers file
let AnalyzeCustomers = ( customers ) => {
	fs.readFile( customers, 'utf8', (err, data) => {
	// Parse the file to a readable object
	let parsedData = JSON.parse( data )
	calcCompound( parsedData )
} )
}

//function that loops over each customer and calculates and outputs compound interest
let calcCompound = ( customers ) => {
	//set end amound prop and calculate total duration for each customer
	for (var i = customers.length - 1; i >= 0; i--) {
		customers[i].pension.endamount = {
			pessimistic: customers[i].finances.startcapital,
			average: customers[i].finances.startcapital,
			optimistic: customers[i].finances.startcapital	
		}
	customers[i].pension.duration = ( customers[i].pension.age - customers[i].age )

	//Do the interest math
	for (var j = customers[i].pension.duration - 1; j >= 0; j--) {

		//add monthly spend to all the scenarios
		customers[i].pension.endamount.pessimistic += ( customers[i].finances.monthlyadd * 12 )
		customers[i].pension.endamount.average += ( customers[i].finances.monthlyadd * 12 )
		customers[i].pension.endamount.optimistic += ( customers[i].finances.monthlyadd * 12 )

		//calculate added interest
		customers[i].pension.endamount.pessimistic *= customers[i].pension.interest.pessimistic
		customers[i].pension.endamount.average *= customers[i].pension.interest.average
		customers[i].pension.endamount.optimistic *= customers[i].pension.interest.optimistic
	}
	console.log("Welcome to our advanced pension planner, " + customers[i].name + "!")
	console.log("You are starting with €" + customers[i].finances.startcapital + " and add a monthly amount of €" + customers[i].finances.monthlyadd)
	//output interest calculations
	console.log("When you retire at age " + customers[i].pension.age + " you will have the following:")
	console.log("In a pessimistic scenario: €" + prettyNumber(customers[i].pension.endamount.pessimistic))
	console.log("In a average scenario: €" + prettyNumber(customers[i].pension.endamount.average))
	console.log("In a optimistic scenario: €" + prettyNumber(customers[i].pension.endamount.optimistic) + "\n")
	}
	
}

module.exports = AnalyzeCustomers