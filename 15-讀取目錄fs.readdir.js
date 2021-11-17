var fs = require('fs');
fs.readdir('D:/html+css/NodeJS Learn', function(err, files) {
    if (err) {
        return console.log('目錄不存在');
    } else {
        console.log(files);
    }
});

// fs.readdir 返回一個數組, 數組內存有目錄列表