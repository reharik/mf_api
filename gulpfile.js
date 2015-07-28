/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
var nodemon = require("gulp-nodemon");
var babel = require('gulp-babel');
var del = require("del");
// Config
var config = require("config");

var nodemon_instance;

var DEBUG = process.env.NODE_ENV === "development";

gulp.task("clean", function(){
    del(config.get("deploy.output.deploy"), {force:true});
    del(config.get("deploy.buildDirectory"), {force:true});
});

gulp.task("copy-non-compiled-files", ["clean", "compile"], function () {
    gulp.src("src/views/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src/views/"));
    gulp.src("package.json")
        .pipe(gulp.dest(config.get("deploy.output.app")));
    gulp.src("config/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/config"));
});

gulp.task("copy-to-buildDir", ["clean", "copy-deployfiles"], function () {
    return gulp.src(config.get("deploy.output.deploy")+"/**")
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));
});

gulp.task("copy-deployfiles", ["clean","copy-non-compiled-files"],function () {
    return gulp.src("deploy/*")
        .pipe(gulp.dest(config.get("deploy.output.deploy")));
});

gulp.task("compile", function () {
    gulp.src(["server.js", "bootstrap.js"])
        .pipe(babel())
        .pipe(gulp.dest(config.get("deploy.output.app")));
    return gulp.src(["src/**", "!src/views/**"])
        .pipe(babel())
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src"));

});

gulp.task("dev", ["clean", "install", "nodemon"]);

gulp.task("deploy", ["clean", "compile","copy-non-compiled-files","copy-deployfiles","copy-to-buildDir"]);


//"compile":"rm -r -f compiled && babel src --out-dir compiled/src --stage 0 && babel prodBootstrap.js --out-dir compiled --stage 0 && babel index.js --out-dir compiled --stage 0 && cp package.json compiled && mv compiled/prodBootstrap.js compiled/bootstrap.js"

