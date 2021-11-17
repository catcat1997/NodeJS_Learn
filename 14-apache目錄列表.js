var http = require('http');
var fs = require('fs');
var server = http.createServer();

var wwwDir = 'D:/html+css/NodeJS Learn/resource'

server.on('request', function(req, res) {
    var url = req.url;
    fs.readFile('./resource/www-template.html', function(err, data) {
        if (err) {
            return res.end(err);
        }
        fs.readdir(wwwDir, function(err, files) {
            if (err) {
                return res.end('Cannot find wwwDir');
            }

            // 2.1 生成需要替換的內容
            var content = "";
            files.forEach(function(item) {
                // ${} 可以引用變量
                content += `
                <tr>
                    <td data-value="hello.txt"><a class="icon file" draggable="true" href="/D:/html+css/NodeJS%20Learn/resource/hello.txt">${item}</a></td>
                    <td class="detailsColumn" data-value="9">9 B</td>
                    <td class="detailsColumn" data-value="1633089737">2021/10/1 下午8:02:17</td>
                </tr>
                `;
            });
            // 2.3  替換
            data = data.toString();
            data = data.replace('replacement', content);
            console.log(files);
            // 3.發送(解析+替換之後的)響應respone
            // 這個response的data要放在readdir內,
            res.end(data);
            // console.log(data);
        });
        console.log(data.toString());
        // readdir外的data會沒有換成content
        // readdir外和內的data是不同的。 深拷貝的存在。
        // ***由於調用readdir方法時沒有把data放到參數內,所以內外的data是深拷貝,不同的存在。
    });
    // 1.如何得到 wwwDir目錄列表中的文件名和目錄名
    //   fs.readdir
    // 2.如何將得到的文件名和目錄名替換到 www-template.html中
    //   模板引擎
    //   2.1在www-template.html中 預留需要替換的位置一個特殊標記(之後用data=data.replace()替換內容)
    //   2.2 根據files生成需要的html內容

});

// 綁定端口號,啟動服務
server.listen(3000, function() {
    console.log('server is running...');
});