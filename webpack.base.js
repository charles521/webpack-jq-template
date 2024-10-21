const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); 
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin"); 
function getStyleLoader(pre){
    return [
      MiniCssExtractPlugin.loader,
      "css-loader",
      {
        loader: 'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
                'postcss-preset-env'
            ],
          },
        },
      },
      pre,
    ].filter(Boolean)
}
function modeHtmlFuc(_names){
    return new HtmlWebpackPlugin({
        template:path.resolve(__dirname,"./src/"+_names+".html"),
        filename: _names+".html", 
        chunks: [_names],
        showErrors: true,
    });
}
const isDevelopment = process.env.NODE_ENV == "development" ? true : false;
module.exports = {
    entry:{
        index:"./src/js/index.js"
    },
    output:{
        path: isDevelopment ? undefined : path.resolve(__dirname,"./dist") ,
        filename:isDevelopment ? 'js/[name].js' : 'js/[name].[hash:6].js',
        chunkFilename:isDevelopment ? 'js/[name].chunk.js' : 'js/[name].[hash:6].chunk.js',
        clean:true, 
    },
    module:{
        rules:[
            {
                oneOf:[
                    {
                        test: /\.css$/i,
                        use: getStyleLoader(),
                    },
                    {
                        test: /\.less$/i,
                        use: getStyleLoader('less-loader'),
                    },
                    {
                        test: /\.s[ac]ss$/i,
                        use: getStyleLoader('sass-loader'),
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp|svg)$/i,
                        type:"asset", 
                        parser: {
                            dataUrlCondition: {
                              maxSize:isDevelopment ? 0 : 5 * 1024
                            }
                        },
                        generator: {
                            filename: isDevelopment ? 'image/[name][ext][query]' : 'image/[hash:6][ext][query]',
                            // outputPath: '[path]'
                        }
                    },
                    {
                        test: /\.(mp3|mp4|avi)$/i,
                        type:"asset/resource", 
                        generator: {
                            filename: 'media/[name][ext][query]'
                        }
                    },
                    {
                        test: /\.(ttf|woff2?)$/i,
                        type:"asset/resource", 
                        generator: {
                            filename: 'font/[name][ext][query]'
                          }
                    },
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        loader: 'babel-loader', 
                        options:{
                          cacheDirectory:true,
                          cacheCompression:false,
                          plugins:["@babel/plugin-transform-runtime"],
                        }
                    },
                    {
                        test: /\.html$/i,
                        loader:"html-loader",
                        options:{
                            esModule:false,
                        }
                    },
                ]
            }
        ]
    },
    plugins:[
        modeHtmlFuc("index"),
        new MiniCssExtractPlugin({ 
            filename:isDevelopment ? 'css/[name].css' : 'css/[name].[hash:6].css'
        }),
        new CssMinimizerPlugin(),
        new ESLintPlugin({
            context:path.resolve(__dirname,"./src"),
            cache:true,
            cacheLocation:path.resolve(
              __dirname,
              "./node_modules/.cache/eslintcache"
            )
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation:ImageMinimizerPlugin.imageminGenerate,
                options:{
                plugins: [
                    ["gifsicle", { interlaced: true }],
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 5 }],
                    [
                    "svgo",
                    {
                        plugins:[
                        "preset-default",
                        "prefixIds",
                        {
                            name:"sortAttrs",
                            params:{
                            xmlnsOrder:"alphabetical",
                            }
                        }
                        ],
                    },
                    ],
                ],
                }
                
            },
        }),
    ],
    mode: isDevelopment ? "development" :"production", 
    optimization:{
        splitChunks:{
            chunks:"all",
        },
        runtimeChunk:{
            name:(entrypoint)=> `runtime~${entrypoint.name}.js`
        }
    },
    devtool:isDevelopment ? "cheap-module-source-map":"source-map",
}