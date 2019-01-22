function accountController()
{
    var jwt = require('jsonwebtoken'); //jwt
    var crypto = require('crypto'); //crypto

    var config = require('../config');
    var con = require('../const');
    var base = require('./baseController');
    var Account = require('../model/account');

    // 账号注册
    this.registry = function (req, res, next) {
        // 验证逻辑：是否重复注册，验证码是否校验成功，密码是否符合规范，手机号是否符合规范，随机分配昵称
        var tel = req.body.tel;
        var password = req.body.password;
        var code = req.body.code;

        Account.findOne({tel: tel}, function (err, doc) {
            if (err) {
                console.log(err);
            } else if (!doc) {
                // 验证码验证处理
                if (checkRegisterCode(tel, code)) { //验证通过
                    password = entryptPassword(password);
                    var accountModel = new Account({
                        tel: tel,
                        password: password
                    });
                    accountModel.save(function (err, account) {
                        if (err) { // 注册失败
                            base.returnError(
                                res,
                                con.HTTP_CODE_SERVER_ERR,
                                con.HTTP_CODE_SERVER_ERR,
                                "注册失败"
                            );
                        } else {
                            base.returnSuccess(res);
                        }
                    });
                } else { //验证不通过
                    base.returnError(
                        res,
                        con.HTTP_CODE_CILENT_ERR,
                        con.HTTP_CODE_CILENT_ERR,
                        "验证码错误"
                    );
                }
            } else {
                // 账号已注册
                base.returnError(
                    res,
                    con.HTTP_CODE_CILENT_ERR,
                    con.HTTP_CODE_CILENT_ERR,
                    "用户已注册"
                );
            }
        })
    }

    // 账号登录
    this.login = function (req, res, next) {

        var tel = req.body.name;
        var password = req.body.password;  // 接收时已加密
        password = entryptPassword(password);

        if (tel == '' || password == '') {
            base.returnError(
                res,
                con.HTTP_CODE_CILENT_ERR,
                con.HTTP_CODE_CILENT_ERR,
                "账号或密码不能为空"
            );
        }

        console.log({tel: tel, password: password});

        Account.findOne({tel: tel, password: password}, function (err, doc) {
            if (err) {
                base.returnError(
                    res,
                    con.HTTP_CODE_SERVER_ERR,
                    con.HTTP_CODE_CILENT_ERR,
                    "服务器错误"
                );
            } else {
                if (doc) {
                    // 登录成功
                    var token = setToken(doc);
                    base.returnSuccess(res, {'token': token});
                } else {
                    // 账号或密码错误
                    base.returnError(
                        res,
                        con.HTTP_CODE_CILENT_ERR,
                        con.ERR_CODE_LOGIN_INFO,
                        "账号或密码错误"
                    );
                }
            }
        });
    }

    // 生成 token 并设置用户 token 缓存
    function setToken(user) {
        // token 生成
        var accessToken = jwt.sign(user.toJSON(), config.secret, {
            expiresIn: 1200
        });
        return accessToken;
    }
    
    // 验证码验证
    function checkRegisterCode(tel, code) {
        return true;
    }

    // 密码加密
    function entryptPassword(password) {
        var salt = config.salt;
        var saltPassword = password + salt; // 加盐
        var md5 = crypto.createHash('md5');
        var result = md5.update(saltPassword).digest('hex');
        return result;
    }
}

module.exports = new accountController();