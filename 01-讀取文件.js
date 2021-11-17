// Node沒有DOM BOM 所以就是沒有window,document等對象

// 瀏覽器中的javascript 沒有文件操作能力
// 但node中的javascript是 有文件操作能力

// fs = file-system 文件系統
// 我們要引入這個fs模塊
// fs這個核心模塊中,提供了所有文件操作的API
// 如:fs.readFile 就是用來讀取文件的
const { log } = require("console");
var fs = require("fs");

// fs.readFile  (常與async await的promise對象合并使用)
//  第一個參數是路徑
//  第二個參數是一個回調函數 (error / data)
//  如果讀取失敗 error就是錯誤對象 data是null , 如果讀取成功 error = null,  data就是內容;
fs.readFile('./被讀.md', function(error, data) {
    if (error) {
        console.log(error);
    } else {
        console.log(data.toString());
    }
});