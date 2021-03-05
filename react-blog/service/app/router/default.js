'use strict';
module.exports = app => {
    const { router, controller } = app;
    router.get('/default/index', controller.default.home.index);
    router.get('/default/getArticleList/:tab', controller.default.home.getArticleList);
    router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
    router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
    router.get('/default/getListById/:id/:tab', controller.default.home.getListById);
    router.get('/default/getListSearch/:context', controller.default.home.getListSearch);
    router.get('/default/giveGood/:id/:praise', controller.default.home.giveGood);
    router.get('/default/message/:current/:pageSize', controller.default.home.getMessages);
    router.post('/default/sendMessage', controller.default.home.sendMessages);
    router.post('/default/message/reply', controller.default.home.reply);







};
