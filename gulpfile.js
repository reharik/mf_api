/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
var babel = require('gulp-babel');
var del = require('del');
// Config
var config = require("config");

var DEBUG = process.env.NODE_ENV === "development";

gulp.task('clean', function(cb) {
    del([config.get("deploy.output.deploy"),
        config.get("deploy.buildDirectory"),
        '!'+config.get("deploy.buildDirectory")+'/app/node_modules'],{force:true}, cb);
});

gulp.task("copy-source",["clean"], function () {
    return gulp.src("src/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/src"));
});
gulp.task("copy-root",["clean"], function () {
    return gulp.src(["package.json", "server.js", "bootstrap.js"])
        .pipe(gulp.dest(config.get("deploy.output.app")));
});

gulp.task("copy-config",["clean"], function () {
    return  gulp.src("config/**")
        .pipe(gulp.dest(config.get("deploy.output.app")+"/config"));
});

gulp.task("copy-deploy",["clean"], function () {
    return gulp.src("deploy/*")
        .pipe(gulp.dest(config.get("deploy.output.deploy")));
});

gulp.task("copy-to-buildDir",["copy-source","copy-root","copy-config","copy-deploy"], function () {
    return gulp.src(config.get("deploy.output.deploy")+"/**")
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));
});

////////////////////////////////////////////////////

gulp.task('clean-mf_core', function (cb) {
    del(['src/modules/ges/**/*'], cb);
});

gulp.task('copy-mf_core',['clean-mf_core'], function () {
    gulp.src(['../MF_Core/compiled/src/**/*'], { "base" : "../MF_Core/compiled/src" }).pipe(gulp.dest('src/mf_core'));
});

////////////////////////////////////////////////////

gulp.task('pull-mf_core', ["clean-mf_core","copy-mf_core"]);

gulp.task("deploy",['pull-mf_core', "copy-to-buildDir"]);




