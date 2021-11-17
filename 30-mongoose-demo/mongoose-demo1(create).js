const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


// 創建一個模型
// 設計數據庫 Cat
// mongoose.model(modelName, schema):
const Cat = mongoose.model('Cat', { id: Number, name: String });

// 實例化一(100)個 Cat 
for (let i = 1; i < 101; i++) {
    let kitty = new Cat({ id: i, name: '喵喵' });
    // 持久化保存 kitty
    kitty.save().then(() => console.log('meow'));
}