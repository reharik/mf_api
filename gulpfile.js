"use strict";
/**
 * Dependencies
 */
var fs = require("fs");
var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var del = require("del");
// Config
var packagejson =  require("./package");
var config = require("./src/config/gulp");
var paths = config.paths;

// Hack around nodemon, that doesn"t wait for tasks to finish on change
var nodemon_instance;

var DEBUG = process.env.NODE_ENV === "development";

/**
 * Sub-Tasks
 */

gulp.task("clean", function(){
  del(paths.out.public, {force:true});
});

gulp.task("copy-js", function () {
  return gulp.src(paths.in.js)
      .pipe(gulp.dest(paths.out.public));
});

gulp.task("install", ["copy-js"]);

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
gulp.task("dev", ["clean", "install", "nodemon"]);

gulp.task("default", ["clean", "install"]);
