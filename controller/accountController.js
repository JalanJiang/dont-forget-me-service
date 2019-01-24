function accountController()
{
    var jwt = require('jsonwebtoken'); //jwt
    var crypto = require('crypto'); //crypto

    var config = require('../config');
    var error = require('../config/err');
    var base = require('./baseController');
    var nickname = require('./nicknameController');
    var Account = require('../model/account');
    var User = require('../model/user');

    // 账号注册
    this.registry = function (req, res, next) {

        var tel = req.body.tel; //@todo 手机号格式验证
        var password = req.body.password; //@todo 密码格式验证
        var code = req.body.code;

        Account.findOne({tel: tel}, function (err, doc) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_SERVER_ERR
                );
            } else if (!doc) {
                // 验证码验证处理
                if (checkRegisterCode(tel, code)) { //验证通过
                    password = entryptPassword(password);
                    var accountModel = new Account({
                        tel: tel,
                        password: password,
                        //nickname: nickname.getNickname()
                    });
                    // 创建账号
                    accountModel.save(function (err, account) {
                        if (err) { // 注册失败
                            base.returnError(
                                res,
                                error.code.HTTP_CODE_SERVER_ERR,
                                "注册失败"
                            );
                        } else {
                            // 创建成功
                            var userModel = new User({
                                uid: account._id,
                                nickname: nickname.getNickname()
                            });
                            userModel.save(); //在用户表创建一个相关用户，给予随机昵称
                            base.returnSuccess(res);
                        }
                    });
                } else { //验证不通过
                    base.returnError(
                        res,
                        error.code.HTTP_CODE_CILENT_ERR,
                        error.code.ERR_CODE_ACCOUNT_REGISTER_INVALID_CODE
                    );
                }
            } else {
                // 账号已注册
                base.returnError(
                    res,
                    error.code.HTTP_CODE_CILENT_ERR,
                    error.code.ERR_CODE_ACCOUNT_REGISTER_ALREADY
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
                error.code.HTTP_CODE_CILENT_ERR,
                "账号或密码不能为空"
            );
        }

        console.log({tel: tel, password: password});

        Account.findOne({tel: tel, password: password}, function (err, doc) {
            if (err) {
                base.returnError(
                    res,
                    error.code.HTTP_CODE_SERVER_ERR
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
                        error.code.HTTP_CODE_CILENT_ERR,
                        error.code.ERR_CODE_ACCOUNT_LOGIN
                    );
                }
            }
        });
    }

    // 生成 token
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