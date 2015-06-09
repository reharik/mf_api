//var buildInfo = require('../../../build-info.json');
var config = require('./config/config');

exports.index = function *() {
  this.body = yield this.render("basic", {
    version: "1",
    commit: "1",
    cdn:config.cdn.ip
  });
};
