/**
 * Helper code: insert data into database
 */
'user strict';

var async = require('async');
var env = require('../src/server/env');
var dbSession = require('../src/server/dbSession.js');
var dbOptions = require('../database.json')[env];
var he = require('he');
var bcrypt = require('bcrypt');
var resetDatabase = require('./resetDatabase.js');
var articles = require('./data.js').articles;
var users = require('./secret.config.js').users;
var saltRounds = require('./secret.config.js').saltRounds;

var insertData = function (dbSession, callback) {
    // encode all the text first
    const encodedArticles = articles.map(function (article) {
        return {
            'Title': article.Title,
            'Author': article.Author,
            'Date': article.Date,
            'PosterUrl': article.PosterUrl,
            'Body': he.encode(article.Body),
        }
    });

    if (dbOptions.driver === 'sqlite3') {
        async.series([
            function (callback) {
                resetDatabase(dbSession, function () {
                    console.log('reset database.');

                    encodedArticles.forEach(function (article) {
                        dbSession.insert('Article', article, function (err) {
                            console.log(`insert article: ${article.Title}`);
                        });
                    });
                });
            }
        ], function (err, results) {
            if (err) {
                console.log(`Init database error: ${err}`);
            } else {
                console.log('Init database done.');
            }
        });

    }

    if (dbOptions.driver === 'mysql') {
        //
    }
};

var insertUsers = function (dbSession, callback) {
    users.forEach(user => {
        bcrypt.hash(user.Password, saltRounds, (err, hash) => {
            if (err) {
                console.log(`Bcrypt user password failed: ${err}`);
            } else {
                dbSession.insert('User', {
                    Email: user.Email,
                    Password: hash,
                    FirstName: user.FirstName,
                    SurName: user.SurName
                }, (err) => {
                    if (err) {
                        console.log(`Insert user failed: ${err}`);
                    } else {
                        console.log(`Insert User: ${user.Email}`);
                    }
                });
            }
        });
    });
};

insertData(dbSession, (err) => {
    console.log(err);
});

insertUsers(dbSession, (err) => {
    console.log(err);
    
});