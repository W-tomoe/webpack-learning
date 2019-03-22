



const config = require('./config')
const path = require('path')
const baseConfig = require('./webpack.base.conf')
const webpack = require('webpack')
const glob = require('glob-all')
const merge = require('webpack-merge')
const PurifyWebpack = require('purifycss-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProduction = process.env.NODE_ENV = '"production"'

const prodConfig = merge(baseConfig, {
    mode:"production",
    devtool:config.build.devtool,
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader:MiniCssExtractPlugin.loader, //
                        options: {
                            // publicPath:path.join(__dirname, 'dist/static/css') 
                        }
                    },
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
            }
        ]
    },  
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build
        }),
        new PurifyWebpack({ // css treeShaking
            paths: glob.sync([
                path.join(__dirname, '../*.html'), // 处理根目录下的html
                path.join(__dirname, '../src/*.js'),// 处理src里的js文件
            ])
        }),
        new MiniCssExtractPlugin({
            filename:'static/css/[name].min.css',
            chunkFilename: 'static/css/[id].min.css'
        })
    ],
    optimization: {
        minimize: false,
        runtimeChunk: true,
        
        runtimeChunk: true,
        splitChunks: {
            minSize:0,
            name: true,
            cacheGroups: {
                vue: {
                    test: /vue/,
                    chunks: "initial"
                }
            }
        }
    }
})

module.exports = prodConfig