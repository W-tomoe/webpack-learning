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
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader:'vue-style-loader' , 
                        options: {
                            // publicPath:path.join(__dirname, 'dist/static/css') 
                        }
                   `` },
                    {
                        loader: 'css-loader'
                        
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'less-loader'
                    }
                ]
            },
        ]
    },
    plugins:[
        
    ],
    optimization: {
        runtimeChunk: true
    },
})


module.exports = devCofig