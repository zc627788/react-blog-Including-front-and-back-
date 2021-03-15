# -
毕业前端博客平台设计

# 项目开启方式:
## 准备步骤:
- 1.进入service
 npm install或者yarn install 安装依赖
- 2.进去 admin 
 npm install 或者 yarn install 安装依赖
- 3.进入blog
 npm install 或者yarn install 安装依赖
 之后需要 npm build 打包下项目
  4.本地安装mysql,建数据库,数据库默认配置请查看 service\config\config.default.js 
    4.1新建数据库
    4.2执行与service同级目录下的sql文件夹下的react-blog.sql命令

## 启动步骤:

1.进去service
 npm run start,会同时启动三个进程  blog admin 和 service

 localhost:3000进去的blog前台页面
 127.0.0.1:3001进入到admin后台页面
 注:(localhost:3001进入后台登录,会登录不了,还需排查,请用127.0.0.1)

 ## 完成




