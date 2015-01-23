var _            = require('lodash'),
verseBookshelf   = require('./base'),
        Promise  = require('bluebird');

User = verseBookshelf.Model.extend({

    tableName: 'users'
}, {
    findAll:  function (options) {
        options = options || {};
        return verseBookshelf.Model.findAll.call(this, options);
    },
    findOne: function (data) {
        // console.log(" call user findOne!", this.filterData);
        var filterOptions = this.filterOptions;
        return verseBookshelf.Model.findOne.call(this, data).then(function (data) {
            // console.log(" findOne: ", data);
            return Promise.resolve(_.pick(data.attributes, ['id', 'name']));
        });
    }
});

Users = verseBookshelf.Collection.extend({
    model: User
});

// console.log('>>', verseBookshelf);

module.exports = {
    User:  User,
    Users: Users
};
