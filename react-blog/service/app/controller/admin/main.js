'use strict';
const Controller = require('egg').Controller
class MainController extends Controller {
    async index() {
        //首页的文章列表数据
        this.ctx.body = 'hi api'
    }

    // 判断用户名密码是否正确
    async checkLogin() {
        let userName = this.ctx.request.body.userName
        let password = this.ctx.request.body.password
        const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
            "' AND password = '" + password + "'"

        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            //登录成功,进行session缓存
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body = { 'data': '登录成功', 'openId': openId }
            return this.ctx.session.openId

        } else {
            this.ctx.body = { data: '登录失败' }
        }
    }

    // 判断用户名是否存在
    async checkName(registerUsername) {
        let userName = this.ctx.params.value
        const sql = " SELECT userName FROM admin_user WHERE userName = " + ` '${userName || registerUsername}' `
        const res = await this.app.mysql.query(sql)
        this.ctx.body = { num: res.length }
        return { data: { num: res.length } }
    }

    //注册
    async  register() {
        const { username, password } = this.ctx.request.body
        if (!username || !password) {
            this.ctx.body = { message: '请输入账号或者密码' }
        }
        const checkNameResult = await this.checkName(username)
        if (checkNameResult.data.num) {
            this.ctx.body = { message: '用户名已存在' }
            return
        }
        const sql = `insert into admin_user (userName, password) values('${username}', '${password}')`
        const res = await this.app.mysql.query(sql)
        if (res.affectedRows) {
            this.ctx.body = { message: '注册成功' }

        } else {
            this.ctx.body = { message: '注册失败' }
        }
    }

    //后台文章分类信息
    async getTypeInfo() {
        const resType = await this.app.mysql.select('type')
        this.ctx.body = { data: resType }
    }

    //添加文章
    async addArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tmpArticle)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        this.ctx.body = {
            isScuccess: insertSuccess,
            insertId: insertId
        }
    }

    //修改文章
    async updateArticle() {
        const tmpArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tmpArticle);
        const updateSuccess = result.affectedRows === 1;
        this.ctx.body = {
            isScuccess: updateSuccess
        }
    }

    //获得文章列表
    async getArticleList() {
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'ORDER BY article.id DESC '
        const resList = await this.app.mysql.query(sql)
        this.ctx.body = { list: resList }
    }

    //删除文章
    async delArticle() {
        let id = this.ctx.params.id
        const res = await this.app.mysql.delete('article', { 'id': id })
        this.ctx.body = { data: res }
    }

    //根据文章ID得到文章详情，用于修改文章
    async getArticleById() {
        let id = this.ctx.params.id
        let sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql)
        this.ctx.body = { data: result }
    }
    //获取留言
    async getMessage() {
        // 获取留言信息
        const sqlMsg = `select SQL_CALC_FOUND_ROWS * from messages where pid=-1 order by createTime DESC `
        const resMsg = await this.app.mysql.query(sqlMsg)

        // 获取总留言数
        const sqlTotal = 'select found_rows() as total'
        const resTotal = await this.app.mysql.query(sqlTotal)

        // 获取对应页的回复数据
        const pids = Array.isArray(resMsg) ? resMsg.map(i => i.id) : []
        let resReply = []
        if (pids.length) {
            const sqlReply = `select * from messages where pid in (${pids.join(',')}) order by createTime`
            resReply = await this.app.mysql.query(sqlReply)
        }

        const list = resMsg.map(item => {
            const children = resReply.filter(i => i.pid === item.id)
            return {
                id: item.id,
                userName: item.userName,
                createTime: new Date(item.createTime),
                content: item.content,
                replyCount: children.length || 0,
                children
            }
        })
        this.ctx.body = {
            list,
            total: resTotal[0].total,
        }
    }

    //删除留言
    async delMessage() {
        let id = this.ctx.params.id
        const sql = `delete from messages where id=${id}`
        await this.app.mysql.query(sql)
        this.ctx.body = "删除成功"
    }
}

module.exports = MainController
