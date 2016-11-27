var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (options) => {

	var defaults = {
    entry: {
        app: './resources/js/app',
    },
    output: {
        path: './assets/js',
        publicPath: '/assets/js/',
        filename: '[name].js',
        library: '[name]'
    },
    externals: {
        jquery: "jQuery"
    },
    watch: true,
    module: {
        loaders: [

            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|gif)$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /jquery-mousewheel/,
                loader: "imports?define=>false&this=>window"
            },
            {
                test: /malihu-custom-scrollbar-plugin/,
                loader: "imports?define=>false&this=>window"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('css')
            }
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract("css"),
            sass: ExtractTextPlugin.extract("css!sass")
        }
    },
    plugins: [
        new ExtractTextPlugin("./../css/components.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new webpack.ProvidePlugin({
            Vue: "vue"
        })

    ],
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    }
}
}
