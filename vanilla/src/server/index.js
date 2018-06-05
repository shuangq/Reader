/**
 * Run server
 */
'use strict';

var Server = require('./server.js').Server;
var server = Server();

var listener = server.listen(3000, function() {
    console.log('Server started and listening on port: ', listener.address().port);
});