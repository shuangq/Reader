/**
 * Provide a Server function that sets up a Percolator server object for us
 */
'use strict';

var Percolator = require('percolator').Percolator;
var dbSession = require('../../src/server/dbSession.js');
var he = require('he');

var Server = function (port) {
    var server = Percolator({
        'port': port,
        'autoLink': false,
    });

    server.route('/api/articles', {
        GET: function (req, res) {
            res.setHeader('Access-Control-Allow-Origin', 'localhost');
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

    server.route('/api/article/:id', {
        GET: function (req, res) {
            var articleId = he.escape(req.uri.child());

            res.setHeader('Access-Control-Allow-Origin', 'localhost');
            dbSession.fetchRow('SELECT Body FROM Article WHERE ArticleId=?', [articleId], function (err, row) {
                if (err) {
                    console.log(err);
                    res.status.internalServerError(err);
                } else {
                    res.object(row).send();
                }
            });
        }
    });

    return server;
};

module.exports = {
    'Server': Server
};