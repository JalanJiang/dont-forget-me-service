function accountController() {
    // 验证用户 Token
    this.checkToken = function (req, res, next) {

        var reqRoutePath = req.route.path;
        var reqRouteList = reqRoutePath.split("/");

        // 用户登录、注册无需验证
        if (reqRouteList[2] !== 'account') {
            var token = req.body.token || req.query.token;

            if (token) {
                // token 验证逻辑
                jwt.verify(token, config.secret, function (err, decode) {
                    if (err) {
                        // 验证失败
                    } else {
                        // 验证成功：获取 uid
                        // req.body.uid = '10002';
                    }
                });

                // console.log('check_token');
                return next();
            } else {
                res.status(400);
                return res.send({'err_message': 'token 不存在'});
            }
        } else {
            return next();
        }
    }


}

module.exports = new accountController();