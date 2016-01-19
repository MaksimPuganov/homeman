/* --------- plugins --------- */

var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    plumber = require('gulp-plumber'),
    uncss = require('gulp-uncss'),
    nano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps');

/* --------- paths --------- */

var
    paths = {
        jade: {
            location: 'dev/jade/**/*.jade',
            compiled: 'dev/jade/_pages/*.jade',
            destination: 'dist'
        },

        scss: {
            location: 'dev/styles/**/*.scss',
            entryPoint: 'dist/css'
        },

        uncss: {
            html: ['dist/index.html']
        },

        browserSync: {
            baseDir: './dist/',
            watchPaths: ['./dist/*.html', './dist/css/*.css', './dist/js/*.js']
        }
    };

/* --------- jade --------- */

gulp.task('jade', function() {
    gulp.src(paths.jade.compiled)
        .pipe(plumber())
        .pipe(jade({
            pretty: '\t',
        }))
        .pipe(gulp.dest(paths.jade.destination));
});

/* --------- sass --------- */

gulp.task('sass', function() {
    gulp.src(paths.scss.location)
        .pipe(sass().on('error', sass.logError))
        .pipe(plumber())
        .pipe(uncss(paths.uncss))
        .pipe(sourcemaps.init(paths.scss.location))
        .pipe(nano())
        .pipe(sourcemaps.write(paths.scss.entryPoint))
        .pipe(gulp.dest(paths.scss.entryPoint));
});

/* --------- browser sync --------- */

gulp.task('sync', function() {
    browserSync.init({
        server: {
            baseDir: paths.browserSync.baseDir
        }
    });
});

/* --------- watch --------- */

gulp.task('watch', function() {
    gulp.watch(paths.jade.location, ['jade']);
    gulp.watch(paths.scss.location, ['sass']);

    gulp.watch(paths.browserSync.watchPaths).on('change', browserSync.reload);
});

/* --------- default --------- */

gulp.task('default', ['jade', 'sass', 'sync', 'watch']);