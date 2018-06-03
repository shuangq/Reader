/**
 * Helper code: ensures that at the start of each test run,
 * the database is empty.
 */
'user strict';

var async = require('async');
var env = require('../src/server/env');
var dbOptions = require('../database.json')[env];

var resetDatabase = function (dbSession, callback) {
    if (dbOptions.driver === 'sqlite3') {
        async.series([
                function (callback) {
                    dbSession.remove('Article', '1', function (err) {
                        callback(err);
                    });
                },

                // function(callback) {
                //     dbSession.remove('User', '1', function(err) {
                //         callback(err);
                //     });
                // },

                function(callback) {
                    dbSession.remove('sqlite_sequence', '1', function(err){
                        callback(err, null);
                    });
                }
            ],

            function (err, results) {
                callback(err);
            }
        );
    }

    if (dbOptions.driver === 'mysql') {
        async.series([
            function(callback) {
                dbSession.query('TRUNCATE Article', [], function(err) {
                    callback(err)
                });
            }
        ], function(err, results){
            callback(err);
        });
    }
};

module.exports = resetDatabase;