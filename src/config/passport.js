var LocalStrategy = require('passport-local').Strategy;
var authenticator = require('../lib/authenticator');
var User = require('mongoose').model('User');

var serialize = function (user, done) {
  done(null, user._id);
};

var deserialize = function (id, done) {
  User.findOne({
    _id: id
  }, '-salt -password', function(err, user) {
    done(err, user);
  });
};

module.exports = function (passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
