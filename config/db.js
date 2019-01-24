/*
* MongoDB 连接
* Time: 2019-01-18 11:38
* Author: Jalan
*/

var mongoose = require("mongoose");
var config = require("../config"); //配置文件

// 数据库连接
mongoose.connect(config.db.path, {useNewUrlParser: true});
var db = mongoose.connection;

// 事件监听：错误
db.on('error', function (err) {
    console.log('MongoDB connection error:' + err)
});

// 事件监听：成功
db.once('open', function () {
   console.log('MongoDB successfully open!');
});

exports.mongoose = mongoose;