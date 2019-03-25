const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry:{
        app: './src/app.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
        publicPath: './dist/',
        chunkFilename: '[name].bundle.js'
    },
    devServer:{
        contentBase: path.resolve(__dirname, 'dist'),
        hot: true,
        host: 'localhost',
        port: 8080,
        open: false,
        compress:false //压缩
    },
    module:{
        rules:[
            {
                test: /.less$/,
                use: [
                    {
                        loader:'style-loader' ,
                        options: {
                            // insertInto:'#app',
                            singleton: true,
                            transform:'./css.transform.js'
                        }
                    },
                    {
                        loader:'css-loader',
                        options: {
                            // minimize: true
                            modules:true,
                            localIdentName:'[path]-[name]_[hash:base64:4]'
                        }
                        // loader:'file-loader',
                    },
                    {
                        loader:'less-loader'
                    }
                ] 
            }
            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].min.css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
    ],
    optimization: {
        minimize:false
    }
}
