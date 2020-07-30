var path = require("path");
var webpack = require("webpack");
const WriteFilePlugin = require("write-file-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  entry: "./src/main.js", // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
  output: {
    path: path.resolve(__dirname, "./dist"), // 项目的打包文件路径
    publicPath: "/dist/", // 通过devServer访问路径
    filename: "[name]-bundle-[hash].js", // 打包后的文件名
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    overlay:true
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
    },
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
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map',
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV:'"development"'}
    }),
    new VueLoaderPlugin(),
    new WriteFilePlugin(),
    new HtmlWebpackPlugin({
      template: "./src/template.html",
      inject: true,
    }),
    new CleanWebpackPlugin(),
    new AssetsWebpackPlugin({
      path: path.join(__dirname, "dist"),
      filename: 'index.json',
      processOutput(assets) {
        delete assets[''];
        return JSON.stringify(assets, null, 4);
      },
      prettyPrint: true
    })
  ],
};
