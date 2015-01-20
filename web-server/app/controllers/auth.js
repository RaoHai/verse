

var login = function (req, res, next) {
    console.log(">>>", req.model);
    console.log("post login:", req.body);
};

module.exports = {
    login : login
};