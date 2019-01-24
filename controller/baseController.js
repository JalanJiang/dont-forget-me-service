function baseController() {

    // 成功返回数据
    this.returnSuccess = function (res, data) {
        res.send(data);
    }

    // 失败返回数据
    this.returnError = function (res, httpCode, errCode, errMessage) {
        res.status(httpCode); // set http-code
        res.send({code: errCode, err_message: errMessage});
    }
}

module.exports = new baseController();