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
// 現在我們(刪) delete  利用.remove({conditions})

User.remove({ username: 'peter444' }).then(value => {
    console.log('successfully removed data!');
    User.find().then(value => {
        console.log('刪除後數據如下:');
        console.log(value);
    })
}, reason => {
    console.log(reason);
});