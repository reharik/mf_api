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
    return gulp.src(["package.json", "server.js", "bootstrap.js", ".npmrc"],{dot:true})
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
    return gulp.src(config.get("deploy.output.deploy")+"/**",{dot:true})
        .pipe(gulp.dest(config.get("deploy.buildDirectory")));ahad
});

////////////////////////////////////////////////////

gulp.task('clean-mf_inf', function (cb) {
    del(['src/mf_infrastructure'], cb);
});

gulp.task('copy-mf_inf', function () {
    return gulp.src(['../MF_Infrastructure/output/src/**/*'], { "base" : "../MF_Infrastructure/output/src" }).pipe(gulp.dest('src/mf_infrastructure'));
});

////////////////////////////////////////////////////

gulp.task('clean-mf_messagebinders', function (cb) {
    del(['src/mf_messagebinders'], cb);
});

gulp.task('copy-mf_messagebinders', function () {
    return gulp.src(['../MF_MessageBinders/output/src/**/*'], { "base" : "../MF_MessageBinders/output/src" }).pipe(gulp.dest('src/mf_messagebinders'));
});

/////////////////////////////////////////////////


gulp.task('pull-mf_inf', ["clean-mf_inf","copy-mf_inf"]);

gulp.task('pull-mf_messagebinders', ["clean-mf_messagebinders","copy-mf_messagebinders"]);

gulp.task("deploy",['copy-mf_inf','copy-mf_messagebinders', "copy-to-buildDir"]);


