const mongoose = require('mongoose');

// 1.連接數據庫
// mongoose.connect('mongodb://localhost:27017/想要連接的數據庫名稱,沒有也可以');
mongoose.connect('mongodb://localhost:27017');

const { Schema } = mongoose;
const userSchema = new Schema({
    username: {
        type: String, // name的類型 type
        required: true // required:true =>  name不能為空
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

const User = mongoose.model('User', userSchema);

// 4.有了模型構造函數之後,就可以進行 crud了
// 現在我們(查) retrieve 
// 模型名.find()  找 集合(模型類型) 下全部的 文檔
User.find().then((value) => {
    console.log(value);
}, reason => {
    console.log(reason);
});

// 根據條件retrive 模型名.find({條件})
User.find({ username: 'peter444' }).then(value => {
    console.log('success!');
    console.log(value);
}, reason => {
    console.log(reason);
});

// .findOne() 只找條件的第一個
User.findOne({ username: 'peter', email: 'peter1234@admin.com' }).then(value => {
    console.log('success!');
    console.log(value);
}, reason => {
    console.log(reason);
});