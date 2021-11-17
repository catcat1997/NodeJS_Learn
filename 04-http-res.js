var http = require('http');


const server = http.createServer();

// request 請求事件處理函數 需要接收兩個參數
//      Requset 請求對象
//          請求對象可以用來獲取客戶端的一些請求信息, 例如請求路徑
//      Response 響應對象
//          響應對象可以用來給客戶端發送響應消息
server.on('request', function(request, response) {
    // 127.0.0.1:3000 (request.url  = /)
    // 127.0.0.1:3000/a (request.url  = /a)
    // 127.0.0.1:3000/foo/b  (request.url = /foo/b)
    console.log('收到客戶端的請求了! 請求路徑是: ' + request.url);


    // response.write()  response.end()
    // response 對象有一個方法: write 可以用來給客戶端發送響應數據
    // write可以使用多次, 但是最後一定要使用end 來結束響應, 否則客戶端會一直等待
    // response.write('hello');
    // response.write(' node.JS');
    // // 告訴客戶端, 我的話說完了, 可以呈送給用戶了
    // response.end();

    // 我們希望當請求不同路徑的時候響應不同的結果
    // 例如:
    // /index
    // /login 登錄
    // /register 注册

    switch (request.url) {
        case '/index':
            response.write('we are in index page');
            response.end();
            break;
        case '/login':
            response.write('we are in login page');
            response.end();
            break;
        case '/register':
            response.write('we are in register page');
            response.end();
            break;

    };
});


server.listen(3000, function() {
    console.log('服務器啟動成功, 可以通過http://127.0.0.1:3000/ 來進行訪問!');
});