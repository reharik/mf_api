//var buildInfo = require('../../../build-info.json');

exports.index = function *() {
  this.body = yield this.render("basic", {
    version: "1",
    commit: "1"
  });
};
