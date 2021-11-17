var http = require('http');
var fs = require('fs');

var server = http.createServer();

server.on('request', function(req, res) {
    var url = req.url;
    // ./resource/index.html
    if (url === '/') {
        // 我們想發送index.html

        // 利用fs模塊 讀resource下的index.html
        fs.readFile('./resource/index.html', function(err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('文件讀取失敗!');
            } else {
                res.setHeader('Content-Type', 'text/html; charset=utf-8');
                // data默認是二進制, 可以通過.toString()轉為字符串
                // res.end() 支持兩種數據類型, 一種是二進制, 一種是字符串

                res.end(data);
            }
        });
    } else if (url === '/landscape.jpg') {
        // url: 統一資源定位符
        // 一個url最終是要對應到一個資源的
        fs.readFile('./resource/landscape.jpg', function(err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                res.end('文件讀取失敗!');
            } else {
                // 讀取jpg文件的Content-Type是  image/jpeg
                // 圖片就不需要 只定編碼了 可以不寫charset
                res.setHeader('Content-Type', 'image/jpeg;');

                res.end(data);
            }
        });
    }
});

server.listen(3000, function() {
    console.log('server is start running...');
    console.log('server is http://127.0.0.1:3000');
});