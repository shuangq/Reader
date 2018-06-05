/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var http = require('http');
var express = require('express');
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

    server.get('/api/articles', function (req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        dbSession.fetchAll('SELECT ArticleId, Title, Author, Date, PosterUrl FROM Article ORDER BY Date', function (err, rows) {
            if (err) {
                console.log(err);
                res.status.internalServerError(err);
            } else {
                res.json({articles: rows});
                res.status(200).send();
            }
        });
    });

    server.get('/api/article/:id', function (req, res) {
        var articleId = he.escape(req.params.id);

        res.setHeader('Access-Control-Allow-Origin', '*');
        dbSession.fetchRow('SELECT Title, Author, Date, Body FROM Article WHERE ArticleId=?', [articleId], function (err, row) {
            if (err) {
                console.log(err);
                res.status.internalServerError(err);
            } else {
                res.json({article: row});
                res.status(200).send();
            }
        });
    });

    return http.createServer(server);
};

module.exports = {
    'Server': Server
};