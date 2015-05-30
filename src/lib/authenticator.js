var co = require('co');
var validatePassword = require('../app/modules/authentication/validatePassword');

exports.localUser = function (username, password, done) {
  co(function *() {
    try {
      return yield validatePassword(username, password);
    } catch (ex) {
      return null;
    }
  }).then(function (user) {
    done(null, user);
  });
};
