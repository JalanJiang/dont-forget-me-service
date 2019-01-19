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

    // 鉴权与账号验证
    server.use(account.checkToken);


    // 账号体系

    // 用户

    // 记本
    server.post('/v1/book', book.createBook);
    server.del('/v1/book', book.deleteBook);
    server.patch('/v1/book', book.updateBook);
    server.get('/v1/book/:id', book.getBook);
    server.get('/v1/books', book.getBookList);

    // 动态
};