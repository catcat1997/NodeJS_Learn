const mongoose = require('mongoose');

// 1.連接數據庫
// mongoose.connect('mongodb://localhost:27017/想要連接的數據庫名稱,沒有也可以');
mongoose.connect('mongodb://localhost:27017');

// 2.設計Schema
// 設計文檔結構 Schema
// const { Schema } = mongoose; 
// 相當於 var Schema = mongoose.Schema;
// 是es6 解析賦值  ES6 destructuring assignment
// 把mongoose對象內的mongoose.Schema解析成  變量名為 Schema

// 原寫法(沒有解析賦值下)
// const userSchema = new mongoose.Schema({
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

// 3.創建mongoose.model  (將文檔結構 發布為 模型)
// mongoose.model(modelName, schema);
// 也可以直接在參數內寫schema, 但現在我們上面寫好了schema
// ***第一個參數modelName
// modelName會自動將 大寫開頭的名稱 轉為 小寫複數(s) 的集合名
// 例如 Cat 會變做 cats, User 變做 users集合名
// 第二個參數 schema架構
// 返回值: 模型構造函數

const User = mongoose.model('User', userSchema);

// 4.有了模型構造函數之後,就可以進行 crud了
// 現在我們(增) create   利用save()

var admin = new User({
    username: 'peter444',
    password: 'a4444',
    email: 'peter1234@admin.com'
});

admin.save().then(() => { console.log('user數據保存成功!'); });