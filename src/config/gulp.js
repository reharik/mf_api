"use strict";
var root = require("path").normalize(__dirname + "/../..");

module.exports = {
  paths: {
      "in": {
          srcfiles: [root + "/src/**/*.js", root + "/src/package.json"],
          dockerfiles:[root + "/docker-shell.sh",root + "/Dockerfile", root + "/Makefile"]
      },
      out: {
          root: root + "/../MF_BuildFiles/Api",
          src: root + "/../MF_BuildFiles/Api/src"
      }
  }
};
