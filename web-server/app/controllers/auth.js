

var login = function (req, res, next) {
    // console.log(">>>", req.model);
    // console.log("post login:", req.body);
    res.render('login');
};

var doLogin = function  (req, res, next) {

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