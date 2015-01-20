var passport = require('passport');

var authenticate = function (req, res, next) {
    console.log("authenticate:", req, res);
    return passport.authenticate('bearer', {session: false, failWithError: true},
        function (err, user, info) {
            if (err) {
                return next(err); // will generate a 500 error
            }
            // Generate a JSON response reflecting authentication status
            if (!user) {
                var msg = {
                    type: 'error',
                    message: 'Please Sign In',
                    status: 'passive'
                };
                res.status(401);
                return res.send(msg);
            }
            // TODO: figure out, why user & authInfo is lost
            req.authInfo = info;
            req.user = user;
            return next(null, user, info);
        }
    )(req, res, next);
};

module.exports = {
    authenticate : authenticate
};