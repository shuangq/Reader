/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var spdy = require('spdy');
var fs = require('mz/fs');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var dbSession = require('../../src/server/dbSession.js');
var he = require('he');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = require('../../spec/secret.config.js').secret; // secret for hashing password

// Get key and certificate for https
var options = {
    key: fs.readFileSync(__dirname + '/key.pem'),
    cert: fs.readFileSync(__dirname + '/cert.pem'),
    protocols: ['h2', 'spdy', 'http/1.1'],
};

// Static files path
var publicPath = path.join(__dirname, '../client/dist');

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
    app.use(express.static(publicPath));

    // app.use(express.static(publicPath));

    app.get('/', function (req, res) {
        res.setHeader('Content-Type', 'text/html')
        res.status(200).sendFile(publicPath + '/home.html');
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
            dbSession.fetchRow('SELECT * FROM User WHERE Email=?', [req.body.email],
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

    // Get all the articles
    // If userId is given in the query, mark the user saved articles with the user id,
    // otherwise mark user as null.
    app.get('/api/articles', function (req, res) {
        if (req.query.uid) {
            var userId = he.escape(req.query.uid);

            dbSession.fetchAll(`
            SELECT * FROM(
                SELECT Article.ArticleId,
                    Article.Title,
                    Article.Author,
                    Article.PosterUrl,
                    Article.Date,
                    UserSavedArticle.UserID as User 
                FROM Article JOIN UserSavedArticle ON Article.ArticleID = UserSavedArticle.ArticleID 
                WHERE UserSavedArticle.UserId = ?

                UNION

                SELECT Article.ArticleId,
                    Article.Title,
                    Article.Author,
                    Article.PosterUrl,
                    Article.Date,
                    NULL AS User 
                FROM Article 
                WHERE Article.ArticleId NOT IN(
                    SELECT UserSavedArticle.ArticleId 
                    FROM UserSavedArticle 
                    WHERE UserSavedArticle.UserId = ?
                )
            ) AS RESULT 
            ORDER BY RESULT.Date DESC`, [userId, userId], function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        articles: rows
                    });
                }
            });
        } else {
            dbSession.fetchAll('SELECT ArticleId, Title, Author, Date, PosterUrl, NULL AS User FROM Article ORDER BY Date', function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err);
                } else {
                    res.status(200).json({
                        articles: rows
                    });
                }
            });
        }



    });

    // Get article content by article id
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

    // Get user saved articles by user id
    app.get('/api/:uid/saved', function (req, res) {
        var userId = he.escape(req.params.uid);

        dbSession.fetchAll(`
        SELECT Article.ArticleId,
            Article.Title,
            Article.Author,
            Article.Date,
            Article.PosterUrl,
            UserSavedArticle.UserId AS User 
        FROM Article JOIN UserSavedArticle ON Article.ArticleID = UserSavedArticle.ArticleID
        WHERE UserSavedArticle.UserId=?
        ORDER BY UserSavedArticle.SavedDate DESC`, [userId], function (err, rows) {
            if (err) {
                res.status(500).json({
                    error: err,
                });
            } else {
                res.status(200).json({
                    saved: rows,
                });
            }

        });
    });

    // Insert user saved article
    app.put('/api/:uid/saved', function (req, res) {
        var userId = he.escape(req.params.uid);
        var date = new Date().toLocaleString();
        var data = {
            'UserId': parseInt(userId, 10),
            'ArticleId': parseInt(req.body.articleId, 10),
            'SavedDate': date,
        };

        dbSession.insert('UserSavedArticle', data, function (err) {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    userId: data.UserId,
                    articleId: data.ArticleId,
                    savedDate: data.SavedDate,
                });
            }
        });
    });

    // Delete user saved article
    app.delete('/api/:uid/saved/:aid', function (req, res) {
        var userId = he.escape(req.params.uid);
        var articleId = he.escape(req.params.aid);

        dbSession.remove('UserSavedArticle', [
            ['UserId=?', userId],
            ['ArticleId=?', articleId]
        ], function (err) {
            if (err) {
                res.status(500).json({
                    error: err
                });
            } else {
                res.status(200).json({
                    userId: parseInt(userId, 10),
                    articleId: parseInt(articleId, 10),
                });
            }
        });
    });

    // redirect unmatch route to homepage
    // app.get('*', function (req, res) {
    //     res.redirect('/');
    // });

    return spdy.createServer(options, app);
};

module.exports = {
    'Server': Server
};