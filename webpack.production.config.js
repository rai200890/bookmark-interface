'use strict';
var webpack = require('webpack'),
    path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var APP = __dirname + '/app';

module.exports = {
    context: APP,
    entry: {
        app: ['webpack/hot/dev-server', './app.module.js', './app.css']
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.EnvironmentPlugin([
            "API_URL",
            "WHITELISTED_DOMAINS"
        ]),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    output: {
        path: APP,
        filename: '[name].js',
        path: __dirname + '/dist'
    },
    module: {
        loaders: [{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
            loader: 'file'
        }, {
            test: /\.html$/,
            loader: 'raw'
        }]
    }
}
