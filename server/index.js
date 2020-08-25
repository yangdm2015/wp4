const Koa = require('koa')
const serve = require('koa-static')
const webpack = require('webpack')
const config = require('../build/webpack.config.js')
const koaWebpack = require('koa-webpack')
const {
    resolve
} = require('path')

const app = new Koa()
const port = process.env.PORT || 3000
console.log('config.entry=', config.entry)
async function start() {
    const compiler = webpack(config)
    try {
        const middleware = await koaWebpack({
            compiler
        })
        app.use(middleware)
        app.use(serve(resolve(__dirname, './dist')))
        app.listen(3000)
    } catch (e) {
        console.log(e)
    }
}
start()

