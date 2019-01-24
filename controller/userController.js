function userController()
{
    var User = require('../model/user');
    var base = require('./baseController');
    var error = require('../config/err');

    this.getUserInfo = function (req, res, next) {

        var uid = req.uid;

        User.findOne({uid: uid}, function (err, doc) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_CILENT_ERR
                );
            } else {
                if (doc) {
                    base.returnSuccess(res, doc);
                } else {
                    // 用户不存在
                    base.returnError(
                        res,
                        error.code.HTTP_CODE_CILENT_ERR,
                        "用户不存在"
                    );
                }
            }
        });
    }
}

module.exports = new userController();