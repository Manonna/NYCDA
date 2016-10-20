'use strict'
//import necessary modules
const fs = require ( 'fs' )
const calculator = require ( __dirname + '/calc-module' )

//Define customer file to be analyzed
let customers = __dirname + '/customers.json'

//perform calculations on specific customer
calculator ( customers )