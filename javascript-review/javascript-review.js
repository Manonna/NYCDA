// write a function that takes in three parameters and returns the sum of those three parameters

function addTogether(one, two, three) {
	console.log(one+two+three)
} //this only works with three parameters

addTogether(1,2,3)


// given a string, create a function that returns the last character in that string.
// examples:
// "cattywampus" --> s

function lastLetter (word) {
	return word.charAt(word.length-1)
}
lastLetter ("Octocat")


// write a function that takes in one parameter and returns the cube of that parameter
// examples:
// 3 --> 27
// 4 --> 64

function calculateSquare(number){
	console.log(number*number) //multiplies number by itself
}
calculateSquare(2)
calculateSquare(5)
//or
function squareIt(number){
	console.log(number**2) // number to the power of two (also multiplies with itself)
}
calculateSquare(2)
calculateSquare(5)


// define a function that takes in a string and reverses it. you are not allowed to
// call the "reverse" function (or any other string functions)
function reverseWord(string){
	var reverse = "" //create empty string to += into and console.log after, otherwise it prints loose letters each loop.
	for(var i=0; i<=string.length; i++){
		reverse += string.charAt(string.length-i) //loops over the lenght of string and returns letters from back to front.
	}
	console.log(reverse)
}
reverseWord("bonkers")


// write a function that takes in two arrays of the same length as parameters. From those two arrays,
// create, then return an object which contains the elements of the first array as keys, and the
// elements of the second array as values.
// examples:
// ["exciting", "exotic"], ["markets", "britain"] --> { exciting: "markets", exotic: "britain" }
// ["a", "b", "c"], ["x", "y", "z"] --> { a: "x", b: "y", c: "z" }

function objectify(keys, values){
	var person = { } //empty object that the arrays will go into.
	for (i=0; i<keys.length; i++){
		person[keys[i]] = values[i] //loops over the length of the firs array and assigns keys as keys and values as values 
	}
	console.log(person)
}

var human = ["firstname", "lastname", "profession"]
var being = ["The", "Dude", "Unemployed"]

objectify(human, being)

// Given an object with keys and values, create two arrays: one which contains the object's keys,
// and one which contains the object's values. Wrap this into a function which takes in one object
// that contains keys and values, and returns a different object that contains two keys. The first key
// should be named "keys" and will have the first array as a value. The second key should be named
// "values" and will have the second array as a value.
// examples:
// { exciting: "markets", exotic: "britain" } --> { keys: ["exciting", "exotic"], values: ["markets", "britain"] }
// { a: "x", b: "y", c: "z" } --> { keys: ["a", "b", "c"], values: ["x", "y", "z"] }

var thing = {
	height: 2,
	width: 5, //created object to insert into function
	name: "thingy"
}

function wrapyourheadaroundthis (object) {
	var keys = []
	var values = [] 
	for (var i in object) {
		keys.push(i)
		values.push(object[i]) //created two arrays from one object
	}
		var thingum = {} 
		thingum.keys = keys
		thingum.values = values
		console.log(thingum) // the .keys and .values sets keys to keys and values, the other keys and values are the arrays created before.
}

wrapyourheadaroundthis(thing)



// OPTIONAL CHALLENGE 1
// write a function that takes in two parameters, x and n, and computes x to the nth power
// you may not use Math.* functions



// OPTIONAL CHALLENGE 2
// Jon has terrible social anxiety, and wishes to sit as far away from everyone as possible.
// Given an array of booleans, where the array represents a row of seated people, and each
// boolean represents whether the seat is occupied or not, find the ideal seat for Jon.
