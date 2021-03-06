'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async index() {
        this.ctx.body = 'api hi';
    }

    async getArticleList() {
        const tab = this.ctx.params.tab;
        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.commentCount as commentCount,' +
            'article.praise as praise,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ' +
            `FROM article LEFT JOIN type ON article.type_id = type.Id order by ${tab||'addTime'}  DESC`;
        const results = await this.app.mysql.query(sql);
        this.ctx.body = {
            data: results,
        };
    }

    async getArticleById() {
        // 先配置路由的动态传值，然后再接收值
        const id = this.ctx.params.id;
        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.video as video,' +
            'article.introduce as introduce,' +
            'article.introduce as introduce,' +
            'article.praise as praise,' +
            'article.commentCount as commentCount,' +
            'article.article_content as article_content,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ,' +
            'type.id as typeId ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE article.id=' + id
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }

    // 得到类别名称和编号
    async getTypeInfo() {
        const result = await this.app.mysql.select('type');
        this.ctx.body = { data: result };
    }

    // 根据类别ID获得文章列表
    async getListById() {
        const id = this.ctx.params.id;
        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.praise as praise,' +
            'article.commentCount as commentCount,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE type_id=' +
            ` ${id} order by ${this.ctx.params.tab || 'addTime'} DESC`;;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }
    // 视频查询
    // async  giveGoodVideo() {
    //     const id = this.ctx.params.id;
    //     const { id, typeid, praise } = this.ctx.params
    //     const sql = 'SELECT article.id as id,' +
    //         'article.title as title,' +
    //         'article.introduce as introduce,' +
    //         'article.praise as praise,' +
    //         'article.commentCount as commentCount,' +
    //         "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
    //         'article.view_count as view_count ,' +
    //         'type.typeName as typeName ' +
    //         'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //         'WHERE type_id=' +''
    //     const result = await this.app.mysql.query(sql);
    //     this.ctx.body = { data: result };
    // }
    // 查询
    async getListSearch() {
        const context = `%${this.ctx.params.context || ''}%`;

        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.praise as praise,' +
            'article.commentCount as commentCount,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            'type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
            'WHERE title LIKE' + `'${context}'`
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }
    // 点赞
    async giveGood() {
        const sql = `UPDATE article SET praise=${Number(this.ctx.params.praise) + 1} WHERE id=${this.ctx.params.id}`
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }

   
    //获取留言列表
    async getMessages(query) {
        const { current = 0, pageSize = 10 } = query
        // 获取留言信息
        const sqlMsg = `select SQL_CALC_FOUND_ROWS * from messages where pid=-1 order by createTime DESC limit ${current * pageSize},${pageSize}`
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
                ...item,
                children
            }
        })
        this.ctx.body = {
            list,
            current: parseInt(current),
            pageSize: parseInt(pageSize),
            total: resTotal[0].total,
        }
    }

    //插入留言
    async sendMessages() {
        const { username, content } = this.ctx.request.body
        let insertObj = {
            createTime: Date.now(),
            content: `'${content}'` || '',
            userIsAdmin: 1,
            userName: `'${username}'`,
            userAvatar: `'https://ui-avatars.com/api/?name=${username}'`
        }
        const sql = `insert into messages (${Object.keys(insertObj).join(',')}) values (${Object.values(insertObj).join(',')})`
        const res = await this.app.mysql.query(sql)
        if (res.affectedRows) {
            this.ctx.body = {
                data: {
                    id: res.insertId
                },
                message: '新增成功'
            }
        } else {
            this.ctx.body = {
                message: '新增失败'
            }
        }
    }

    //回复留言
    async reply() {
        const { content, type, pid, replyUser,targetName } = this.ctx.request.body
        
        let insertObj = {
            type: type || 0,
            pid: pid || -1,
            createTime: Date.now(),
            content: `'${content}'` || '',
            userName: `'${replyUser}'` || '',
            targetUserName: `'${targetName}'` || '',
            userAvatar: `'https://ui-avatars.com/api/?name=${replyUser}'`

        }
        const sql = `insert into messages (${Object.keys(insertObj).join(',')}) values (${Object.values(insertObj).join(',')})`
        const res = await this.app.mysql.query(sql)
        if (res.affectedRows) {
            this.ctx.body = {
                data: {
                    id: res.insertId
                },
                message: '新增成功'
            }
        } else {
            this.ctx.body = {
                message: '新增失败'
            }
        }
    }


}


module.exports = HomeController;
