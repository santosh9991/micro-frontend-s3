const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const commonConfig = require('./webpack.common')
const packageJson = require('../package.json')
const devConfig = {
    mode: 'development',
    output: {
        // this tells webpack to search for main.js in this location when
        // rrun in develop mode
        publicPath: "http://localhost:8082/"
    },
    entry: './src/index.js',
    devServer: {
        port: 8082,
        historyApiFallback: true
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js',
            exposes:{
                './AuthApp': './src/bootstrap'
            },
            shared: packageJson.dependencies
            
        })
    ]

}
module.exports = merge(commonConfig, devConfig)