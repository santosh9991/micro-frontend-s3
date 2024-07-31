const { merge } = require('webpack-merge');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');
// we configure CI/CD pipeline to provide PRODUCTION_DOMAIN during build. It tells exactly where our application is hosted
const domain = process.env.PRODUCTION_DOMAIN;
const prodConfig = {
    // when mode is production webpack does some optimizations.It takes a while to run the app in production mode,
    // however, it makes sure we get specific production build coming oout of it
    // After that we are going to set up another file name called output
    mode: "production",
    // we specify how to name the outputed files with format [name].[contenthash].js// hash of the content of the files
    // 
    output:{
        filename: '[name].[contenthash].js',
        publicPath: '/container/latest/'
    },
    // Module
    plugins:[
        new ModuleFederationPlugin({
            name: 'container',
            remotes:{
                //where we should go to, to get some source code
                // key should match to the input string that we use to import this in our container
                // marketin@<domain of the remote entry file where we get it from>
                marketing: `marketing@${domain}/marketing/remoteEntry.js`
            },
            shared: packageJson.dependencies
        })
    ]
    
}
module.exports = merge(commonConfig, prodConfig)