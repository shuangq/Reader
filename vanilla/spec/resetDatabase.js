/**
 * Helper code: ensures that at the start of each test run,
 * the database is empty.
 */
'user strict';

var async = require('async');

var resetDatabase = function (dbSession, callback) {
    async.series([
        function(callback) {
            dbSession.remove('Article', '1', function(err) {
                callback(err);
            });
        },

        // function(callback) {
        //     dbSession.remove('User', '1', function(err) {
        //         callback(err);
        //     });
        // },
    ],

    function (err, results) {
        callback(err);
    }
);
}

module.exports = resetDatabase;
