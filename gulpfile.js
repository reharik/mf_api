"use strict";
/**
 * Dependencies
 */
var fs = require("fs");
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var browserify = require("browserify");
var concat = require("gulp-concat");
var less = require("gulp-less");
var minifyCSS = require('gulp-minify-css');
var react = require("gulp-react");
var gulpif = require("gulp-if");
var uglify = require("gulp-uglify");
var sourcemaps = require("gulp-sourcemaps");
var source = require("vinyl-source-stream");
var envify = require("envify");
var shim = require("browserify-shim");
var babelify = require("babelify");

// Config
var packagejson =  require("./package");
var config = require("./config/gulp");
var paths = config.paths;

// Hack around nodemon, that doesn"t wait for tasks to finish on change
var nodemon_instance;

var DEBUG = process.env.NODE_ENV === "development";

/**
 * Sub-Tasks
 */

gulp.task("write-build-info", function (cb) {
  var buildInfos = {
    version : packagejson.version
  };
  require("git-rev").short(function (str) {
    buildInfos.commit = str;
    fs.writeFile(paths.out.build_info, JSON.stringify(buildInfos, null, 2), cb);
  });
});

gulp.task("install", [ "write-build-info" ]);

gulp.task("nodemon", function () {
  if(!nodemon_instance)
    nodemon_instance = nodemon({ script:"server.js", nodeArgs: ["--harmony", "--debug"],
    env: { "NODE_ENV": "development" }, watch: "__manual_watch__",  ext: "__manual_watch__"  });
  else {
    nodemon_instance.emit("restart");
  }
});

/**
 * Global tasks
 */
gulp.task("dev", ["install", "nodemon"]);

gulp.task("production", ["install"], function () {
  return gulp.src(paths.out.public + "/*.js")
       .pipe(uglify())
       .pipe(gulp.dest(paths.out.public));
});

gulp.task("default", ["install"]);
