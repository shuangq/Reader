/**
 * Test spec for apis
 */
'use strict';

var request = require('request');
var dbSession = require('../../src/server/dbSession.js');
var Server = require('../../src/server/server.js').Server;
var resetDatabase = require('../resetDatabase.js');
var async = require('async');

describe('The API', function () {

    var server;

    beforeEach(function(done){
        server = Server('8081');
        server.listen(function(err) {
            resetDatabase(dbSession, function() {
                done(err);
            });
        });
    });

    afterEach(function(done){
        server.close(function() {
            resetDatabase(dbSession, function(){
                done();
            });
        })
    });

    it('Should return a list of existing articles when receiving a GET request at /api/articles/', function (done) {
        var expected = {
            "_items": [{
                'ArticleId': 1,
                'Title': 'The Book of Songs: Poems that helped shape Chinese thought',
                'Author': 'Martin Kern',
                'Date': '30 May 2018',
                'PosterUrl': 'http://ichef.bbci.co.uk/wwfeatures/wm/live/976_549/images/live/p0/68/pw/p068pw87.jpg',
            }]
        };

        async.series([
                function (callback) {
                    resetDatabase(dbSession, callback);
                },

                function (callback) {
                    dbSession.insert(
                        'Article', {
                            'Title': 'The Book of Songs: Poems that helped shape Chinese thought',
                            'Author': 'Martin Kern',
                            'Date': '30 May 2018',
                            'Body': 'simple content',
                            'PosterUrl': 'http://ichef.bbci.co.uk/wwfeatures/wm/live/976_549/images/live/p0/68/pw/p068pw87.jpg',
                        },
                        function (err) {
                            callback(err);
                        }
                    );
                },

            ],
            function (err, results) {
                request.get({
                        'url': 'http://localhost:8081/api/articles/',
                        'json': true
                    },
                    function (err, res, body) {
                        expect(res.statusCode).toBe(200);
                        expect(body).toEqual(expected);
                        done();
                    }
                );
            });

    });

    
});