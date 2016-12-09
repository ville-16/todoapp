'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass', function () {
    return gulp.src('css/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass(
            {
               // outputStyle: 'compressed'
            }
        ).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('css'));
});


/*
gulp.task('sass', function () {
    return gulp.src('css/styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('css'));
});
*/

gulp.task('sass:watch', function () {
  //  gulp.watch('css/styles.scss', ['sass']);
   // gulp.watch('css/partials/*.scss', ['sass']);
    gulp.watch(['css/styles.scss', 'css/partials/*.scss'],['sass']);

});

// Static server + watching scss/html files
gulp.task('serve', ['sass'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch(['css/styles.scss', 'css/partials/*.scss'],['sass']);
    gulp.watch(["*.html", 'css/styles.scss', 'css/partials/*.scss']).on('change', browserSync.reload);

});