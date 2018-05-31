/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/server/dbSession.js');

var Server = function (port) {
    var server = Percolator({
        'port': port,
        'autoLink': false,
    });

    server.route('/api/articles', {
        GET: function (req, res) {
            dbSession.fetchAll('SELECT ArticleId, Title, Author, Date, PosterUrl FROM Article ORDER BY Date', function (err, rows) {
                if (err) {
                    console.log(err);
                    res.status.internalServerError(err);
                } else {
                    res.collection(rows).send();
                }
            });
        }
    });

    return server;
};

module.exports = {
    'Server': Server
};