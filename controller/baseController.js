function baseController() {

    var err = require('../config/err');
    // 成功返回数据
    this.returnSuccess = function (res, data) {
        res.send(data);
    }

    // 失败返回数据
    this.returnError = function (res, httpCode, errMessage, errCode) {
        res.status(httpCode); // set http-code

        if (errCode === undefined) {
            errCode = httpCode;
        }

        if (errMessage === undefined) {
            errMessage = err.message[errCode];
        }
        res.send({code: errCode, err_message: errMessage});
    }
}

module.exports = new baseController();