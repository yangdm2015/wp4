var path = require("path");
var webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "../src/main.ts") , // 项目的入口文件，webpack会从main.ts开始，把所有依赖的js都加载打包
    output: {
        path: path.resolve(__dirname, "../dist"), // 项目的打包文件路径
        publicPath: path.join(__dirname, "../dist"), // 通过devServer访问路径
        filename: "[name]-bundle-[hash].js", // 打包后的文件名
        publicPath: '/'
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        port: 9000,
        overlay: true,
        historyApiFallback: true, // 这句话
    },
    resolve: {
        alias: {
            vue$: "vue/dist/vue.esm.js",
            pages: resolve('../src/pages')
        },
        extensions: ['.ts', '.js'],
    },
    optimization:{
        splitChunks: {
            chunks: 'all',
            name: () => {
                return '__common';
            },
            minChunks: 2
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                }
            },
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
        ],
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
        }),
        // new webpack.DefinePlugin({
        //     'process.env': { NODE_ENV: '"development"' }
        // }),
        new VueLoaderPlugin(),
        new WriteFilePlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "../src/template.html"),
            inject: true,
        }),
        new CleanWebpackPlugin(),
        // new AssetsWebpackPlugin({
        //     path: path.join(__dirname, "../dist"),
        //     filename: 'index.json',
        //     processOutput(assets) {
        //         delete assets[''];
        //         return JSON.stringify(assets, null, 4);
        //     },
        //     prettyPrint: true
        // })
    ],
};
