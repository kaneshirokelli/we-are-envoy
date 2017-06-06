"use strict";
var gulp = require("gulp"),
		browserSync = require("browser-sync"),
		sass = require("gulp-sass"),
		bourbon = require("node-bourbon").includePaths,
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

gulp.task('js', function(){
	gulp.src("src/js/*.js")
		.pipe(concat('scripts.js'))
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