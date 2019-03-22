var webpack = require('webpack')
var path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');



module.exports = {
    devtool:'eval-source-map',
    entry: {
        pageA: './src/pageA.js',
        pageB: './src/pageB.js',
        // vendor: ['lodash']
    },
    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].bundle.js',
        publicPath: './dist/',
        chunkFilename: '[name].chunk.js'
    },
    devServer: {
        host:'localhost',
        port:'8089',
        hot: true,
        compress: true,
        open: false, // 自动打开浏览器
    },
    optimization: {
        splitChunks: {
            name:'async',
            chunks: 'all',
            minChunks: 2,
            name:true,
        },
        minimize:false,
        runtimeChunk: true,
        /* minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    output: {
                        comments: false
                    },
                    compress: {
                        warnings: false,
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ]  */
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'首页',

            template: 'index.html'
        })
    ]
}


