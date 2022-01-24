/*
 * @Author: your name
 * @Date: 2021-12-02 16:45:27
 * @LastEditTime: 2021-12-10 10:55:37
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \xinnet-comd:\new_works\qiankun-child\vue.config.js
 */
const fs = require("fs");
const { name } = require('./package');
module.exports = {
    runtimeCompiler: true,
    // 基本路径
    publicPath: "/",
    // 输出文件目录
    outputDir: "dist",
    css: {
        // 配置高于chainWebpack中关于css loader的配置
        requireModuleExtension: true, // 是否开启支持‘foo.module.css’样式
        extract: true, // 是否使用css分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用<style>方式内联至html文件中
        sourceMap: false, // 是否在构建样式地图，false将提高构建速度
        loaderOptions: {
            sass: {
                prependData: `@import "~@/style/variables.scss";`,
            },
        },
    },
    productionSourceMap: false, // 是否生成map文件
    devServer: {
        host: "dev-qkchild.ceboss.cn",
        https: {
            key: fs.readFileSync("./n.ceboss.cn_keystore.key"),
            cert: fs.readFileSync("./n.ceboss.cn_certificate.pem"),
        },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: 0,
        },
        port: "8502", // 端口号
        open: true, // 配置自动启动浏览器
        hot: true, // 是否
    },
    configureWebpack: {
        resolve: { extensions: [".ts", ".tsx"] },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                    },
                },
            ],
        },
        output: {
            // 把子应用打包成 umd 库格式
            library: `${name}-[name]`,
            libraryTarget: "umd",
            jsonpFunction: `webpackJsonp_${name}`,
        },
    },
};
