console.log('Initializing function')

var fs = require('fs')

fs.readFile('./movie.txt', 'utf8', function(err, data){
	if(err) {
		console.log(err)
		throw err
	}
	console.log(data)
})