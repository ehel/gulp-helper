var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var gutil = require('gulp-util');

function sassTask(gulp, options, env){
    const isDev = !env || env == 'development';
     gulp.task('sass', function () {
        return gulp.src(options.input)
            .pipe(isDev ? sourcemaps.init() : gutil.noop())
            .pipe(sass({precision:10}).on('error', sass.logError))
            .pipe(autoprefixer({
                browsers: ['last 2 versions'],
                cascade: false
            }))
            .pipe(!isDev ? cssnano() : gutil.noop())
            .pipe(isDev ? sourcemaps.write('./maps') : gutil.noop())
            .pipe(gulp.dest(options.output))
            .pipe(isDev ? browserSync.stream({match: '**/*.css'}) : gutil.noop());
    });

    gulp.task('sass:watch', ['sass'], (end) => {
        if (!isDev) {
            end();
            return;
        }
        browserSync.init({
            server: "./"
        });
        if(!options.toWatch){
            var defaultToWatch = options.input.split('/');
            defaultToWatch[defaultToWatch.length - 1] = '**/*.{scss,sass,css}';
            defaultToWatch = defaultToWatch.join('/');
        }
        gulp.watch(options.toWatch ? options.toWatch : defaultToWatch, ['sass']);
    });
}

module.exports = sassTask;