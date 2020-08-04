const webpack = require('webpack');
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {library}=require('./dll.config')
module.exports = {
    entry:{
        ...library
    },
    output:{
        filename:'dll.[name].js',
        path:path.resolve(__dirname,'../dll'),
        library: '_dll_[name]'
    },
    plugins:[
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({
            name: '_dll_[name]',
            path: path.resolve(__dirname, '../dll', '[name].manifest.json')
        })
    ]
}