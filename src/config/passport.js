var LocalStrategy = require('passport-local').Strategy;
var authenticator = require('../lib/authenticator');
var config = require('./config');
var db = require('monk')(config.mongo.url);
var users = db.get('users', {strict: true});

var serialize = function (user, done) {
  done(null, user._id);
};

var deserialize = function (id, done) {
  users.findOne({_id: id}, '-salt -password', function(err, user) {
    done(err, user);
  });
};

module.exports = function (passport, config) {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
