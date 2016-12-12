var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports =  {
    name: 'Example',
    tasks: {
        webpack:{
            entry: {
                app: './js/app',
            },
            output:{
                path: './js',
                publicPath: '/js/',
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
            input: './sass/app.scss',
            output: './css',
        }
    }
};
