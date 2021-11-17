var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

var wwwDir = 'D:/html+css/NodeJS Learn/resource'

server.on('request', function(req, res) {

    fs.readFile('./resource/www-template(art-template).html', function(err, data) {
        if (err) {
            return res.end(err);
        }
        fs.readdir(wwwDir, function(err, files) {
            if (err) {
                return res.end('Cannot find wwwDir');
            }
            // 這裡只需要使用模板引擎 解析替換 data中的模板字符串就可以了
            // 之後去www-template 加入模板字符串就好了 {{files}}
            var htmlStr = template.render(data.toString(), {
                files: files
            });
            res.end(htmlStr);
        });

    });
});
// 綁定端口號,啟動服務
server.listen(3000, function() {
    console.log('server is running...');
});