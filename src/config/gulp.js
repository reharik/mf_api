"use strict";
var root = require("path").normalize(__dirname + "/../..");

module.exports = {
  paths: {
      "in": {
          js: [root + "/src/**/*.js",
              root + "/server.js",
              root + "/package.json"],
          dockerfile: [root + "/Dockerfile"]
      },
      out: {
          root: root + "/../MF_BuildFiles/Api",
          public: root + "/../MF_BuildFiles/Api/src"
      }
  }
};
