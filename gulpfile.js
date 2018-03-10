'use stric';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    CacheBuster = require('gulp-cachebust'),
    ngmin = require('gulp-ngmin');


var cachebust = new CacheBuster();


gulp.task('sass', function () {
    return gulp.src('./styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch(['./styles/**/*.scss', './myApp/**/*.scss'], ['build-css'])
});

gulp.task('ng-min', function () {
    return gulp.src('./myApp/**/*.js')
        .pipe(ngmin({ dynamic: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('build-css', function () {
    return gulp.src('./styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./dist'));
});

