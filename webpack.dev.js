
const webpack = require('webpack');
const { merge }  = require('webpack-merge')
const base = require('./webpack.base')
const vConsolePlugin =  require("vconsole-webpack-plugin")
module.exports =merge(base, {
  plugins: [
    new webpack.DefinePlugin({
      API_CONFIG: JSON.stringify('http://www.baidu.com')
    })
  ],
  devServer:{
    host:"local-ipv4",
    port:"auto",
    open:true,
    hot:true,
    client: {
      overlay: {
        errors: true,
        warnings: false,
      }
    }
  
  }
})