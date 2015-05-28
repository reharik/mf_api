"use strict";
var root = require("path").normalize(__dirname + "/..");

module.exports = {
  paths: {
      out: {
          build_info: root + "/build-info.json"
      }
  }
};
