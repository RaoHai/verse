var fs          = require('fs'),
    knex        = require('knex'),
    bookshelf   = require('bookshelf'),
    path        = require('path'),
    Promise     = require('bluebird'),
    _           = require('lodash'),
    utils       = require('../utils');

var init = function () {
    var appBase      = path.join(path.dirname(require.main.filename), '../shared'),
        dbConfigPath = path.join(appBase, '/config.json'),
        schemaTables = require(path.join(appBase, '/data/schema')).tables,
        dbConfig     = require(dbConfigPath),

        defer = Promise.defer(),
        dbFile,
        db;

    dbFile = dbConfig.connection.filename = path.join(appBase, dbConfig.connection.filename)
    db = bookshelf(knex(dbConfig));

    fs.exists(dbFile, function(exists) {

        if (!exists) {
            return defer.resolve(utils.createDb(db, schemaTables));
        }
        return defer.resolve(db);
    });

    return defer.promise;

};

module.exports = {
    init : init
};