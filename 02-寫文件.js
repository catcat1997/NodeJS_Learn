var fs = require('fs');

// 寫文件 fs.writeFile()
// 第一個參數,要寫入的文件路徑 (如果沒有這文件,會自動創建)
// 第二個參數, 寫入的文件的內容
// 第三個參數, 回調函數(error) 只有error  如果寫入成功 error = null;
fs.writeFile("./data/你好.md", '寫一寫你好!', function(error) {
    if (error) {
        console.log('文件寫入失敗');
        return;
    }
    console.log('文件寫入成功!');
});