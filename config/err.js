module.exports = Object.freeze({
    code: {
        HTTP_CODE_SERVER_ERR: 500,
        HTTP_CODE_CILENT_ERR: 400,

        // 错误码定义：3位http错误码+2位业务编号+3位业务错误编码
        ERR_CODE_ACCOUNT_REGISTER_INVALID_CODE: 40101001,
        ERR_CODE_ACCOUNT_LOGIN: 40101002, //账号或密码错误
        ERR_CODE_ACCOUNT_REGISTER_ALREADY: 40101003, //用户已注册
        ERR_CODE_ACCOUNT_TOKEN_VALID: 40101004 //token无效
    },
    message: {
        400: "上报参数有误",
        500: "服务器错误",
        40101001: "验证码错误",
        40101002: "账号或密码错误",
        40101003: "该账号已存在",
        40101004: "token 无效"
    }
});