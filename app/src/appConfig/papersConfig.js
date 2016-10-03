/**
 * Created by reharik on 7/25/15.
 */
"use strict";

module.exports = function(authentication,
                          paperslocal,
                          papers,
                          ) {

    var serialize = function (user) {
        return user;
    };

    var deserialize = function (user) {
        return user;
    };

    var authLocalUser = async function(username, password) {
        try {
            var user = await authentication.matchUser(username, password);
        } catch (ex) {
            console.log('==========ex=========');
            console.log(ex);
            console.log('==========END ex=========');
            return {error: ex};
        }

        if (!user) {
            return {error:'No User Found with those credentials'};
        }
        return {user};
    };

    var local = paperslocal(authLocalUser);
    var config = {
        strategies: [local],
        useSession: true,
        serializers: [serialize],
        deserializers: [deserialize]
    };

    return papers().registerMiddleware(config);
};


