/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var http = require('http');
var express = require('express');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var dbSession = require('../../src/server/dbSession.js');
var he = require('he');
var bcrypt = require('bcrypt');

var Server = function (port) {
    var app = express();

    // Accept both JSON and url encoded values
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // Initializing the session
    app.use(session({
        secret: 'somethingsupersecret',
        resave: false,
        saveUninitialized: true,
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
            dbSession.fetchOne('SELECT Password FROM User WHERE Email=?',
            [req.body.email],
            function (err, result) {
                if (!result) {
                    res.status(401).json({
                        error: 'Authentication failed.'
                    });
                } else {
                    bcrypt.compare(req.body.password, result, function (err, result) {
                        if (result == true) {
                            req.session.user = req.body.email;
                            res.status(200).json({
                                message: 'Login success.'
                            });
                        } else {
                            res.status(401).json({
                                error: 'Authentication failed.'
                            });
                        }
                    });
                }
            });
        }
    });

    // Check if uses is logged in.
    app.get('/api/login', function (req, res) {
        res.session.user ? res.status(200).send({
            loggedIn: true
        }) : res.status(200).send({
            loggedIn: false
        });
    });

    // Log the user out.
    app.post('/api/logout', function (req, res) {
        req.session.destroy(function (err) {
            if (err) {
                res.status(500).send('Could not log out');
            } else {
                res.status(200).send({});
            }
        });
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