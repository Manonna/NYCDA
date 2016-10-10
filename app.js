var fs = require('fs')

fs.readdir(__dirname + '/data', function(err, files){
	console.log(files)
	// if(err) throw err
	for(var i=0; i<files.length; i++){
			console.log(files[i])
			fs.readFile(__dirname + '/data/' + files[i], 'utf8', function(err,data){
				// if(err) throw err
				console.log(data)
			})
			}
})





/*fs.readFile('file.txt', 'utf8', function(err, data){
	if(err) throw err;
		console.log(data);
});

fs.readFile('another-file.txt', 'utf8', function(err, data){
	if(err) throw err
		console.log(data)
})*/
