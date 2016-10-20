'use strict'
//import necessary modules
const fs = require('fs')

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

fs.readdir(__dirname + '/customers', function(err, files){
	//console.log(files)
	// if(err) throw err
	for(var i=0; i<files.length; i++){
			//console.log(files[i])
			fs.readFile(__dirname + '/customers/' + files[i], 'utf8', function(err,data){
				// if(err) throw err
				//console.log(data)
				let parsedData = JSON.parse(data)
				calcCompound(parsedData)
				//console.log(parsedData)
			})
			}

})

let calcCompound = (customer) => {
	customer.pension.endamount = {
		pessimistic: customer.finances.startcapital,
		average: customer.finances.startcapital,
		optimistic: customer.finances.startcapital
	}
	customer.pension.duration = ( customer.pension.age - customer.age)

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
	console.log("In a optimistic scenario: €" + prettyNumber(customer.pension.endamount.optimistic) + '\n')
}
