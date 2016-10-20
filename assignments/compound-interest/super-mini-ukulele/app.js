'use strict'
//import necessary modules
const fs = require ( 'fs' )
const calculator = require ( __dirname + '/calc-module' )

let customer = __dirname + '/customer.json'


//perform calculations on specific customer
calculator ( customer )