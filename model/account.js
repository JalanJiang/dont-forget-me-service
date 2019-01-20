var mongoose = require('mongoose');
var mongooseStringQuery = require('mongoose-string-query');
var timestamp = require('mongoose-timestamp');

var accountSchema = new mongoose.Schema(
    {
        uid: { // 用户uid
            type: String,
            required: true
        },
        tel: { // 手机号（登录名）
            type: String,
            required: true
        },
        password: { // 密码（加盐加密）
            type: String,
            required: true
        }
    }
);

accountSchema.plugin(timestamp);

var collectionName = 'account';
var account = mongoose.model(collectionName, accountSchema);
module.exports = account;