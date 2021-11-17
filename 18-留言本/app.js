// application 應用程序

var http = require('http');
var fs = require('fs');
var template = require('art-template');
var url = require('url');
// url模塊可以用來解析url


var comments = [{
        name: '張三1',
        message: '大家好!',
        dateTime: '2015-10-06'
    }, {
        name: '張三2',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三3',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三4',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三5',
        message: '大家好!',
        dateTime: '2015-10-06'
    }
];
// 為了方便的統一處理這些靜態資源, 所以我們約定把所有的資源都放在public 目錄中

// var server = http.createServer();
// server.on('request', function(req,res) {});
// server.listen(3000, function() {
//     console.log('server is running...');
// });

// 以上為正常寫法(server.on), 以下為簡寫法

http.
createServer(function(req, res) {
        // 使用url.parse方法將路徑解析為一個方便操作的對象, 第二個參數true表示直接將查詢字符串轉為一個對象(通過query屬性來訪問)
        // 解析 req.url做parseObj
        var parseObj = url.parse(req.url, true);
        // 單獨獲取不包含查詢字符串的路徑部分(不包含?之後的內容)
        var pathname = parseObj.pathname;
        // var url = req.url;   req.url我們換做pathname用
        if (pathname === '/' || pathname === '/index.html') {
            fs.readFile('./views/index.html', function(err, data) {
                if (err) {
                    return console.log('404 Not Found.');
                }
                // 為了讀{{each comments}} art-template語法 把data轉為htmlStr 利用template.rend
                var htmlStr = template.render(data.toString(), {
                    comments: comments
                });
                res.end(htmlStr);
                // 需要操作字符串時才需要轉string data.toString();
            });
            // *****由於訪問靜態資源的lnik會是127.0.0.1:3000/path,會訪問不了,所以我們要統一處理可以訪問的靜態資源*****
            // 即使 href="../public/css/bootstrap.css" 
            // 會請求成 https://127.0.0.1:3000/public/css/bootstrap.css   (../會自動去除)
        } else if (pathname.indexOf('/public/') === 0) {
            // 統一處理public為可訪問資源   這個if是: 如果/public/ 是在第0位index (放在開頭),就fs.readFile
            // var.indexOf('x') 是返回字符串x中首次出現位置索引
            // 統一處理:
            //  如果請求路徑是以 /public/ 開頭的, 則我認為你要獲取 public中的某個資源
            //  所以我們就直接可以***把請求路徑當作文件路徑來直接進行讀取***
            fs.readFile('.' + pathname, function(err, data) {
                if (err) {
                    return res.end('reading public failed');
                }
                res.end(data);
            });
        } else if (pathname === '/post') {
            fs.readFile('./views/post.html', function(err, data) {
                if (err) {
                    return res.end(err);
                }
                res.end(data);
            });
        } else if (pathname === '/postComments') { // 以/postComments為開頭?為結尾的req.url
            // pathname不包含 ?之後的路徑
            // console.log('收到表單請求了', parseObj.query);
            // 一次請求對應一次響應, 響應結束 response.end()只能有一次
            // res.end(JSON.stringify(parseObj.query));
            // 之後需要:
            //  1.獲取表單提交的數據 parseObj.query
            //  2.生成時間date到數據對象中,再儲存到數組中
            //  3.使用戶重定向轉跳到首頁
            //      當用戶重新請求 / 的時候, 的數組中的數據發生了變化, 所以用戶看到新的留言
            var comment = parseObj.query;
            comment.dateTime = new Date().toString();
            comments.unshift(comment);
            // 轉跳到首頁(通過服務器讓容戶端重定向)
            //  1.狀態碼設置為302 臨時重定向
            // 利用response.statusCode
            //  2.在響應頭中通過 Location 告訴客戶端往那重定向
            // 利用response.setHeader()
            // 如果客戶端發現收到服務器的響應狀態碼是302 就會自動去響應頭中找Loaction, 然後對該地址重新發起新的請求, 所以就能看到客戶端自動跳轉了
            res.statusCode = 302;
            res.setHeader('Location', '/');
            // res.setHeader('Location', 'http://127.0.0.1:3000/'); //也可以
            // res.end(JSON.stringify(parseObj.query)); // 記得結束響應 response.end();
            res.end();
        } else {
            fs.readFile('./views/404.html', function(err, data) {
                if (err) {
                    return res.end(err);
                }
                res.end(data);
            });
        }

    })
    .listen(5000, function() {
        console.log('server is running...');
    });