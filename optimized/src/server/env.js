/**
 * Use different environments for db-migrate
 */
'use strict';

(function () {
    var env;

    if (process.env.READER_ENV) {
        env = process.env.READER_ENV;
    } else {
        env = 'test';
    }

    if (!(env === 'test' ||
            env === 'dev' ||
            env === 'production'
        )) {
            throw new Error('"' + env + '" is not an allowed environment');
        }

        module.exports = env;
})();