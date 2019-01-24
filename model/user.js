var mongoose = require('mongoose');
var timestamp = require('mongoose-timestamp');

var userSchema = new mongoose.Schema(
    {
        uid: { // 用户 uid
            type: String,
            required: true
        },
        avatar: { // 头像
            type: String,
            default: ""
        },
        description: { // 个人简介
            type: String,
            default: ""
        },
        nickname: { // 昵称
            type: String,
            required: true
        }
    }
);

userSchema.plugin(timestamp);

var collectionName = 'user';
var user = mongoose.model(collectionName, userSchema);
module.exports = user;