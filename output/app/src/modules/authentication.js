'use strict';

module.exports = function (co, readModelRepository, bcrypt_thunk, koapassport) {
    var createPassword = function createPassword(_password) {
        return co(regeneratorRuntime.mark(function callee$2$0() {
            var salt, hash;
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        context$3$0.prev = 0;
                        context$3$0.next = 3;
                        return bcryp_thunk.genSalt();

                    case 3:
                        salt = context$3$0.sent;
                        context$3$0.next = 6;
                        return bcryp_thunk.hash(_password, salt);

                    case 6:
                        hash = context$3$0.sent;
                        return context$3$0.abrupt('return', hash);

                    case 10:
                        context$3$0.prev = 10;
                        context$3$0.t0 = context$3$0['catch'](0);
                        throw context$3$0.t0;

                    case 13:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this, [[0, 10]]);
        }));
    };

    var comparePassword = regeneratorRuntime.mark(function comparePassword(candidatePassword, realPassword) {
        return regeneratorRuntime.wrap(function comparePassword$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return bcryp_thunk.compare(candidatePassword, realPassword);

                case 2:
                    return context$2$0.abrupt('return', context$2$0.sent);

                case 3:
                case 'end':
                    return context$2$0.stop();
            }
        }, comparePassword, this);
    });

    var matchUser = regeneratorRuntime.mark(function matchUser(username, password, done) {
        var user;
        return regeneratorRuntime.wrap(function matchUser$(context$2$0) {
            while (1) switch (context$2$0.prev = context$2$0.next) {
                case 0:
                    context$2$0.next = 2;
                    return readModelRepository.query('user', { 'username': username.toLowerCase() });

                case 2:
                    user = context$2$0.sent;

                    if (user) {
                        context$2$0.next = 5;
                        break;
                    }

                    throw new Error('User not found');

                case 5:
                    context$2$0.next = 7;
                    return comparePassword(password, user.password);

                case 7:
                    if (!context$2$0.sent) {
                        context$2$0.next = 9;
                        break;
                    }

                    return context$2$0.abrupt('return', user);

                case 9:
                    throw new Error('Password does not match');

                case 10:
                case 'end':
                    return context$2$0.stop();
            }
        }, matchUser, this);
    });

    var authenticate = function authenticate() {
        koapassport.authenticate("local", regeneratorRuntime.mark(function callee$2$0(err, trainer, info) {
            return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        if (!err) {
                            context$3$0.next = 2;
                            break;
                        }

                        throw err;

                    case 2:
                        if (!(trainer === false)) {
                            context$3$0.next = 6;
                            break;
                        }

                        return context$3$0.abrupt('return', { status: 401 });

                    case 6:
                        return context$3$0.abrupt('return', { trainer: trainer });

                    case 7:
                    case 'end':
                        return context$3$0.stop();
                }
            }, callee$2$0, this);
        }));
    };

    return {
        createPassword: createPassword,
        comparePassword: comparePassword,
        matchUser: matchUser,
        authenticate: authenticate
    };
};