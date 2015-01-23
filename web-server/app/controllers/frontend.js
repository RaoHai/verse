var index = function (req, res, next) {
    console.log("session:", req.session);
    if (req.session && req.session.user) {
        return res.render('index',{
            token : req.session.token
        });
    }

    return res.redirect('/login');
};

module.exports = {
    index : index
};