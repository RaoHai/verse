var express = require('express'),
    controllers = require('../controllers');

var frontendRoute = function () {

    var router = express.Router();

    router.post('/login', controllers.auth.login);

    return router;
};

module.exports = {
    frontend : frontendRoute
};