function bookController()
{
    var Book = require('../model/book');

    // 创建记本
    this.createBook = function (req, res) {

        var name = req.body.name;
        var cover = req.body.cover;
        var description = req.body.description;
        var isPrivate = req.body.is_private || 1;
        var uid = req.body.uid;

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
               res.status(500);
               res.send({"err_message": err});
           } else {
               res.json(book);
           }
        });
    }

    // 删除记本
    this.deleteBook = function (req, res, next) {

    }

    // 更新记本
    this.updateBook = function (req, res, next) {
        
    }

    // 获取记本详情
    this.getBook = function (req, res, next) {
    }

    // 获取记本列表
    this.getBookList = function (req, res, next) {
        res.send({"code": 101});
    }
}

module.exports = new bookController();