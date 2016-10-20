var fs = require('fs')

fs.writeFile(__dirname + '/content.txt', "SUPER MEGA UKULELE", function(err){
	if(err) throw err
})