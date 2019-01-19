var mongoose = require('../config/db').mongoose;
var mongooseStringQuery = require('mongoose-string-query');
var timestamp = require('mongoose-timestamp');

var bookSchema = new mongoose.Schema(
    {
        uid: { // 用户 uid
            type: String,
            required: true
        },
        name: { //名称
            type: String,
            required: true
        },
        description: { //描述
            type: String,
            required: true
        },
        cover: { //封面图
            type: String,
            required: true
        },
        is_private: { //是否私密，0-否，1-是
            type: Number,
            required: true,
            enum: [0, 1],
            default: 1
        }
    }
);

bookSchema.plugin(timestamp);
bookSchema.plugin(mongooseStringQuery);

var collectionName = 'book';
var book = mongoose.model(collectionName, bookSchema);
module.exports = book;