/*
 * 路由表
 * Time: 2019-01-17 18:18
 * Author: JalanJiang
 */
module.exports = function (server) {

    var account = require('../controller/accountController');
    var user = require('../controller/userController');
    var book = require('../controller/bookController');
    var note = require('../controller/noteController');

    // 中间件
    var authMiddleware = require('../middleware/authController');
    var accountMiddleware = require('../middleware/accountController');

    // 鉴权与账号验证
    server.use(authMiddleware.checkAuth); //鉴权
    server.use(accountMiddleware.checkToken); //用户 Token 验证

    // 账号体系
    server.post('/v1/account/register', account.registry); //用户注册
    server.post('/v1/account/login', account.login); //用户登录

    // 用户
    server.get('/v1/user', user.getUserInfo); //获取用户信息

    // 记本
    server.post('/v1/book', book.createBook); //创建记本
    server.del('/v1/book/:id', book.deleteBook); //删除记本
    server.patch('/v1/book/:id', book.updateBook); //更新记本
    server.get('/v1/book/:id', book.getBook); //获取记本详情
    server.get('/v1/books', book.getBookList); //获取记本列表

    // 动态
};