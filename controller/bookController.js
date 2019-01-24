function bookController()
{
    var Book = require('../model/book');
    var base = require('./baseController');
    var error = require('../config/err');

    // 创建记本
    this.createBook = function (req, res) {

        var name = req.body.name;
        var cover = req.body.cover;
        var description = req.body.description;
        var isPrivate = req.body.is_private || 1;
        var uid = req.uid;

        console.log(req.body);

        var bookModel = new Book({
            uid: uid,
            name: name,
            cover: cover,
            description: description,
            is_private: isPrivate
        });

        bookModel.save(function (err, book) {
           if (err) {
               base.returnError(
                   res,
                   error.code.HTTP_CODE_SERVER_ERR,
                   err
               );
           } else {
               base.returnSuccess(res, book);
           }
        });
    }

    // 删除记本
    this.deleteBook = function (req, res, next) {

        var uid = req.uid;
        var bookId = req.params.id;

        Book.removeOne({uid: uid, _id: bookId}, function (err, result) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_SERVER_ERR,
                    err
                );
            } else {
                base.returnSuccess(res);
            }
        });
    }

    // 更新记本
    this.updateBook = function (req, res, next) {

    }

    // 获取记本详情
    this.getBook = function (req, res, next) {

        var uid = req.uid;
        var bookId = req.params.id;

        Book.findOne({uid: uid, _id: bookId}, function (err, book) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_SERVER_ERR,
                    err
                );
            } else {
                if (book) {
                    base.returnSuccess(res, book);
                } else {
                    base.returnError(
                        res,
                        error.code.HTTP_CODE_CILENT_ERR,
                        "记本不存在"
                    );
                }
            }
        });
    }

    // 获取记本列表
    this.getBookList = function (req, res, next) {
        var uid = req.uid;
        Book.find({uid: uid}, function (err, books) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_SERVER_ERR,
                    err
                );
            } else {
                base.returnSuccess(res, books);
            }
        });
    }
}

module.exports = new bookController();