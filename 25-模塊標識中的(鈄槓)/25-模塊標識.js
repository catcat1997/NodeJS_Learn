// 25-模塊標識中的 / 
var fs = require('fs');

// 文件操作的API都是異步的, 就像ajax 請求一樣
// 文件操作中的相對路徑可以省略 ./
fs.readFile('data/a.txt', function(err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data.toString());
});

// 模塊標識
// 在模塊加載中, 相對路徑中的 ./ 不能省略
require('./data/foo.js');


// 如果fs.readFile('/data/a.txt', function(err, data) {
// 也會報錯, 因為 /  是由根目錄開始查找  C:/下沒有data這個file
// fs.readFile寫相對路徑時,  最好就加 ./