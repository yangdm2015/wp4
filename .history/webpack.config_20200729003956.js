var path = require('path');
var webpack = require('webpack');
import WriteFilePlugin from 'write-file-webpack-plugin';
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
    entry: './src/main.js', // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    output: {
      path: path.resolve(__dirname, './dist'), // 项目的打包文件路径
      publicPath: '/dist/', // 通过devServer访问路径
      filename: 'build.js' // 打包后的文件名
    },
    devServer: {
      historyApiFallback: true, //historyApiFallback设置为true那么所有的路径都执行index.html。
      overlay: true // 将错误显示在html之上
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
          }),
    ],

  };