var _          = require('lodash'),
    bookshelf  = require('bookshelf'),

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
})

