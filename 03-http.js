// 用Node十分輕鬆地構建Web服務器

// Node中的一個核心模塊: http

// htpp模塊可以幫我們創建編寫服務器

// 1.引入模塊
var http = require('http');

// 2.使用http.createServer() 方法創建一個 web服務器
// http.createServer() 會返回一個server實例
const server = http.createServer();

// 3.服務器提供服務
// eg. 對數據的服務
//     發請求send request
//     接收請求
//     處理請求
//     發送響應respone
//     注册 request 請求事件
//     當客戶端請求過來, 就會自動觸發服務器的 request請求事件, 然後執行第二個參數: 回調處理函數
//     server.on() 就像btn.addEventListener()這樣的 監聽器
server.on('request', function() {
    console.log('收到客戶端的請求了!');
});

// 4.綁定端口號,啟動服務器  
// server.listen() 可以選擇性寫回調函數
// server.listen(3000);
server.listen(3000, function() {
    console.log('服務器啟動成功, 可以通過http://127.0.0.1:3000/ 來進行訪問!');
});

// 在cmd下, 指定好路徑,開啟這個js檔,就可以開啟服務器 (如果關了cmd盒子,服務器就關了)
// 在cmd下, 按Ctrl+C 可以關server  (會出現^C 說明關了server)