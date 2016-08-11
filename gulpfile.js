'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

/////////////////////////////////////////

gulp.task('build', function() {
  // include any number or depth of folders with .js
  // in src, include angular files and other files you want in gulp
  // gulp.src(['src/**/*.js'])
  gulp.src(['public/app/app.js', 'public/app/controllers/**/*.js', 'public/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('concat.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('public/dist/js'));
    // './' becomes 'dist'
})

gulp.task('sass', function() {
  gulp.src('./public/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('public/dist/css'))
})

gulp.task('watch', function() {
  gulp.watch(['public/app/**/*.js', 'public/js/**/*.js'], ['build']);
})
gulp.task('sass:watch', function() {
  gulp.watch(['public/sass/**/*.scss'], ['sass']);
  
})
   
// task to run everything, must have default
gulp.task('default', ['build', 'sass', 'watch', 'sass:watch']);