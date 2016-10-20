/*Create a Node.js application that does the following:
- Takes in one parameter from the command line, the name of a country. 
Note: command line arguments can be read from the global array `process.argv`
- Reads and parses the `countries.json` file. Note: you must use readFile and 
not readFileSync. 
- Outputs information about that specific country. Must be in the following format:
Country: <country name>
Top Level Domain: <tld> */

/*Part 2:*/

var fs = require('fs')
var reader = require(__dirname + '/json-file-reader')

var file = __dirname + '/data/countries.json'

reader (file, dosomething)

function dosomething (obj){
	for (var i=0; i<obj.length; i++){
			if (obj[i].name === process.argv[2]) //when country name equals name entered
			console.log("Country: " + obj[i].name + "\n" + "Top Level Domain: " + obj[i].topLevelDomain)	
	} //loops over each object in the array and gives the value of .name and .tld if country name equals name entered in command line
}

/*Part 1:

var fs = require('fs')

fs.readFile(__dirname + '/data/countries.json', 'utf8', function(err, data){
	if (err) throw err
	var obj = JSON.parse(data) // read and parsed
	for (var i=0; i<obj.length; i++){ //accessing object key values in array
			if (obj[i].name === process.argv[2])
			console.log("Country: " + obj[i].name + "\n" + "Top Level Domain: " + obj[i].topLevelDomain)
		
	}

}) */



