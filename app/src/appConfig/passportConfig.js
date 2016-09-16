/**
 * Created by reharik on 7/25/15.
 */
"use strict";

module.exports = function(authentication,
                          passportlocal,
                          rsRepository,
                          config) {

    var localStrategy = passportlocal.Strategy;
    var serialize = function (user, done) {
        console.log('==========serialize function=========');
        console.log(user);
        console.log('==========END serialize function=========');
        done(null, user.id);
    };

    var deserialize = function (_id, done) {
        rsRepository.query("user", {id: _id}).then(x=> {
            done(null, x);
        }).catch(x=> {
            done(x, null);
        });
    };

    var authLocalUser = async function(username, password, done) {
        try {
            var user = await authentication.matchUser(username, password);
        } catch (ex) {
            console.log('==========ex=========');
            console.log(ex);
            console.log('==========END ex=========');
            return done(ex);
        }

        if (!user) {
            return done(null, false);
        }
        console.log('==========user=========');
        console.log(user);
        console.log('==========END user=========');
        return done(null, user);
    };

    return function (passport) {
        passport.serializeUser(serialize);
        passport.deserializeUser(deserialize);
        passport.use(new localStrategy(authLocalUser));
    };

};


