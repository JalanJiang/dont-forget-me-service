function accountController()
{
    var Account = require('../model/account');
    var jwt = require('jsonwebtoken'); //jwt
    var config = require('../config');

    // 验证用户 Token
    this.checkToken = function (req, res, next) {
        // 用户登录、注册无需验证
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
    }

    // 账号注册
    this.registry = function (req, res, next) {
        // 验证逻辑：是否重复注册，验证码是否校验成功，密码是否符合规范，手机号是否符合规范，随机分配昵称
    }

    // 账号登录
    this.login = function (req, res, next) {

        var tel = req.body.username;
        var password = req.body.password;  // 接收时已加密

        if (tel == '' || password == '') {
            //util.send(400, '用户名或密码不能为空');
        }

        Account.findOne({tel: tel, password: password}, function (err, doc) {
            if (err) { // 登录失败，返回错误信息

            } else { // 登录成功，返回 token
                var token = setToken(doc);
                res.send({'token': token});
            }
        });
    }

    // 生成 token 并设置用户 token 缓存
    function setToken(user) {
        // token 生成
        var token = jwt.sign(user, config.secret, {
            expiresIn: 1200
        });
        return token;
    }
}

module.exports = new accountController();