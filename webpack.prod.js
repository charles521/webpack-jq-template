const webpack = require('webpack');
const { merge }  = require('webpack-merge')
const base = require('./webpack.base')
module.exports =merge(base,{
  plugins: [
    new webpack.DefinePlugin({
      API_CONFIG: JSON.stringify('http://www.baidu.com')
    }),
    
  ]
})