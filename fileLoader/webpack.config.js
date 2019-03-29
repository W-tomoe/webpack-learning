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
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'js/[name]-bundle-[hash:5].js'
    },
    resolve: {
        alias: {
            jquery$: path.resolve(__dirname, 'src/libs/jquery.min.js')
        }
    },
    devServer: {
        host:'localhost',
        port: 8089,
        inline: true, //是否在控制台显示打包状态 默认true
        // historyApiFallback: true //true 页面不存在不报404重定向到index.html
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
                    to: function(context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        },
        proxy: {
            '/api':{
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                pathRewrite: {'^/api': ''}, // 路径重写
                // logLevel:'debug', // 终端输出代理相关信息
                header: {
                    'Cookie': '_2A25xmaJODeRhGedG7lAZ9CvMyDuIHXVTZc4GrDV6PUJbktAKLVKjkW1NUTJ9UApTxYLXhHxK8iHSqJpYxPQBehpT' // 携带的凭证
                }
            },
        }
    },
    module: {
        rules: [
            /* {
                test: /\.html/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [
                            'img:src',
                            'img:data-src'
                        ]
                    }
                }  
            }, */
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                    }
                ],
                exclude: /node_modules/
            },
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
                test: /\.(png|jpg|jpge|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        name: '[name]-[hash:5].[ext]',
                        limit: 1000,
                        outputPath: 'static/images/'
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
                            name: '[name]-[hash:5].[ext]',
                            limit: 5000,
                            outputPath: 'static/fonts/',
                            useRelativePath: true
                        }
                    }
                ]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            title: 'index.html',
            inject: true
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new MiniCssExtractPlugin({
            filename:'static/css/[name].min.css',
            chunkFilename: '[id].min.css'
        }),
        new PurifyCSSPlugin({ // css treeShaking
            paths: glob.sync([
                './*.html', // 处理根目录下的html
                './src/*.js' // 处理src里的js文件
            ])
        })
    ],
    optimization: {
        runtimeChunk: true,
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
        }
    }
}


module.exports = (env, argv) => {
    console.log(argv.mode)
    return config
}

