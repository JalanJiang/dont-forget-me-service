/*
 * 路由表
 * Time: 2019-01-17 18:18
 * Author: JalanJiang
 */
module.exports(function (server) {

    var user = require('../controller/userController');
    var book = require('../controller/bookController');

    // 账号体系

    // 用户

    // 记本
    server.post('/book', book.createBook);

    // 动态
});