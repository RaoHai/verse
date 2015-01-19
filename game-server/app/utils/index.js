var _        = require('lodash'),
    sequence = require('./sequence'),
    schema   = require('../../data/schema').tables;
    
function addTableColumn(tablename, table, columnname) {
    console.log('>>addTableColumn:', tablename, columnname);
    var column,
        columnSpec = schema[tablename][columnname];

    // creation distinguishes between text with fieldtype, string with maxlength and all others
    if (columnSpec.type === 'text' && columnSpec.hasOwnProperty('fieldtype')) {
        column = table[columnSpec.type](columnname, columnSpec.fieldtype);
    } else if (columnSpec.type === 'string' && columnSpec.hasOwnProperty('maxlength')) {
        column = table[columnSpec.type](columnname, columnSpec.maxlength);
    } else {
        column = table[columnSpec.type](columnname);
    }

    if (columnSpec.hasOwnProperty('nullable') && columnSpec.nullable === true) {
        column.nullable();
    } else {
        column.notNullable();
    }
    if (columnSpec.hasOwnProperty('primary') && columnSpec.primary === true) {
        column.primary();
    }
    if (columnSpec.hasOwnProperty('unique') && columnSpec.unique) {
        column.unique();
    }
    if (columnSpec.hasOwnProperty('unsigned') && columnSpec.unsigned) {
        column.unsigned();
    }
    if (columnSpec.hasOwnProperty('references')) {
        // check if table exists?
        column.references(columnSpec.references);
    }
    if (columnSpec.hasOwnProperty('defaultTo')) {
        column.defaultTo(columnSpec.defaultTo);
    }
}

var createTable = function (dbConfig, tableName) {
    return dbConfig.knex.schema.createTable(tableName, function (t) {
        var columnKeys = _.keys(schema[tableName]);
        console.log("createTable:", schema,  columnKeys);
        _.each(columnKeys, function (column) {
            return addTableColumn(tableName, t, column);
        });
    });
};

var createDb = function (dbConfig, schemaTables) {
    
    tables = _.map(schemaTables, function (table, key) {
        return function () {
            return createTable(dbConfig, key);
        };
    });
    return sequence(tables);
};


module.exports  = {
    createTable : createTable,
    createDb : createDb
};