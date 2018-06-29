'use strict';

var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var async = require('async');

exports.up = function (db, callback) {
  async.series([
    db.createTable.bind(db, 'Article', {
      ArticleId: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true,
        notNull: true
      },
      Title: {
        type: 'string',
        notNull: true
      },
      Author: {
        type: 'string'
      },
      Date: {
        type: 'string'
      },
      PosterUrl: {
        type: 'string'
      },
      Body: {
        type: 'text'
      }
    }),

    db.createTable.bind(db, 'User', {
      UserId: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true,
        notNull: true
      },
      Email: {
        type: 'string',
        notNull: true
      },
      Password: {
        type: 'string',
        notNull: true
      },
      FirstName: {
        type: 'string',
        length: '50'
      },
      SurName: {
        type: 'string',
        length: '50'
      },
      AvatarUrl: {
        type: 'string'
      }
    }),

    db.createTable.bind(db, 'UserSavedArticle', {
      UserId: {
        type: 'int',
        primaryKey: true,
        notNull: true
      },
      ArticleId: {
        type: 'int',
        primaryKey: true,
        notNull: true,
      },
      SavedDate: {
        type: 'string',
        notNull: true,
      }
    }),
  ], callback);

};

exports.down = function (db, callback) {
  async.series([
    db.dropTable.bind(db, 'Article'),
    db.dropTable.bind(db, 'User'),
    db.dropTable.bind(db, 'UserSavedArticle'),
  ], callback);
};