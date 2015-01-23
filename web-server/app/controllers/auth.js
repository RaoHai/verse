var         Token = require('../../../shared/token'),
           secret = require('../../../shared/session').secret,
     dataProvider = require('../../../shared/models');

var login = function (req, res, next) {
    res.render('login');
};

var doLogin = function  (req, res, next) {
    var username, password;
    username = req.body.username;
    password = req.body.password;

    dataProvider.User.findOne({name : username}).then(function (result) {
        var token = Token.create(result.id, Date.now(), secret);
       
        result.token = token;
        req.session.user = result;

        res.redirect('/');
    });

};

var register = function (req, res, next) {
    res.render('register');
};

var doRegister = function (req, res, next) {

};

module.exports = {
    login : login,
    doLogin: doLogin,
    register: register,
    doRegister: doRegister
};