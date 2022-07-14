const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const del = require('del');

const build = () => {
    return src([
        'app/js/script.min.js',
        'app/css/style.min.css',
        'app/*.html'
    ], {base: 'app'})
        .pipe(dest('dist'))
}

const deleteDist = () => del('dist');

const convertPages = () => {
    return src('app/pages/**/*.html')
        .pipe(fileinclude())
        .pipe(dest('app/'))
        .pipe(browserSync.stream())
}

const convertStyles = () => {
    return src('app/css/**/index.scss')
        .pipe(sass())
        .pipe(concat('style.min.css'))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

const convertScripts = () => {
    return src('app/js/**/*.js')
        .pipe(uglify())
        .pipe(concat('script.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream())
}

const server = () => {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    })
    watch('app/css/**/*.scss', convertStyles)
    watch(['app/pages/**/*.html', 'app/layout/**/*.html'], convertPages)
    watch(['app/js/**/*.js', '!app/js/script.min.js'], convertScripts)
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.convertStyles = convertStyles;
exports.convertScripts = convertScripts;
exports.server = server;

exports.default = series(convertPages, server);

exports.build = series(deleteDist, convertPages, convertStyles, convertScripts, build);
