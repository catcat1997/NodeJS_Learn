var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongoDB-crud-system');

var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1], // 限制只可以是數字 0或1
        default: 0
    },
    age: {
        type: Number,
    }
});

// 直接導出模型構造函數
module.exports = mongoose.model('Student', StudentSchema);