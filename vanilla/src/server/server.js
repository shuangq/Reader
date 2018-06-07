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
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = require('../../spec/secret.config.js').secret;

var Server = function (port) {
    var app = express();

    // Accept both JSON and url encoded values
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use('/', express.static(path.join(__dirname, '../client/dist')));

    app.get('/', function (req, res) {
        res.set('Content-Type', 'text/html');
        res.sendFile(__dirname + '/index.html');
    });


    /**
     * Routes
     */

    // Log the user in.
    // Finally the user is returned from the request.
    app.post('/api/login', function (req, res) {
        if (!req.body.email || !req.body.password) {
            res.status(401).json({
                error: 'Authentication failed. Missing email or password.'
            });
        } else {
            dbSession.fetchRow('SELECT * FROM User WHERE Email=?',
            [req.body.email],
            function (err, user) {
                if (!user) {
                    res.status(401).json({
                        error: 'Authentication failed. Email doesn\'t exist.',
                    });
                } else {
                    bcrypt.compare(req.body.password, user.Password, function (err, result) {
                        if (result == true) {
                            var payload = {
                                userId: user.UserId,
                                email: user.Email,
                                firstName: user.FirstName,
                                surName: user.SurName,
                            };
                            var token = jwt.sign(payload, secret);
                            res.status(200).json({
                                message: 'Login success.',
                                token: token
                            });
                        } else {
                            res.status(401).json({
                                error: 'Authentication failed. Password is not correct.'
                            });
                        }
                    });
                }
            });
        }
    });

    app.get('/api/articles', function (req, res) {
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

    app.get('/api/article/:id', function (req, res) {
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
    app.get('*', function (req, res) {
        res.redirect('/');
    });

    return http.createServer(app);
};

module.exports = {
    'Server': Server
};