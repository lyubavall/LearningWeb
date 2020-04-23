const path = require("path");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
    entry: "./frontend/js/main.js",

    devtool: "source-map",

    output: {
        filename: "phone-book.js",
        path: path.resolve(__dirname, "public")
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-env"]
                }
            }
        },{
            test: /\.vue$/,
            use: "vue-loader"
        },{
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader", "sass-loader"
            ]
        },{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader, "css-loader"
            ]
        }, {
            test: /\.(png|jpg|jpeg|gif|svg|ttf|eot|woff|woff2)$/,
            use: "file-loader?name=[path][name].[ext]?[hash]"
        }]
    },

    resolve: {
        alias: {
            "vue$": "vue/dist/vue.esm.js"
        }
    },

    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new VueLoaderPlugin()
    ]
};