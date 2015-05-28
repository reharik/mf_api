"use strict";
var root = require("path").normalize(__dirname + "/../..");

module.exports = {
  paths: {
      "in": {
          js: [root + "/src/**/*.js",
              root + "/server.js",
              root + "/package.json",
              root + "/Dockerfile"]
      },
      out: {
          public: root + "/../MF_BuildFiles/Api/"
      }
  }
};
