let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList: ipUrl + 'getArticleList',  //  首页文章列表接口
    getArticleById: ipUrl + 'getArticleById/', // 文章详细页内容接口 ,需要接收参数
    getTypeInfo: ipUrl + 'getTypeInfo',        // 文章分类信息
    getListById: ipUrl + 'getListById/',       // 根据类别ID获得文章列表
    getListSearch: ipUrl + 'getListSearch/',   // 输入关键字查询文章
    giveGood: ipUrl + 'giveGood/',             // 输入关键字查询文章
    checkLogin: ipUrl + 'checkLogin',          // 检查用户名密码是否正确
    message:ipUrl+'message/',                  // 获取留言
    sendMessage:ipUrl+'sendMessage'  ,         // 发送留言
    reply:ipUrl+'message/reply'                      // 回复留言








}
export default servicePath;
