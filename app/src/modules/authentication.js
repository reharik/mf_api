

"use strict";

module.exports = function(co, bcrypt_thunk, koapassport) {
    var createPassword = function (_password) {
        return co(function*() {
            try {
                var salt = yield bcryp_thunk.genSalt();
                var hash = yield bcryp_thunk.hash(_password, salt);
                return hash;
            }
            catch (err) {
                throw err;
            }
        });
    };

    var comparePassword = function *(candidatePassword, realPassword) {
        return yield bcryp_thunk.compare(candidatePassword, realPassword);
    };

    var matchUser = function *(username, password, done) {
        var user = yield readModelRepository.query('user', {'username': username.toLowerCase()});
        if (!user) {
            throw new Error('User not found');
        }

        if (yield comparePassword(password, user.password)) {
            return user;
        }

        throw new Error('Password does not match');
    };

    var authenticate = function () {
        koapassport.authenticate("local", function*(err, trainer, info) {
            if (err) {
                throw err;
            }
            if (trainer === false) {
                return {status: 401};
            } else {
                return {trainer: trainer};
            }
        })
    };

    return {
        createPassword: createPassword,
        comparePassword: comparePassword,
        matchUser: matchUser,
        authenticate: authenticate
    };
};