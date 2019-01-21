function baseController() {

    this.returnSuccess = function (res, data) {
        res.send(data);
    }

    this.returnError = function (res, httpCode, errCode, errMessage) {
        res.status(httpCode);
        res.send({code: errCode, err_message: errMessage});
    }
}

module.exports = new baseController();