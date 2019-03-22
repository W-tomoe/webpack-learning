const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

const glob = require('glob-all') // glob-all用于处理多路径文件，使用purifycss的时候要用到glob.sync方法。 
const PurifyCSSPlugin = require('purifycss-webpack') // css treeShaking 用的，打包时删除没有用的css


const config = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        // publicPath: '/dist/',
        filename: 'static/js/[name].bundle.js'
    },
    devServer: {
        host:'localhost',
        port: 8089,
        inline: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
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
            },
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|jpge|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        name:  path.posix.join('static','/images/[name][hash:5].[ext]'),
                        // publicPath: '../images',
                        // outputPath: '/static/images',
                        limit: 10000,
                    }
                  }
                ]
            },
            {
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: path.posix.join('static','/fonts/[name][hash:5].[ext]'),
                            limit: 1000,
                        }
                    }
                ]
            }
        ]  
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename:'static/css/[name].min.css',
            chunkFilename: '[id].min.css'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new PurifyCSSPlugin({
            paths: glob.sync([
                './*.html', // 处理根目录下的html
                './src/*.js' // 处理src里的js文件
            ])
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": this.mode
        })
    ],
    /* optimizetion: {

    } */
}


module.exports = (env, argv) => {
    console.log(argv.mode)
    return config
}

