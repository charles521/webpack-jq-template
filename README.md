

# node 版本建议

〉16+

# 安装依赖

npm i

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题

npm install --registry=https://registry.npm.taobao.org

# 启动服务

npm run dev

````


## 发布

```bash
# 构建测试环境
npm run build:test

# 构建生产环境
npm run build:prod
````


# 脚手架说明


```bash
# 全局环境变量
API_CONFIG

# 多页面
webpack.base.js
    1、入口添加主文件 entry
    2、添加html模板：modeHtmlFuc("xxx")  注意点：xxx需要和主文件的key相同

#不想改变图片文件名
图片放入到 copyimages
````
