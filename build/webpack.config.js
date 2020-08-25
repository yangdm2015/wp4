var path = require("path");
var webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const { library } = require('./dll.config')
const resolve = dir => path.resolve(__dirname, dir);
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, "../src/main.ts") , // 项目的入口文件，webpack会从main.ts开始，把所有依赖的js都加载打包
    output: {
        path: path.resolve(__dirname, "../dist"), // 项目的打包文件路径
        publicPath: path.join(__dirname, "../dist"), // 通过devServer访问路径
        // contenthash 与缓存优化：https://zhuanlan.zhihu.com/p/78331695
        filename: "[name]-bundle-[contenthash].js", // 打包后的文件名
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
        },
        // runtimeChunk 与缓存优化：https://zhuanlan.zhihu.com/p/78331695
        runtimeChunk:true
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
                        plugins: ['@babel/transform-runtime', "@babel/plugin-syntax-dynamic-import"]
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
        new webpack.HashedModuleIdsPlugin(),
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile:true,
            statsOptions:{source:false}
            // reportFilename: `${pathConfig.BundleAnalyzer}/${Date.now()}.html`
        }),
        // ...Object.keys(library).reduce((prev,cur)=>{
        //     prev=prev.concat([
        //         new webpack.DllReferencePlugin({
        //             manifest: resolve(`../dll/${cur}.manifest.json`)
        //         }),
        //         new AddAssetHtmlPlugin({
        //             filepath: resolve(`../dll/dll.${cur}.js`)
        //         })
        //     ])
        //     return prev
        // },[])
        
        // map(name=>{
        //     return 
        // })
       
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
