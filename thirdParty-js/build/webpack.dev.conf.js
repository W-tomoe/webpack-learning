const baseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const config = require('./config')

const webpack = require('webpack')

const isProduction = process.env.NODE_ENV = '"development"'

const devCofig = merge(baseConfig, {
    mode:'development',
    devtool: config.dev.devtool,
    devServer: {
        host: 'localhost',
        port: 8099,
        hot: true
    },
    optimization: {
        runtimeChunk: true
    },
    plugins:[
        
    ],
})


module.exports = devCofig