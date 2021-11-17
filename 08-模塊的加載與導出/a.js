// require方法有兩個作用:
//  1.加載文件模塊并執行里面的代碼
//  2.拿到被加載文件模塊導出(export)的接口對象

// 每個文件模塊中都提供了一個對象:exports
var b = require('./b');

// 我們要做的就是把所有需要被外部訪問的成員掛載到這個exports對象中
console.log(b);
// b就是 b.js內的exports

console.log(b.fob);

console.log(b.add(10, 20));