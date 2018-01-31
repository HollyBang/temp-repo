const gulp = require('gulp');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('gulp-cssnano');
const spritesmith = require('gulp.spritesmith');
const browserSync = require("browser-sync");

const reload = browserSync.reload;


gulp.task('html', function () {
    gulp.src('./src/*.html') 
        .pipe(rigger()) 
        .pipe(gulp.dest('./dist')) 
        .pipe(reload({stream: true})); 
});

gulp.task('styles', function(){
	return gulp.src('src/*.sass')
	.pipe(sass())
	.pipe(postcss([ autoprefixer() ]))
	.pipe(cssnano())
	.pipe(gulp.dest('dist/styles/'))
	.pipe(reload({stream:true}));
});

gulp.task('sprite', function () {
	var spriteData = gulp.src('./src/assets/*.png').pipe(spritesmith({
	  imgName: 'sprite.png',
	  cssName: '_sprite.sass',
	  padding: 10
	}));
	return spriteData.pipe(gulp.dest('./src/variables/'));
  });
