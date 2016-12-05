var webpack = require('webpack');
var gutil = require('gulp-util');

var webpackOptions = require('./webpack.config.js');

function webpackTask(gulp, options, env){

    const isDevelopment = env;
    const handleWebpackOutput = (err, stats) => {
        if (err) throw new gutil.PluginError('webpack', err);

        gutil.log('[webpack]', stats.toString({
            colors: true,
            chunks: false
        }));
    };
    const getWebpack = (options, isDev) => {
        return webpack(webpackOptions(options, isDev));
    };
    gulp.task('webpack', (end) => {
        if (webpackOptions(options).length === 0) {
            end();
            return;
        }
        const wp = getWebpack(options, isDevelopment);
        var firstBuild = false;
        if(isDevelopment){
            wp.watch({
                aggregateTimeout: 300
            }, (err, stats) => {
                handleWebpackOutput(err, stats);
                if (! firstBuild) {
                    firstBuild = true;
                    end();
                }
            });
        }else{
            wp.run((err, stats) => {
                handleWebpackOutput(err, stats);
                end();
            });
        }

    });
    gulp.task('webpack:watch', (end) => {
        const wp = getWebpack(options, isDevelopment);
        wp.watch({
            aggregateTimeout: 300
        }, (err, stats) => {
            handleWebpackOutput(err, stats);
                end();
        });
    });
}

module.exports = webpackTask;