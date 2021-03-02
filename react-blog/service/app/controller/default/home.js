'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {

    async index() {
        this.ctx.body = 'api hi';
    }

    async getArticleList() {

        const sql = 'SELECT article.id as id,' +
            'article.title as title,' +
            'article.introduce as introduce,' +
            'article.commentCount as commentCount,' +
            'article.praise as praise,' +
            "FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s' ) as addTime," +
            'article.view_count as view_count ,' +
            '.type.typeName as typeName ' +
            'FROM article LEFT JOIN type ON article.type_id = type.Id';
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
            'WHERE article.id=' + id;
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
            'WHERE type_id=' + id;
        const result = await this.app.mysql.query(sql);
        this.ctx.body = { data: result };
    }
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
}


module.exports = HomeController;
