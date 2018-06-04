/**
 * Test spec for apis
 */
'use strict';

var request = require('request');
var dbSession = require('../../src/server/dbSession.js');
var Server = require('../../src/server/server.js').Server;
var resetDatabase = require('../resetDatabase.js');
var async = require('async');
var he = require('he');

describe('The API', function () {

    var server;

    beforeEach(function (done) {
        server = Server('8081');
        server.listen(function (err) {
            resetDatabase(dbSession, function () {
                done(err);
            });
        });
    });

    afterEach(function (done) {
        server.close(function () {
            resetDatabase(dbSession, function () {
                done();
            });
        })
    });

    // Get articles
    it('/api/articles [GET]: Should return a list of existing articles', function (done) {
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
                            'Body': he.encode(`<p>Since antiquity, no other text has enjoyed a presence quite like The Book of Songs – in one critic’s words, it is “the classic of the human heart and the human mind.” It is the first poetic anthology of China; Confucius himself is said to have compiled the “three hundred songs”—another early name for the text – out of a body of 3,000, “removing duplicates and choosing only what could be matched to the principles of ritual”. By the end of the Western Han dynasty (202 BCE-9 CE), there were no fewer than four schools of the Songsat the imperial academy, offering a range of different interpretations for each song.</p>
                <p>In the same way that Homer’s epics took hold within the West, The Book of Songs played a role in spheres far beyond literature, with a lasting influence on Chinese civilisation. The collection had an impact on education, politics and communal life: in antiquity, the Songs were quoted and recited as coded communication in diplomatic exchange; invoked as proof to cap a philosophical argument; read as commentary – satirical more often than not – on historical circumstances; and taught for the purposes of moral edification. It has continued to affect Chinese society since then, both through what the Songs say and the form they take.</p>
                <blockquote>Many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory </blockquote>
                <p>The received anthology emerged from the “Mao tradition”, one of the four early schools, and is divided into four parts: 160 Airs (guofeng), 74 Minor Court Hymns (xiaoya), 31 Major Court Hymns (daya), and 40 Eulogies (song). Within the Eulogies, the 31 Eulogies of Zhou are considered the oldest segment of the anthology, purportedly dating back to the very early years of the Western Zhou (1046-771 BCE) dynasty.</p>
                <p>These hymns, all of them rather short, were performed in sacrifices to the Zhou royal ancestors: multimedia performances containing the aromatic offerings of meat, grain and alcohol; ritual music on drums and bells, wind and string instruments; dance to re-enact the military conquest of the previous Shang dynasty; and the solemn hymns by which the Zhou king praised his ancestors and requested their blessings in return. In short, Chinese poetry begins in religious ritual.</p>
                <p>By accompanying rites, in turn, the Eulogies helped regulate social order. Respecting ‘heaven’s will’ was an important element of ancient Chinese politics; by enforcing this message, the Book of Songs could underpin the rule of the Zhou Dynasty. Unlike the Eulogies, many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory. Like the archaic Eulogies, the Hymns are straightforward; there is no debate about the story they are meant to tell.</p>`),
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
                        'url': 'http://localhost:8081/api/articles',
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

    // Get article content
    it('/api/article/:id [GET]: Should return the title, author, date and body of the article with the specific id', function (done) {
        var expected = {
            'Title': 'The Book of Songs: Poems that helped shape Chinese thought',
            'Author': 'Martin Kern',
            'Date': '30 May 2018',
            'Body': he.encode(`<p>Since antiquity, no other text has enjoyed a presence quite like The Book of Songs – in one critic’s words, it is “the classic of the human heart and the human mind.” It is the first poetic anthology of China; Confucius himself is said to have compiled the “three hundred songs”—another early name for the text – out of a body of 3,000, “removing duplicates and choosing only what could be matched to the principles of ritual”. By the end of the Western Han dynasty (202 BCE-9 CE), there were no fewer than four schools of the Songsat the imperial academy, offering a range of different interpretations for each song.</p>
            <p>In the same way that Homer’s epics took hold within the West, The Book of Songs played a role in spheres far beyond literature, with a lasting influence on Chinese civilisation. The collection had an impact on education, politics and communal life: in antiquity, the Songs were quoted and recited as coded communication in diplomatic exchange; invoked as proof to cap a philosophical argument; read as commentary – satirical more often than not – on historical circumstances; and taught for the purposes of moral edification. It has continued to affect Chinese society since then, both through what the Songs say and the form they take.</p>
            <blockquote>Many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory </blockquote>
            <p>The received anthology emerged from the “Mao tradition”, one of the four early schools, and is divided into four parts: 160 Airs (guofeng), 74 Minor Court Hymns (xiaoya), 31 Major Court Hymns (daya), and 40 Eulogies (song). Within the Eulogies, the 31 Eulogies of Zhou are considered the oldest segment of the anthology, purportedly dating back to the very early years of the Western Zhou (1046-771 BCE) dynasty.</p>
            <p>These hymns, all of them rather short, were performed in sacrifices to the Zhou royal ancestors: multimedia performances containing the aromatic offerings of meat, grain and alcohol; ritual music on drums and bells, wind and string instruments; dance to re-enact the military conquest of the previous Shang dynasty; and the solemn hymns by which the Zhou king praised his ancestors and requested their blessings in return. In short, Chinese poetry begins in religious ritual.</p>
            <p>By accompanying rites, in turn, the Eulogies helped regulate social order. Respecting ‘heaven’s will’ was an important element of ancient Chinese politics; by enforcing this message, the Book of Songs could underpin the rule of the Zhou Dynasty. Unlike the Eulogies, many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory. Like the archaic Eulogies, the Hymns are straightforward; there is no debate about the story they are meant to tell.</p>`)
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
                            'Body': he.encode(`<p>Since antiquity, no other text has enjoyed a presence quite like The Book of Songs – in one critic’s words, it is “the classic of the human heart and the human mind.” It is the first poetic anthology of China; Confucius himself is said to have compiled the “three hundred songs”—another early name for the text – out of a body of 3,000, “removing duplicates and choosing only what could be matched to the principles of ritual”. By the end of the Western Han dynasty (202 BCE-9 CE), there were no fewer than four schools of the Songsat the imperial academy, offering a range of different interpretations for each song.</p>
            <p>In the same way that Homer’s epics took hold within the West, The Book of Songs played a role in spheres far beyond literature, with a lasting influence on Chinese civilisation. The collection had an impact on education, politics and communal life: in antiquity, the Songs were quoted and recited as coded communication in diplomatic exchange; invoked as proof to cap a philosophical argument; read as commentary – satirical more often than not – on historical circumstances; and taught for the purposes of moral edification. It has continued to affect Chinese society since then, both through what the Songs say and the form they take.</p>
            <blockquote>Many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory </blockquote>
            <p>The received anthology emerged from the “Mao tradition”, one of the four early schools, and is divided into four parts: 160 Airs (guofeng), 74 Minor Court Hymns (xiaoya), 31 Major Court Hymns (daya), and 40 Eulogies (song). Within the Eulogies, the 31 Eulogies of Zhou are considered the oldest segment of the anthology, purportedly dating back to the very early years of the Western Zhou (1046-771 BCE) dynasty.</p>
            <p>These hymns, all of them rather short, were performed in sacrifices to the Zhou royal ancestors: multimedia performances containing the aromatic offerings of meat, grain and alcohol; ritual music on drums and bells, wind and string instruments; dance to re-enact the military conquest of the previous Shang dynasty; and the solemn hymns by which the Zhou king praised his ancestors and requested their blessings in return. In short, Chinese poetry begins in religious ritual.</p>
            <p>By accompanying rites, in turn, the Eulogies helped regulate social order. Respecting ‘heaven’s will’ was an important element of ancient Chinese politics; by enforcing this message, the Book of Songs could underpin the rule of the Zhou Dynasty. Unlike the Eulogies, many of the Court Hymns are grand, expansive narratives to celebrate the Zhou; they served as the dynasty’s core text of political and cultural memory. Like the archaic Eulogies, the Hymns are straightforward; there is no debate about the story they are meant to tell.</p>`),
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
                        'url': 'http://localhost:8081/api/article/1',
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