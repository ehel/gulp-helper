var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports =  {
    name: 'Example',
    tasks: {
        webpack:{
            entry: {
                app: './src/js/app',
            },
            output:{
                path: './assets/js',
                publicPath: '/assets/js/',
            },
            loadersConfiguration: {
                vue: {
                    loaders: {
                        css: ExtractTextPlugin.extract("css"),
                        sass: ExtractTextPlugin.extract("css!sass")
                    }
                },
            },
            webpackPlugins: [
                new webpack.optimize.CommonsChunkPlugin({
                    name: "common"
                }),
            ],
            extractTextPluginPath: "./../css/components.css"
        },
        sass:{
            input: './src/sass/app.scss',
            output: './assets/css',
        }
    }
};
