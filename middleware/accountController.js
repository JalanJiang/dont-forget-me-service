function accountController()
{
    var jwt = require('jsonwebtoken');
    var config = require('../config');
    var base = require('../controller/baseController');
    // 验证用户 Token
    this.checkToken = function (req, res, next) {

        var reqRoutePath = req.route.path;
        var reqRouteList = reqRoutePath.split("/");

        // 用户登录、注册无需验证
        if (reqRouteList[2] !== 'account') {

            if (req.method == "POST") {
                token = req.body.token;
            } else {
                token = req.query.token;
            }

            if (token) {
                // token 验证逻辑
                jwt.verify(token, config.secret, function (err, decode) {
                    if (err) {
                        // 验证失败
                        base.returnError(
                            res,
                            error.code.HTTP_CODE_CILENT_ERR,
                            error.code.ERR_CODE_ACCOUNT_TOKEN_VALID
                        );
                    } else {
                        req.uid = decode._id; // 从解密结果获取uid
                    }
                });

                return next();
            } else {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_CILENT_ERR,
                    "token 未传递"
                );
            }
        } else {
            return next();
        }
    }


}

module.exports = new accountController();