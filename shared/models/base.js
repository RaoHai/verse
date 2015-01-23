var _            = require('lodash'),
    bookshelf    = require('bookshelf'),
    path         = require('path'),
    knex         = require('knex'),

    appBase      = path.join(path.dirname(require.main.filename), '../shared'),
    dbConfigPath = path.join(appBase, '/config.json'),
    schemaTables = require(path.join(appBase, '/data/schema')).tables,
    dbConfig     = require(dbConfigPath),

    verseBookshelf;


verseBookshelf = bookshelf(knex(dbConfig));

verseBookshelf.Model = verseBookshelf.Model.extend({
    validate : function () {
        return Promise.resolve();
    },
    permittedAttributes: function () {
        return _.keys(schemaTables[this.tableName]);
    },
    initialize: function () {
        var self = this,
            options = arguments[1] || {};

        // make options include available for toJSON()
        if (options.include) {
            this.include = _.clone(options.include);
        }

        this.on('creating', this.creating, this);
        this.on('saving', function (model, attributes, options) {
            return Promise.resolve(self.saving(model, attributes, options)).then(function () {
                return self.validate(model, attributes, options);
            });
        });
    },
    creating: function (newObj, attr, options) {
        if (!this.get('created_by')) {
            this.set('created_by', this.contextUser(options));
        }
    },

    saving: function (newObj, attr, options) {
        // Remove any properties which don't belong on the model
        this.attributes = this.pick(this.permittedAttributes());
        // Store the previous attributes so we can tell what was updated later
        this._updatedAttributes = newObj.previousAttributes();

        this.set('updated_by', this.contextUser(options));
    },
}, {
    // ## Data Utility Functions

    /**
     * Returns an array of keys permitted in every method's `options` hash.
     * Can be overridden and added to by a model's `permittedOptions` method.
     * @return {Array} Keys allowed in the `options` hash of every model's method.
     */
    permittedOptions: function () {
        // terms to whitelist for all methods.
        return ['context', 'include', 'transacting'];
    },

    /**
     * Filters potentially unsafe model attributes, so you can pass them to Bookshelf / Knex.
     * @param {Object} data Has keys representing the model's attributes/fields in the database.
     * @return {Object} The filtered results of the passed in data, containing only what's allowed in the schema.
     */
    filterData: function (data) {
        console.log("filterData:", this.prototype);
        var permittedAttributes = _.keys(schemaTables[this.prototype.tableName]),
            filteredData = _.pick(data, permittedAttributes);
        console.log("permittedAttributes:", filteredData)
        return filteredData;
    },

    /**
     * Filters potentially unsafe `options` in a model method's arguments, so you can pass them to Bookshelf / Knex.
     * @param {Object} options Represents options to filter in order to be passed to the Bookshelf query.
     * @param {String} methodName The name of the method to check valid options for.
     * @return {Object} The filtered results of `options`.
    */
    filterOptions: function (options, methodName) {
        var permittedOptions = this.permittedOptions(methodName),
            filteredOptions = _.pick(options, permittedOptions);

        return filteredOptions;
    },

     // ## Model Data Functions

    /**
     * ### Find All
     * Naive find all fetches all the data for a particular model
     * @param {Object} options (optional)
     * @return {Promise(verseBookshelf.Collection)} Collection of all Models
     */
    findAll:  function (options) {
        options = this.filterOptions(options, 'findAll');
        return verseBookshelf.Collection.forge([], {model: this}).fetch(options).then(function (result) {
            if (options.include) {
                _.each(result.models, function (item) {
                    item.include = options.include;
                });
            }
            return result;
        });
    },

    /**
     * ### Find One
     * Naive find one where data determines what to match on
     * @param {Object} data
     * @param {Object} options (optional)
     * @return {Promise(verseBookshelf.Model)} Single Model
     */
    findOne: function (data, options) {
        data = this.filterData(data);
        options = this.filterOptions(options, 'findOne');
        // We pass include to forge so that toJSON has access
        return this.forge(data, {include: options.include}).fetch(options);
    },

    /**
     * ### Edit
     * Naive edit
     * @param {Object} data
     * @param {Object} options (optional)
     * @return {Promise(verseBookshelf.Model)} Edited Model
     */
    edit: function (data, options) {
        var id = options.id;
        data = this.filterData(data);
        options = this.filterOptions(options, 'edit');

        return this.forge({id: id}).fetch(options).then(function (object) {
            if (object) {
                return object.save(data, options);
            }
        });
    },

    /**
     * ### Add
     * Naive add
     * @param {Object} data
     * @param {Object} options (optional)
     * @return {Promise(verseBookshelf.Model)} Newly Added Model
     */
    add: function (data, options) {
        data = this.filterData(data);
        options = this.filterOptions(options, 'add');
        var model = this.forge(data);
        // We allow you to disable timestamps when importing posts so that the new posts `updated_at` value is the same
        // as the import json blob. More details refer to https://github.com/TryGhost/Ghost/issues/1696
        if (options.importing) {
            model.hasTimestamps = false;
        }
        return model.save(null, options);
    },

    /**
     * ### Destroy
     * Naive destroy
     * @param {Object} options (optional)
     * @return {Promise(verseBookshelf.Model)} Empty Model
     */
    destroy: function (options) {
        var id = options.id;
        options = this.filterOptions(options, 'destroy');
        return this.forge({id: id}).destroy(options);
    },

});


module.exports = verseBookshelf;