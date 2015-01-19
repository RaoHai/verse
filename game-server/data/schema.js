var db = {
    civils: {
        id: {type: 'increments', nullable: false, primary: true},
        uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
        civils_name: {type: 'string', maxlength: 150, nullable: false}
    }
}

module.exports.tables = db;