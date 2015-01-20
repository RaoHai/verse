var Code = require('../../../../../shared/code'),
	tokenService = require('../../../../../shared/token');
var DEFAULT_SECRET = 'verse_session_secret';
var DEFAULT_EXPIRE = 6 * 60 * 60 * 1000;	// default session expire time: 6 hours

module.exports = function(app) {
	return new Remote(app);
};

var Remote = function(app) {
	this.app = app;
	var session = app.get('session') || {};
	this.secret = session.secret || DEFAULT_SECRET;
	this.expire = session.expire || DEFAULT_EXPIRE;
};

var pro = Remote.prototype;

/**
 * Auth token and check whether expire.
 *
 * @param  {String}   token token string
 * @param  {Function} cb
 * @return {Void}
 */
pro.auth = function(token, cb) {
	// console.log(" --> auth", token, cb);
	var res = tokenService.parse(token, this.secret);

	if(!res) {
		cb(null, Code.ENTRY.FA_TOKEN_ILLEGAL);
		return;
	}

	if(!checkExpire(res, this.expire)) {
		cb(null, Code.ENTRY.FA_TOKEN_EXPIRE);
		return;
	}
	
	cb(null, Code.OK, {"foo": "bar"});
};

var checkExpire = function(token, expire) {
	if(expire < 0) {
		// negative expire means never expire
		return true;
	}

	return (Date.now() - token.timestamp) < expire;
};

