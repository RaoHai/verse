var express = require('express'),
    controllers = require('../controllers');

var frontendRoute = function () {

    var router = express.Router();

    router.get('/login', controllers.auth.login)
    router.post('/login', controllers.auth.doLogin);

    router.get('/register', controllers.auth.register);
    router.post('/register', controllers.auth.doRegister);

    return router;
};

module.exports = {
    frontend : frontendRoute
};