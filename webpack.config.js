const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dir = dir => path.resolve(__dirname, dir);

module.exports = {
    context: dir('examples'),
    entry: {
        app: dir('examples/index.js')
    },
    resolve: {
        extensions: ['.html', '.js', '.css'],
        modules: [
            dir('node_modules')
        ]
    },
    output: {
        path: dir('dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    loader: 'css-loader'
                })
            }
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin('tmp', {
            root: dir(''),
            verbose: true,
            dry: false
        }),
        new ExtractTextPlugin({
            filename: 'bundle.css',
            allChunks: true
        }),
        new HtmlWebpackPlugin({
            template: dir('examples/index.html'),
            inject: 'head',
            hash: true
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map'
        })
    ],
    devServer: {
        host: '0.0.0.0',
        port: '8080',
        public: 'never.experium.local:8080',
        contentBase: dir('tmp'),
        stats: 'errors-only'
    }
}
