/**
 * Provide a Server function that sets up a SPDY server object for us
 */
'use strict';

var fs = require('fs');
var spdy = require('spdy');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = require('./router');

// Get key and certificate for https
var options = {
    key: fs.readFileSync(path.join(__dirname, 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert.pem')),
    spdy: {
        protocols: ['http/1.1', 'http/1.0']
    }
};


var Server = function () {
    var app = express();

    // Accept both JSON and url encoded values
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Allow CORS for development.
    // @TODO: Remove in production    
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', '*');
        next();
    });

    // Serve static files
    // @TODO: Uncomment in production
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('/', function (req, res) {
        res.set('Content-Type', 'text/html');
        res.sendFile(path.join(__dirname, '../client/dist') + '/home.html');
    });

    app.use('/', router);

    return spdy.createServer(options, app);
};

module.exports = {
    'Server': Server
};