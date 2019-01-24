function userController()
{
    var User = require('../model/user');
    var base = require('./baseController');
    var con = require('../const');

    this.getUserInfo = function (req, res, next) {

        var uid = req.uid;

        User.findOne({uid: uid}, function (err, doc) {
            if (err) {
                base.returnError(
                    res,
                    con.HTTP_CODE_SERVER_ERR,
                    con.HTTP_CODE_SERVER_ERR,
                    "服务器出错"
                );
            } else {
                if (doc) {
                    base.returnSuccess(res, doc);
                } else {
                    // 用户不存在
                    base.returnError(
                        res,
                        con.HTTP_CODE_CILENT_ERR,
                        con.HTTP_CODE_CILENT_ERR,
                        "用户不存在"
                    );
                }
            }
        });
    }
}

module.exports = new userController();