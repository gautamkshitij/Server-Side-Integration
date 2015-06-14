/*
 * GET home page.
 */


/*
1.
flight_module attaches a function(info) to module.exports, which is equated to flight (variable or function) here.
This function will be used now to 
*/
var flight = require('./flight_module');

/*
sample data
*/

var flight1 = flight({
	number: 1,
	origin: 'Delhi',
	destination: 'CHicago',
	departs: 'London',
	arrives: 'ABC',
	actualDepart: 'ASAS',
	actualArrive: 'kkk'
});

/*
5.
====================================================================================
getting Large data from flight_data.js (json format)
*/

var flight_data = require('../data/flight_data');

for (var number in flight_data) {
	flight_data[number] = flight(flight_data[number]);
}
/*
====================================================================================
*/


/* 
1.
Flight() is a function defined in ./flight_module
*/
exports.greetings = function(req, res) {
	res.send("hello world from another branch");
};
exports.flight1 = function(req, res) { //we have to call this function using app.js
	res.json(flight1.getInformation());
};
exports.flights = function(req, res) {

	var uniqueNumber = req.params.number;

	if (typeof flight_data[uniqueNumber] === 'undefined') {

		res.status(404).json({
			status: "error"
		});
	} else {
		res.json(flight_data[uniqueNumber].getInformation());
	}



	//res.json(flight_data[req.params.number]);

};