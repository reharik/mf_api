/**
 * Created by reharik on 7/25/15.
 */

var config = require('config');
var authentication = require('../modules/authentication');
var co = require('co');
var LocalStrategy = require('LocalStrategy').Strategy;
var readModelRepository = require('../modules/readModelRepository');

var serialize = function (user, done) {
    done(null, user.id);
};

var deserialize = function (_id, done) {
    readModelRepository.query("user", {id:_id}).then(x=>{
        done(null, x);
    }).catch(x=>{
        done(x,null);
    });
};

var authLocalUser = function(username, password, done) {
    co(function *() {
        try {
            return yield authentication.matchUser(username, password);
        } catch (ex) {
            return null;
        }
    })(done);
};

module.exports = function (passport) {
    passport.serializeUser(serialize);
    passport.deserializeUser(deserialize);
    passport.use(new LocalStrategy(authLocalUser));
};


