/**
 * Created by reharik on 7/25/15.
 */
"use strict";

module.exports = function(authentication,
                          paperslocal,
                          koapapers
                          ) {

    var serialize = function (user) {
        return user;
    };

    var deserialize = function (user) {
        return user;
    };

    var authLocalUser = function(username, password) {
        return authentication.matchUser(username, password);
    };

    var local = paperslocal(authLocalUser);
    var config = {
        strategies: [local],
        useSession: true,
        serializers: [serialize],
        deserializers: [deserialize],
        whiteList: [{url:"localhost:3000/", method:"GET"}]
    };

    return koapapers().registerMiddleware(config);
};


