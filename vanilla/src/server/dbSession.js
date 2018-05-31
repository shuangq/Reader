/**
 * Database access abstraction layer
 */
'use strict';

var DBWrapper = require('node-dbi').DBWrapper;

var dbWrapper = new DBWrapper('sqlite3', {
    'path': '/var/tmp/reader.test.sqlite'
});

dbWrapper.connect();
module.exports = dbWrapper;