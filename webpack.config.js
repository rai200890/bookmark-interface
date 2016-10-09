'use strict';
var webpack = require('webpack'),
    path = require('path'),
    dotenv = require('dotenv'),
    ExtractTextPlugin = require("extract-text-webpack-plugin");

var APP = __dirname + '/app';

dotenv.config();

module.exports = {
    context: APP,
    entry: {
        app: ['webpack/hot/dev-server', './app.module.js', './app.css']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new ExtractTextPlugin("[name].css"),
        new webpack.DefinePlugin({
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        })
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
