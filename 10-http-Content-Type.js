var http = require('http');

var server = http.createServer();

server.on('request', function(req, res) {
    // 在服務端默認發送的數據, 其實是 utf8 編碼的內容
    // 但是瀏覽器不知道是 utf8 編碼的內容
    // 瀏覽器在不知道服務器響應內容的編碼的情況下, 會按照當前操作系統的默認編碼去解析
    // 中文操作系統默認是 gbk編碼
    // 解決方法: 告訴瀏覽器 我們發給你的內容是utf8編碼
    // 利用respone.setHeader('name','value')

    var url = req.url;

    if (url === '/plain') {
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('here is這裡是: ' + req.url);
    } else if (url === '/html') {
        // 瀏覽器會自動解析 html標簽
        // 在Content-Type中 如果要解析html 就要用text/html
        // text/plain 普通文件
        // text/html 超文件
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<p>hello html <a href="">google</a></p>');
    }
});

server.listen(3000, function() {
    console.log('server is start running...');
    console.log('server is http://127.0.0.1:3000');
});