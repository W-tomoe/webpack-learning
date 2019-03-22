const path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin');// 生成html ,自动引入资源

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //把css提取出来打包成一个css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'); // 压缩css
const CleanWebpackPlugin = require("clean-webpack-plugin");// 打包的时候清理dist目录
const devMode = process.env.NODE_ENV !== 'production'

console.log(devMode,'devMode')
module.exports = {
    entry:{
        app: './src/app.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename:'[name].bundle.js',
        publicPath: path.resolve(__dirname,'dist'),
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
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader', 
                        options: {
                            ident:'postcss', // 表明插件是给postcss用的
                            plugins: [
                                // require('autoprefixer')(),
                                require('postcss-cssnext')() // 编译未来的css语法，注意：这个插件已经包含了autoprefixer插件的功能，不必要再引入autoprefixer
                            ]
                        }
                    },
                    'less-loader'
                ] 
            }
            
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename:devMode?"[name].css" : "[name].min.css",
            chunkFilename: devMode?"[id].css" : "[id].[hash].css",
            allChunks: true
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        // new OptimizeCSSAssetsPlugin(), // 压缩css的插件
    ],
    optimization: {
        minimize:true,// 压缩js
        
    }
}
