var express = require('express');

// express()相當於http.createServer();
var app = express();


// 相當於server.on('request',function(req,res){});
// 當服務器收到 get請求 / 的時候, 執行回調函數
app.get('/', function(req, res) {
    // res.send() 相當於res.write() res.end()
    res.send('hello express!');

});

app.get('/about', function(req, res) {
    // res.send() 相當於res.write() res.end()
    res.send("hello express! 我是 about");
    // express會幫我們 處理好Content-Type和charset,text/type 的問題
    // 不用寫 res.setHeader('Content-Type', 'text/plain or img or html; charset=utf-8');
    // f12 Network內 Response Header 會多了兩行
    // ETag: W/"1b-0o4L+S0zKdNQb6ThKMGGWxLmujI"
    // X-Powered-By: Express
});

// express 公開指定靜態資源路徑
// 只要這樣做, 就可以直接通過 /public/xxx 的方式訪問 public 目錄中的資源了
// app.use與express.static的結合使用  這里的app是server
// app.use([path,] callback [, callback...])   path是url路徑
// express.static(root, [options])             root 是由app.js開始的路徑
app.use('/public/', express.static('./public/'));

// app.use(express.static('./public/')); 
// 如果省略第一個參數, 則可以通過 省略以上路徑(/public/)的方式訪問到資源
app.use(express.static('./testPublic'));
// 如果express.static的省略後路徑和文件名完全相同,由於代碼由上跑到下,會先查找到上方優先的代碼路徑的文件
app.use(express.static('./public/'));
// express.static 寫的是 root directory 所以 可以省略./  root directory是 由app.js開始的路徑


// 必須是 /a/ 開頭 再省略public/ 的路徑來訪問資源
app.use('/a/', express.static('./public/'));

// ***app.use結合 express.static 的意思是
// 只要路徑是[path] argument, 
// 就放開+根據path訪問express.static內的root directory,
// 以root directory路徑開始的文件,
// 而且root directory不用再在path(reqest.url)上寫了


// 推荐
// app.use(‘/public/’,express.static(‘./public/’)); 這種寫法


// 相當於server.listen()
app.listen(3000, function() {
    console.log('express server is running...');
});