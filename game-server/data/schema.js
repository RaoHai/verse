var db = {
    civils: {
        id: {type: 'increments', nullable: false, primary: true},
        uuid: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
        name: {type: 'string', maxlength: 150, nullable: false},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true}
    },

    users : {
        id: {type: 'increments', nullable: false, primary: true},
        name: {type: 'string', maxlength: 36, nullable: false, validations: {isUUID: true}},
        slug: {type: 'string', maxlength: 150, nullable: false, unique: true},
        password: {type: 'string', maxlength: 60, nullable: false},
        email: {type: 'string', maxlength: 254, nullable: false, unique: true, validations: {isEmail: true}},
        created_at: {type: 'dateTime', nullable: false},
        updated_at: {type: 'dateTime', nullable: true},
        civil_id : {type: 'integer', nullable: false}
    }
}

module.exports.tables = db;