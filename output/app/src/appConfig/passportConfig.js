/**
 * Created by reharik on 7/25/15.
 */

"use strict";

module.exports = function (authentication, co, passportlocal, readModelRepository, config) {

    var localStrategy = passportlocal.Strategy;
    var serialize = function serialize(user, done) {
        done(null, user.id);
    };

    var deserialize = function deserialize(_id, done) {
        readModelRepository.query("user", { id: _id }).then(function (x) {
            done(null, x);
        })["catch"](function (x) {
            done(x, null);
        });
    };

    var authLocalUser = function authLocalUser(username, password, done) {
        co(regeneratorRuntime.mark(function callee$2$0() {
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return authentication.matchUser(username, password);

                    case 3:
                        return context$3$0.abrupt("return", context$3$0.sent);

                    case 6:
                        context$3$0.prev = 6;
                        context$3$0.t0 = context$3$0["catch"](0);
                        return context$3$0.abrupt("return", null);

                    case 9:
                    case "end":
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 6]]);
        }))(done);
    };

    return function (passport) {
        passport.serializeUser(serialize);
        passport.deserializeUser(deserialize);
        passport.use(new localStrategy(authLocalUser));
    };
};