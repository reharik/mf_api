"use strict";
var root = require("path").normalize(__dirname + "/../..");

module.exports = {
  paths: {
      "in": {
          js: [root + "/**/*.js"],
          rootfiles: [root + "/Dockerfile",
              root + "/server.js",
              root + "/package.json"]
      },
      out: {
          root: root + "/../MF_BuildFiles/Api/",
          public: root + "/../MF_BuildFiles/Api/"
      }
  }
};
