const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const baseConfig = {
    entry: {
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        // publicPath: '/dist/',
        filename: 'static/js/[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
            'components': path.resolve('src/components'),
            'pages': path.resolve('src/pages')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader'}
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader:'vue-style-loader' , 
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
                            limit: 10000,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([// 复制资源文件夹到打包文件夹
            {
                from: path.resolve(__dirname, '../static'),
                to: '/',
                ignore: ['*.']
            }
        ]),
        new HtmlWebpackPlugin({ // 生成html文件
            template: 'index.html',
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin(), // 热重载
        new VueLoaderPlugin()
    ]
}




module.exports = baseConfig