/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
var babel = require('gulp-babel');
var del = require('del');
// Config
var config = require("config");
var clean = require('gulp-contrib-clean');



var DEBUG = process.env.NODE_ENV === "development";

gulp.task('clean', function(cb) {
    del([config.get("deploy.output.deploy"), config.get("deploy.buildDirectory")],{force:true}, cb);
});

gulp.task("copy-source",["clean"], function () {
    gulp.src("src/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src"));
    gulp.src(["package.json", "server.js", "bootstrap.js"])
        .pipe(gulp.dest(config.get("deploy.output.app")));
    gulp.src("config/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/config"));
    return gulp.src("deploy/*")
        .pipe(gulp.dest(config.get("deploy.output.deploy")));
});

gulp.task("copy-to-buildDir",["copy-source"], function () {
    return gulp.src(config.get("deploy.output.deploy")+"/**")
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));
});



gulp.task('clean-mf_core', function (cb) {
    del([
        'src/modules/ges/**/*'
    ], cb);
});


gulp.task('copy-mf_core',['clean-mf_core'], function () {
    gulp.src(['../MF_Core/compiled/src/**/*'], { "base" : "../MF_Core/compiled/src" }).pipe(gulp.dest('src/mf_core'));
});


gulp.task('pull-mf_core', ["clean-mf_core","copy-mf_core"]);


gulp.task("deploy",[ "copy-to-buildDir"]);


//"compile":"rm -r -f compiled && babel src --out-dir compiled/src --stage 0 && babel prodBootstrap.js --out-dir compiled --stage 0 && babel index.js --out-dir compiled --stage 0 && cp package.json compiled && mv compiled/prodBootstrap.js compiled/bootstrap.js"

