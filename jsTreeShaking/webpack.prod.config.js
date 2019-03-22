const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode:'production',
    entry: {
        mian:'./src/app.js'
    },
    output: {
        path:path.resolve(__dirname, 'dist'),
        filename:'[name].js',
    },
    devServer: { 
        host: 'localhost',
        port: '8088',
        hot: true,
        open: false
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, "src")
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                // exclude:/node_modules/
            }
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: true,
            filename:'index.html'
        })
    ],
    optimization: {
        // minimize:true,
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    keep_classnames: true,
                    keep_fnames: true,

                    ecma: 6,
                    cache: true,
                    parallel: true
                }
            })
        ] ,
        /* runtimeChunk: true,
        splitChunks: {
            name:true,
            minSize: 0,
            cacheGroups: {
                preact: {
                    test: /preact/,
                    chunks: 'initial'
                },
                lodash: {
                    test: /lodash/, 
                    chunks: 'all'
                }
            }
        } */
    }
}