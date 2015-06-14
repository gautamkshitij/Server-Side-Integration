/**
 * Module dependencies.
 */

var express = require('express');
var handlers = require('./handlers');
//var user = require('./routes/user'); //remove this line
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


/*3. 
Listening to any type of request
*/
app.all('/', function(req, res, next) {
    res.set('X-Catch-All', 'true'); //x-catch-all is a custom header
    next();
});



/*1. GET Request*/
app.get('/', handlers.greetings);
/*1. handlers. greetings is a function defined in handlers folder, and function greetings is called (as it is exported to global scope)
and handlers is a variable that is defined above which instantiates requires('./handlers')
*/
app.get('/flight/flight1', handlers.flight1);
/*1. 
flight1 is a function defined in handlers, index.js
*/

/*
2. POST, PUT, PATCH, DELETE, OPTIONS, M-SEARCH, NOTIFY, SUBSRIBE, UNSUBSRIBE, 
*/
app.post('/', function(req, res) {
    res.send("This is a Post request, write your handler to handle POST request");


});
app.put('/', function(req, res) {
    res.send("This is a PUT request, write your handler to handle PUT request");

});
app.patch('/', function(req, res) {
    res.send("This is a patch request, write your handler to handle POST request");

});
app.delete('/', function(req, res) {
    res.send("This is a Delete request, write your handler to handle Delete request");

});
app.options('/', function(req, res) {
    res.send("This is a options request, write your handler to handle options request");

});
app.notify('/', function(req, res) {
    res.send("This is a notify request, write your handler to handle notify request");

});
app.subscribe('/', function(req, res) {
    res.send("This is a subscribe request, write your handler to handle subscribe request");

});
app.unsubscribe('/', function(req, res) {
    res.send("This is a unsubscribe request, write your handler to handle unsubscribe request");

});

/*
====================================================================================
4. Named PLaceholders
The value of the named placeholder is available in the req.params object in a property with a similar name.
lookup is performed in the following order:
req.params
req.body
req.query
*/
app.get('/flight/:id', function(req, res) {

    res.send('Request flight id is:' + req.params.id);

    res.send("More functionality will be added on later stages");

});

app.get('/flight/:id/arrival/:arrival/destination/:destination', function(req, res) {
    res.send(req.params.id + ' from ' + req.params.arrival + ' to ' + req.params.destination);
});

app.get('/flight/:id/journey/:from-:to', function(req, res) {
    res.send(req.params.from + ' to ' + req.params.to);
});

app.get('/file/:name.:ext', function(req, res) {
    res.send(req.params.name + '.' + req.params.ext.toLowerCase());
});
/*
====================================================================================
*/


/*
5.
====================================================================================
getting Large data from flight_data.js (json format)
*/
app.get('/flights/:number',handlers.flights);

/*
====================================================================================
*/




/*
====================================================================================
sample framework comments, copy and paste
*/

/*
====================================================================================
*/


/*
============================================PREVIOUS CODE
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
http://serverfault.com/questions/271824/node-js-is-not-accessible-from-external-ips-on-ubuntu
============================================
*/
http.createServer(app).listen(8080, "0.0.0.0", function(req, res) {

    console.log('Server running at http://0.0.0.0:8080/');

});