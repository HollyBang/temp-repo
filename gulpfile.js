const gulp = require('gulp');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const spritesmith = require('gulp.spritesmith');
const browserSync = require("browser-sync");
const merge = require("merge-stream");

const reload = browserSync.reload;


gulp.task('html', function () {
	gulp.src('./src/*.html')
		.pipe(rigger())
		.pipe(gulp.dest('./dist'))
		.pipe(browserSync.stream());
});


gulp.task('sass', function () {
	return gulp.src("./src/**/*.sass")
		.pipe(sass().on('error', sass.logError))
		.pipe(postcss([autoprefixer()]))
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles/'))
		.pipe(browserSync.stream());
});
gulp.task('sprite', function () {
	var spriteData = gulp.src('./src/assets/*.png').pipe(spritesmith({
		imgName: 'sprite.png',
		cssName: '_sprite.sass',
		padding: 10
	}));

	var imgStream = spriteData.img
		.pipe(gulp.dest('./dist/img/'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('./src/variables/'));

	return merge(imgStream, cssStream);
});

gulp.task('serve', ['sass'], function () {

	browserSync.init({
		server: "./dist"
	});

	gulp.watch("src/**/*.sass", ['sass']);
	gulp.watch("src/**/*.html", ['html']);
});



gulp.task('default', ['serve']);