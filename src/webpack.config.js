var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (options, isDev = true) => {


    return Object.assign({
        entry: options.entry,
        output: {
            path: options.output.path,
            publicPath: options.output.publicPath,
            filename: '[name].js',
            library: '[name]',
            sourceMapFilename: 'maps/[file].map'
        },
        externals: Object.assign({
            jquery: "jQuery"
        }, options.externals),
        devtool: isDev ? 'source-map' : null,
        module: Object.assign({
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
                }
            ].concat(options.additionalLoaders ? options.additionalLoaders : [])
                .concat([{
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('css')
                }])
        }, options.additionalModules),
        babel: {
            presets: ['es2015'],
            plugins: ['transform-runtime']
        },
        plugins: [
            new ExtractTextPlugin(options.extractTextPluginPath),
        ].concat(
            isDev ? [] : new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ).concat(
            options.webpackPlugins ? options.webpackPlugins : []
        ),
        resolve: {
            alias: options.alias
        }
    }, options.loadersConfiguration);
};
