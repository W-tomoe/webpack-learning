const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const VueLoaderPlugin = require('vue-loader/lib/plugin');

const isProduction = process.env.NODE_ENV = '"development"'

const baseConfig = {
    entry: {
        app: './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: './',
        filename: 'static/js/[name].bundle.js'
    },
    resolve: {
        extensions: [' ', '.js', '.json', '.vue', '.less', '.css'], // 扩展名-引入文件不用加后缀
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src'),
            'components': path.resolve('src/components'),
            'pages': path.resolve('src/pages')
        }
    },
    externals: {  // cdn引入第三方js库
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        //'vuex': 'Vuex',
        // 'axios': 'axios',
        // 'echarts': 'echarts'
    },
    /* watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,//防止重复保存频繁重新编译,300ms内重复保存不打包
        poll: 1000  //每秒询问的文件变更的次数
    }, */
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    { loader: 'vue-loader'}
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
    ],
}




module.exports = baseConfig