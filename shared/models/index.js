var fs          = require('fs'),
    knex        = require('knex'),
    bookshelf   = require('bookshelf'),
    path        = require('path'),
    Promise     = require('bluebird'),
    _           = require('lodash'),
    utils       = require('../utils'),
    models;

models = {
    init : function () {
        var self = this;
        var appBase      = path.join(path.dirname(require.main.filename), '../shared'),
            dbConfigPath = path.join(appBase, '/config.json'),
            schemaTables = require(path.join(appBase, '/data/schema')).tables,
            dbConfig     = require(dbConfigPath),

            defer = Promise.defer(),
            dbFile;

        self.Base = require('./base');

        var User = require('./User');
        // self.User = User.model;

        _.extend(self, User);

        dbFile = dbConfig.connection.filename = path.join(appBase, dbConfig.connection.filename)
        
        fs.exists(dbFile, function(exists) {
            if (!exists) {
                return defer.resolve(utils.createDb(self.Base, schemaTables));
            }
            return defer.resolve(self.Base);
        });
        
        return defer.promise;
        // var appBase      = path.join(path.dirname(require.main.filename), '../shared'),
        //     dbConfigPath = path.join(appBase, '/config.json'),
        //     schemaTables = require(path.join(appBase, '/data/schema')).tables,
        //     dbConfig     = require(dbConfigPath),

        //     defer = Promise.defer(),
        //     dbFile,
        //     verseBookshelf;

        // dbFile = dbConfig.connection.filename = path.join(appBase, dbConfig.connection.filename)
        // verseBookshelf = bookshelf(knex(dbConfig));

        // verseBookshelf.Model = verseBookshelf.Model.extend({

        // });

        // fs.exists(dbFile, function(exists) {

        //     if (!exists) {
        //         return defer.resolve(utils.createDb(verseBookshelf, schemaTables));
        //     }
        //     return defer.resolve(verseBookshelf);
        // });


        // return defer.promise;

    }
};

module.exports = models;