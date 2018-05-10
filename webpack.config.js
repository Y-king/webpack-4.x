const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin =require('extract-text-webpack-plugin');//css提取插件

module.exports = {
    // 模式  这是 webpack 4 引入的模式，包括 development、production、none 三个值，我们不传入值的话，默认使用 production。 
    mode: 'development',
    // 入口文件
    entry:'./src/js/index.js',
    // 出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle-[hash].js'
    },
    //配置本地服务
    devServer:{
        contentBase:'./dist',
        inline:true
    },
    //插件
    plugins: [
        new ExtractTextPlugin('./css/[name].css'),//提取css
        new CleanWebpackPlugin(['dist']), //webpack 在打包前删除 dist 目录
        new HtmlWebpackPlugin({           //使用 html-webpack-plugin 来自动生成 index.html
            template:'./src/index.html',  //将该路径下的index.html文件作为模板
            //设置打包完成后的html文件的操作
            minify:{
                removeAttributeQuotes:true,//去除引号
                removeComments: true,//去除注释
                removeEmptyAttributes: true,//去除空属性
                collapseWhiteSpace: true//去除空格
            }
        })
    ],
    module: {
        rules: [
            // css
            {
                test: /\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options:{
                            minimize:true   //css压缩
                        }
                    }],
                    publicPath:'../'
                })
            },
            // js
            {
                test:/\.js$/,
                exclude:/node_modules/,   // node_modules内js文件不处理
                use:[
                    {
                       loader: 'babel-loader',
                       options:{
                           presets:['env']
                       }
                    }
                ]
            },

            // css引入的图片
            {
                test:/\.(png|jpg|gif|jpeg)$/,
                use:[
                    {
                        loader:'file-loader?limit=1024&name=./images/[name].[ext]'
                    }
                ]
            },
            // html内img引入的图片
            {
                test:/\.html$/,
                use:[
                    {
                        loader:'html-withimg-loader'
                    }
                ]
            }
        ]
    }
}