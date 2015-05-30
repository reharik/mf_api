var bcrypt = require('../../../lib/bcrypt_thunk');
var User = require('../readModels/user');
var config = require('../../../config/config');

var db = require('monk')(config.mongo.url);
var users = db.get('users', {strict: true});
 // version that supports yields
var co = require('co');


var comparePassword = function *(password, candidatePassword) {
    return yield bcrypt.compare(candidatePassword, password);
};

module.exports = function *(username, password) {
    var _user = yield users.findOne({ 'username': username.toLowerCase() });
    if (!_user) throw new Error('User not found');
    var user = new User(_user);
    if (yield user.comparePassword(user.password(), password)) {
        return user;
    }

    throw new Error('Password does not match');
};