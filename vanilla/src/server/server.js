/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbSession = require('../../src/server/dbSession.js');
var he = require('he');


var Server = function (port) {
    var server = express();

    // accept both JSON and url encoded values
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({
        extended: true
    })); 

    server.use('/', express.static(path.join(__dirname, '../client/dist')));

    server.get('/', function (req, res) {
        res.set('Content-Type', 'text/html');
        res.sendFile(__dirname + '/index.html');
    });

    server.get('/api/articles', function (req, res) {
        dbSession.fetchAll('SELECT ArticleId, Title, Author, Date, PosterUrl FROM Article ORDER BY Date', function (err, rows) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json({
                    articles: rows
                });
            }
        });
    });

    server.get('/api/article/:id', function (req, res) {
        var articleId = he.escape(req.params.id);

        dbSession.fetchRow('SELECT Title, Author, Date, Body FROM Article WHERE ArticleId=?', [articleId], function (err, row) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).json({
                    article: row
                });
            }
        });
    });

    // redirect unmatch route to homepage
    server.get('*', function (req, res) {
        res.redirect('/');
    });

    return http.createServer(server);
};

module.exports = {
    'Server': Server
};