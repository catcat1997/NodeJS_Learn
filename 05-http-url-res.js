var http = require('http');

const server = http.createServer();

server.on('request', function(req, res) {
    console.log('收到請求, 路徑是: ' + req.url);
    // socket.remotePort 端口號
    // socket.remoteAddress 地址
    console.log('請求我的客戶端的地址+端口號是: ' + req.socket.remoteAddress + " " + req.socket.remotePort);

    // 可以直接res.end('寫內容');

    // 根據不同請求路徑 發送不同的響應
    // 1. 獲取請求路徑
    let url = req.url;
    // res.end(url);
    if (url === "/" | url === "/index") {
        res.end('index page');
    } else if (url === '/login') {
        res.end('login page');
    } else if (url === '/register') {
        res.end('register page');
    } else if (url === '/products') {
        var products = [{
                name: 'apple 13',
                price: 3999
            },
            {
                name: 'apple 14',
                price: 4999
            },
            {
                name: 'apple SE',
                price: 1999
            }
        ];

        // 響應內容只能是二進制數據 或 字符串
        // 不能是:
        //  數字,對象,數組,boolean值(都不可以)
        // res.end(123);  //會報錯,強制關了服務器

        // JSON.parse與JSON.stringify
        // JSON.parse
        // 我們可以利用JSON.stringify() 使數組,對象轉為字符串
        res.end(JSON.stringify(products));
    } else {
        res.end('404 Not Found.');
    };


});


// 端口號不要用80, 默認是被用了的
server.listen(30, function() {
    console.log('服務器啟動成功,可以訪問http://127.0.0.1:30/了');
});