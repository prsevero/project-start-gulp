var gulp = require('gulp'),
    minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),

    paths = {
        css: ['static/src/css/**/*.css'],
        js: ['static/src/js/**/*.js'],
        html: ['*.html']
    };


gulp.task('css', function() {
    gulp.src(paths.css)
        .pipe(minifyCSS({keepSpecialComments: 0}))
        .pipe(concat('style.css', { newLine: '' }))
        .pipe(gulp.dest('static/css'))
        .pipe(livereload());
});


gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(jshint()).pipe(jshint.reporter('default'))
        .pipe(uglify()).on('error', errorHandler)
        .pipe(gulp.dest('static/js'))
        .pipe(livereload());
});


gulp.task('html', function() {
    gulp.src(paths.html)
        .pipe(livereload());
});


gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.html, ['html']);
});


function errorHandler (error) {
    console.log(error.toString());
    this.emit('end');
}


gulp.task('default', ['watch']);

