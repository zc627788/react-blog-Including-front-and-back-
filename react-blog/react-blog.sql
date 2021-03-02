﻿# Host: localhost  (Version: 5.7.26)
# Date: 2020-01-13 01:05:15
# Generator: MySQL-Front 5.3  (Build 4.234)

/*!40101 SET NAMES utf8 */;

#
# Structure for table "admin_user"
#

DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

#
# Data for table "admin_user"
#

/*!40000 ALTER TABLE `admin_user` DISABLE KEYS */;
INSERT INTO `admin_user` VALUES (1,'zzc','123456'),(2,'admin','123456');
/*!40000 ALTER TABLE `admin_user` ENABLE KEYS */;

#
# Structure for table "article"
#

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL DEFAULT '0',
  `title` varchar(255) DEFAULT NULL,
  `article_content` text,
  `introduce` text,
  `addTime` int(11) DEFAULT NULL,
  `view_count` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

#
# Data for table "article"
#

/*!40000 ALTER TABLE `article` DISABLE KEYS */;
INSERT INTO `article` VALUES (1,1,'文章标题1','# 创建目录\r\n项目名称: vue-init\r\napp\r\n    ├─css\r\n    │      reset.scss\r\n    │\r\n    ├─js\r\n    │  │  App.vue\r\n    │  │  main.js\r\n    │  │\r\n    │  ├─home\r\n    │  │      index.vue\r\n    │  │\r\n    │  └─router\r\n    │          index.js\r\n    │\r\n    └─views\r\n            index.html\r\n\r\n\r\n# 安装webpack\r\n```bash\r\nnpm i -D webpack\r\n```\r\n\r\n# 创建配置文件\r\nwebpack.config.js\r\n基础配置\r\n- entry 入口\r\n- module 模块\r\n- plugins 插件\r\n- output 输出\r\n\r\n进阶配置\r\n- resolve\r\n- devtool\r\n- devServer\r\n- ...\r\n\r\n# 基础配置\r\n## 步骤\r\n先写好基本结构\r\n```js\r\nmodule.exports = {\r\n    enter: {},\r\n    module: {},\r\n    plugins: [],\r\n    output: {}\r\n}\r\n\r\n```\r\n\r\n配置入口文件，以main.js作为打包入口文件\r\n```js\r\n    enter: {\r\n        app: \'./app/js/main.js\'\r\n    }\r\n```\r\n\r\n\r\n配置module，里面主要配置使用的各种loader\r\n```\r\n   module: {\r\n        rules: [\r\n            {\r\n                test: /\\.html$/,\r\n                use: [\r\n                    {\r\n                        loader: \'html-loader\'\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                test: /\\.vue$/,\r\n                use: [\r\n                    {\r\n                        loader: \'vue-loader\'\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                test: /\\.scss$/,\r\n                use: [\r\n                    { loader: \'style-loader\' },\r\n                    {\r\n                        loader: \'css-loader\',\r\n                        options: {\r\n                            module: true\r\n                        }\r\n                    },\r\n                    { loader: \'sass-loader\' },\r\n                ]\r\n            },\r\n        ]\r\n    },\r\n```\r\n- test 的值为正册表达式，配对文件后缀，表示什么文件对应的loader\r\n- sass 需要使用多个loader，解析顺序是从右向左\r\n- `options: { module: true }` 开启css module\r\n\r\n稍后再配置plugins,先配置output\r\n```js\r\n//在webpack.config.js顶部引入path\r\nconst path = require(\'path\');\r\n```\r\n```js\r\n    output: {\r\n        filename: \'[name].min.js\',\r\n        path: path.resolve(_dirname, \'dist\')\r\n    }\r\n}\r\n\r\n```\r\n- filename表示打包后输出的文件名\r\n- [name] 对应 enter.app的值\r\n- path 打包输出的路径\r\n- path.resolve()  webpack的执行环境是node，这里的path是node里的一个对象,用于处理文件路径和目录路径\r\n\r\n\r\n配置好了 我们开始安装loaders\r\n```bash\r\nnpm i -D html-loader vue-loader style-loader css-loader sass-loader\r\n```\r\n如果有loader安装不成功请再单个安装它，或者换用cnpm\r\n\r\n## 基础配置代码\r\n到这一步我们的基础配置已经做好，代码如下：\r\n```js\r\nmodule.exports = {\r\n    enter: {\r\n        app: \'./app/js/main.js\'\r\n    },\r\n    module: {\r\n        rules: [\r\n            {\r\n                test: /\\.html$/,\r\n                use: [\r\n                    {\r\n                        loader: \'html-loader\'\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                test: /\\.vue$/,\r\n                use: [\r\n                    {\r\n                        loader: \'vue-loader\'\r\n                    }\r\n                ]\r\n            },\r\n            {\r\n                test: /\\.scss$/,\r\n                use: [\r\n                    { loader: \'style-loader\' },\r\n                    {\r\n                        loader: \'css-loader\',\r\n                        options: {\r\n                            module: true\r\n                        }\r\n                    },\r\n                    { loader: \'sass-loader\' },\r\n                ]\r\n            },\r\n        ]\r\n    },\r\n    plugins: [],\r\n    output: {\r\n        filename: \'[name].min.js\',\r\n        path: path.resolve(_dirname, \'dist\')\r\n    }\r\n}\r\n```\r\n\r\n# 进阶配置\r\n\r\n## devServer\r\n```js\r\n  devServer: {\r\n    contentBase: path.join(__dirname, \'dist\'),\r\n    compress: true,\r\n    port: 9000\r\n  }\r\n```\r\n- contentBase 告诉服务器从哪个目录中提供内容。\r\n- compress 压缩\r\n- port 启动端口号\r\n\r\n配置好了 我们开始安装它\r\n```bash\r\nnpm i -D webpack-dev-server\r\n```\r\n\r\n\r\n# 测试\r\n添加一些代码以供测试\r\nhome/index.vue\r\n```\r\n<template>\r\n    <div id=\"home\">\r\n        <h1>首页</h1>\r\n        <p>123123<p>\r\n    </div>\r\n</template>\r\n\r\n<script>\r\nexport default {}\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n    .home {\r\n        color: red;\r\n        font-size: 80px;\r\n        p {\r\n            color: blue\r\n        }\r\n    }\r\n</style>\r\n```\r\n\r\nrouter/index.js\r\n``` js\r\nimport Vue from \"vue\"\r\nimport Router from \"vue-router\"\r\nimport Home from \"../home/index.vue\"\r\n\r\nVue.use(Router);\r\n\r\nexport default new Router({\r\n    routes: [{\r\n        path: \'/\',\r\n        name: \'home\',\r\n        component: Home\r\n    }]\r\n})\r\n```\r\n\r\nApp.vue\r\n```\r\n<template>\r\n  <div id=\"app\">\r\n    <router-view></router-view>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n    name: \'app\'\r\n};\r\n</script>\r\n\r\n<style lang=\"scss\" scoped>\r\n</style>\r\n```\r\n\r\nmain.js\r\n```js\r\nimport Vue from \'vue\'\r\nimport App from \'./App.vue\'\r\nimport router from \'./router\'\r\n\r\nVue.config.productionTip = false;\r\n\r\nnew Vue({\r\n    router,\r\n    render: h => h(App)\r\n}).$mount(\"#app\")\r\n```\r\n\r\n我们还需要安装 vue 和vue router\r\n``` bash\r\nnpm i vue vue-router\r\n```\r\n\r\n## 运行devServer\r\n还需要安装两个依赖\r\n```bash\r\nnpm i -D html-webpack-plugin clean-webpack-plugin\r\n```\r\n\r\nwebpack.config.js顶部加入如下代码\r\n```\r\n    const HtmlWebpackPlugin = require(\'html-webpack-plugin\');\r\n    const { CleanWebpackPlugin } = require(\'clean-webpack-plugin\');\r\n    // 注意这里的写法， 这样写 const CleanWebpackPlugin 会报错\r\n```\r\n- html-webpack-plugin\r\n> 官网文档解释：HtmlWebpackPlugin简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。另外你可以在github查看这个项目的详细配置。\r\n- clean-webpack-plugin 在每次构建前清理 /dist 文件夹，这样只会生成用到的文件。\r\n\r\n配置plugins\r\n```\r\n    plugins: [\r\n        new CleanWebpackPlugin(),\r\n        new HtmlWebpackPlugin({\r\n            template: \'./views/index.html\'\r\n        })\r\n    ],\r\n```\r\n\r\nindex.html\r\n```html\r\n<!DOCTYPE html>\r\n<html lang=\"en\">\r\n<head>\r\n    <meta charset=\"UTF-8\">\r\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\r\n    <title>Document</title>\r\n</head>\r\n<body>\r\n    <div id=\"app\"></div>\r\n</body>\r\n</html>\r\n```\r\n\r\npackage.json 加入 \"start\": \"webpack-dev-server --open\"\r\n```\r\n  \"scripts\": {\r\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\r\n    \"start\": \"webpack-dev-server --open\"\r\n  },\r\n```\r\n跑完发现一大堆报错\r\n- You may need an additional loader to handle the result of these loaders. Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的\r\n```bash\r\nnpm i vue-loader-plugin -S\r\n\r\n```\r\nwebpack.config.js\r\n```\r\nconst VueLoaderPlugin = require(\'vue-loader/lib/plugin\')\r\n\r\nmodule.exports = {\r\n  // ...\r\n  plugins: [\r\n    new VueLoaderPlugin()\r\n  ]\r\n}\r\n```\r\n- Cannot find module \'node-sass\'\r\n安装就完了，最后我们npm start 项目成功运行\r\n![](https://img2018.cnblogs.com/blog/1501373/201912/1501373-20191208152142194-238998746.png)\r\n\r\n\r\n# px2rem\r\n```\r\nnpm install -D px2rem-loader\r\n```\r\n\r\n```\r\nmodule: {\r\n        rules: [\r\n            {\r\n                test: /\\.html$/,\r\n                use: \'html-loader\'\r\n            },\r\n            {\r\n                test: /\\.vue$/,\r\n                use: \'vue-loader\'\r\n            },\r\n            {\r\n                test: /\\.scss$/,\r\n                use: [\r\n                    \'vue-style-loader\',\r\n                    \'css-loader\',\r\n                    {\r\n                        loader: \'px2rem-loader\',\r\n                        options: {\r\n                            remUnit: 75,\r\n                            remPrecision: 6\r\n                        }\r\n                    },\r\n                    \'sass-loader\'\r\n                ]\r\n            },\r\n        ]\r\n    },\r\n```\r\n\r\n![](https://img2018.cnblogs.com/blog/1501373/201912/1501373-20191208152156371-1479164112.png)\r\n\r\n\r\n> 这部分为什么这么配置，参考了Vue官方文档 -> 单文件组建 -> 针对高级用户 -> VueLoader\r\n原来的webpack3.x需要在vue-loader 下配置css 和 sass 并配置 px2rem。\r\n\r\n# css module\r\n```\r\n// ...\r\n{\r\n    test: /\\.scss$/,\r\n    use: [\r\n        \'vue-style-loader\',\r\n+        {\r\n+            loader: \'css-loader\',\r\n+             options: {\r\n+                 modules: true,\r\n+                 localIdentName: \'[local]_[hash:base64:8]\'\r\n+             }\r\n+        },\r\n        {\r\n            loader: \'px2rem-loader\',\r\n            options: {\r\n                remUnit: 75,\r\n                remPrecision: 6\r\n            }\r\n        },\r\n        \'sass-loader\'\r\n    ]\r\n},\r\n```\r\n![](https://img2018.cnblogs.com/blog/1501373/201912/1501373-20191208152205998-1532178830.png)\r\n> 如果你不知道如何使用css module 请参阅Vue官方文档 -> 单文件组建 -> 针对高级用户 -> VueLoader -> css module\r\n\r\n# css提取\r\n```\r\nnpm install -D mini-css-extract-plugin\r\n```\r\n\r\n```\r\n{\r\n    test: /\\.scss$/,\r\n    use: [\r\n        MiniCssExtractPlugin.loader,\r\n        {\r\n            loader: \'css-loader\',\r\n            options: {\r\n                modules: true\r\n            }\r\n        },\r\n        {\r\n            loader: \'px2rem-loader\',\r\n            options: {\r\n                remUnit: 75,\r\n                remPrecision: 6\r\n            }\r\n        },\r\n        \'sass-loader\'\r\n    ]\r\n},\r\n```\r\n\r\n```\r\nplugins: [\r\n    // ...\r\n    new MiniCssExtractPlugin({\r\n      filename: \'style.css\'\r\n    })\r\n  ]\r\n```\r\n\r\n# 区分生产环境和开发环境\r\n## webpack3\r\n我们需要使用webpack的DefinePlugin创建一个在编译时可以配置的全局常量。在webpack.config.js头部引入webpack\r\n```\r\nconst webpack = require(\'webpack\');\r\n```\r\n\r\n接下来我们把module.exports的值改为箭头函数,并传入一个参数env\r\n```\r\nmodule.exports = env => {\r\n    if (!env) { env = {} }\r\n    return {\r\n        // 原来的配置\r\n    }\r\n}\r\n```\r\n\r\n我们先来做一个示例，例如我们在开发环境不需要css提取\r\n```js\r\nmodule.exports = env => {\r\n    if (!env) { env = {} }\r\n\r\n    let plugins = [\r\n        new CleanWebpackPlugin(),\r\n        new HtmlWebpackPlugin({\r\n            template: \'./views/index.html\'\r\n        }),\r\n        new VueLoaderPlugin(),\r\n    ];\r\n\r\n    if (env.production) {\r\n        plugins.push(\r\n            new webpack.DefinePlugin({\r\n                \'process.env\': {\r\n                    NODE_ENV: \'production\'\r\n                }\r\n            }),\r\n            new MiniCssExtractPlugin({\r\n                filename: \'style.css\'\r\n            })\r\n        )\r\n    }\r\n```\r\n- process 对象是属于node的一个全局变量\r\n- 我们只需要根据是否传入了env.production，然后给plugins数组push生产环境下需要的MiniCssExtractPlugin插件\r\n\r\n\r\n对应的我们还有修改部分原来的代码\r\n```\r\n{\r\n    test: /\\.scss$/,\r\n    use: [\r\n*       env.production?MiniCssExtractPlugin.loader:\'vue-style-loader\',\r\n        {\r\n            loader: \'css-loader\',\r\n            options: {\r\n                modules: true\r\n            }\r\n        },\r\n        {\r\n            loader: \'px2rem-loader\',\r\n            options: {\r\n                remUnit: 75,\r\n                remPrecision: 6\r\n            }\r\n        },\r\n        \'sass-loader\'\r\n    ]\r\n},\r\n```\r\n以及原来的plugins配置我们直接将它的值变为我们上面定义的plugins。\r\npackage.json中我们需要添加命令\r\n\r\n```\r\n  \"scripts\": {\r\n    \"test\": \"echo \\\"Error: no test specified\\\" && exit 1\",\r\n    \"start\": \"webpack-dev-server --open\",\r\n    \"watch\": \"webpack --watch\",\r\n    \"build\" : \"webpack --env.production\"\r\n  },\r\n```\r\n> 注意我们给webpack 传递了参数，我们就是利用这个参数来区分环境。\r\n\r\n\r\n```\r\nnpm start\r\n```\r\n![](https://img2018.cnblogs.com/blog/1501373/201912/1501373-20191208152409717-30910092.png)\r\n控制台我们可以看到\r\ncss样式以style标签插入，并没有被提取，说明MiniCssExtractPlugin插件没有运行\r\n```\r\nnpm run build\r\n```\r\n运行打包后的index.html,css样式以link标签插入，说明css被提取合并为一个文件，说明生产环境下MiniCssExtractPlugin插件运行了\r\n![](https://img2018.cnblogs.com/blog/1501373/201912/1501373-20191208152544556-42298554.png)\r\n\r\n\r\n## webpack4\r\n上面是的做法看起来更好理解，webpack4中我们可以直接利用mode来区分开发环境和生产环境。头部我们不需要引入webpack了， 因为我们不需要依赖 DefinePlugin。\r\n配置中新增：\r\n```\r\nmode: \'development\' //默认是 development\r\n```\r\n\r\n```\r\nmodule.exports = (env, argv) => {\r\n  if (argv.mode === \'production\') {\r\n    //...\r\n  }\r\n\r\n  return config;\r\n};\r\n```\r\n\r\n\r\n# eslint\r\n```\r\nnpm i eslint -D\r\n```\r\neslint支持多种格式的配置文件，同时支持把配置直接写在package.json中，我们直接在写在package.json中，如何配置呢？\r\nvue项目可以直接使用vue官方推荐的插件\r\n\r\n```\r\nnpm i eslint-plugin-vue -D\r\n```\r\n\r\npackage.json添加如下：\r\n```\r\n{\r\n  // 其他配置\r\n \"eslintConfig\": {\r\n    \"root\": true,\r\n    \"parserOptions\": {\r\n      \"ecmaVersion\": 2017\r\n    },\r\n    \"extends\": [\r\n      \"mysticatea\",\r\n      \"mysticatea/modules\",\r\n      \"plugin:vue/recommended\"\r\n    ],\r\n    \"plugins\": [\r\n      \"node\"\r\n    ],\r\n    \"env\": {\r\n      \"browser\": false\r\n    },\r\n    \"globals\": {\r\n      \"applicationCache\": false,\r\n      \"atob\": false,\r\n      \"btoa\": false,\r\n      \"console\": false,\r\n      \"document\": false,\r\n      \"location\": false,\r\n      \"window\": false\r\n    },\r\n    \"rules\": {\r\n      \"node/no-extraneous-import\": \"error\",\r\n      \"node/no-missing-import\": \"error\",\r\n      \"node/no-unpublished-import\": \"error\",\r\n      \"vue/html-indent\": [\r\n        \"error\",\r\n        4\r\n      ],\r\n      \"vue/max-attributes-per-line\": \"off\"\r\n    }\r\n  },\r\n  \"eslintIgnore\": [\r\n    \"node_modules\",\r\n    \"webpack.config.js\"\r\n  ]\r\n}\r\n```','文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介文章简介',1571394242,0),(2,1,'文章标题2','1111111111`hajfaj`','\n文章简介22222222',1571328000,1),(5,3,'6666','666','6666',1578758400,1088),(6,1,'111111','1111111','111111',1578758400,1060),(7,1,'22222222','2222222\n2222222\n222222','2222',1578758400,1094);
/*!40000 ALTER TABLE `article` ENABLE KEYS */;

#
# Structure for table "type"
#

DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `orderNum` int(11) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

#
# Data for table "type"
#

/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'视频教程',1,'youtube'),(2,'大胖逼逼叨',2,'message'),(3,'快乐生活',3,'smile');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
