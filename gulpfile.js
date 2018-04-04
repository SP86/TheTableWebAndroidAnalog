var gulp = require('gulp');
var concat = require('gulp-concat');
var fileinclude = require('gulp-file-include');
var htmlextend = require('gulp-html-extend');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglifyjs');
var notify = require("gulp-notify");
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('styles', function () {
    return gulp.src('dev/scss/sb-admin.scss')
        .pipe(rename("custom-styles.scss"))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on("error", notify.onError(function(error) {
            return "Something happened: " + error.message;
        }))
        .pipe(autoprefixer(['last 2 version']))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
});

gulp.task('build-html', function(){
    return gulp.src(['dev/template/**/*.html', '!dev/template/layout/**/*.html'])
        .pipe(htmlextend({
            annotations: false,
            verbose: false,
            root: './dev/template'
        }))
        .pipe(fileinclude({
            prefix: '@@',
            basepath: './dev/template/'
        }))
        .pipe(gulp.dest('src/template/'));
});

gulp.task('scripts', function(){
    gulp.src(['dev/js/**/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/js/'));
});

gulp.task('images', function() {
    return gulp.src(['dev/img/**/*.*'])
        .pipe(gulp.dest('src/img'))
});

gulp.task('fonts', function() {
    return gulp.src(['dev/fonts/**/*.*'])
        .pipe(gulp.dest('src/fonts'))
});

gulp.task('build', [ 'build-html', 'styles', 'scripts', 'images', 'fonts' ]);

gulp.task('watch', ['build'], function() {
    gulp.watch('dev/scss/**/*.scss', ['styles']);
    gulp.watch('dev/template/**/*.html', ['build-html']);
    gulp.watch('dev/js/**/*.js', ['scripts']);
    gulp.watch('dev/img/**/*.*', ['images']);
    gulp.watch('dev/fonts/**/*.*', ['fonts']);
});