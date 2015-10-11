/**
 * Created by parallels on 7/27/15.
 */

var gulp = require("gulp");
// Config
var del = require('del');
var babel = require("gulp-babel");


var DEBUG = process.env.NODE_ENV === "development";

gulp.task('clean', function(cb) {
    del(['output'],{force:true}, cb);
});

gulp.task("babel",["clean"], function () {
    return gulp.src("app/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("output/app"));
});

gulp.task("copy-mochaOpts",["clean", "babel"], function () {
    return gulp.src("app/tests/mocha.opts")
        .pipe(gulp.dest("output/app/tests/"));
});

gulp.task("copy-packageJson",["clean", "babel"], function () {
    return gulp.src("./package.json")
        .pipe(gulp.dest("output/"));
});

////////////////////////////////////////////////////


gulp.task("default",['copy-mochaOpts','copy-packageJson']);
