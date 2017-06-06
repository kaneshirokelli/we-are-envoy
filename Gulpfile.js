"use strict";
var gulp = require("gulp"),
		jquery = require('gulp-jquery'),
		browserSync = require("browser-sync"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
		browserify = require('gulp-browserify'),
		neat = require("node-neat").includePaths,
		concat = require('gulp-concat');


// Compiles all gulp tasks
gulp.task("default", ["sass"]);

// Live reload anytime a file changes
gulp.task("watch", ["browserSync", "sass"], function() {
	gulp.watch("src/scss/**/*.scss", ["sass"]);
	gulp.watch("src/js/*.js", ['js']);
	gulp.watch("dist/*.html").on("change", browserSync.reload);
});

// Spin up a server
gulp.task("browserSync", function() {
	browserSync({
		server: {
			baseDir: "dist"
		}
	})
});

gulp.task('jquery', function () {
    return gulp.src('./node_modules/jquery/src')
        .pipe(jquery({
            flags: ['-deprecated', '-event/alias', '-ajax/script', '-ajax/jsonp', '-exports/global']
        }))
        .pipe(gulp.dest('./public/vendor/'));
    // creates ./public/vendor/jquery.custom.js 
});

gulp.task('js', function(){
	gulp.src("src/js/*.js")
		.pipe(concat('scripts.js'))
		.pipe(browserify())
		.pipe(gulp.dest('dist/js'))
});

// Compile SASS files
gulp.task("sass", function() {
	gulp.src("src/scss/**/*.scss")
			.pipe(sass({
				includePaths: bourbon,
				includePaths: neat
			}))
			.pipe(gulp.dest("dist/css"))
			.pipe(browserSync.reload({
				stream: true
			}))
});