// 引入package模塊

// require是一個方法, 作用就是用來加載模塊
// 在 node中,模塊有3種:
//      具名的核心模塊, 例如fs http
//      用戶自己編寫的文件模塊

// 相對路徑必須加 ./
// 引入模塊時可以不寫後綴名
// require('./b'); 是可以引入到b.js的
console.log('a.js開始執行...');
// 
require('./b.js');
// 會跑b.js 
console.log('a.js執行結束!');

// 在node中,沒有全局作用域, 只有模塊作用域
//  不同的模塊下,互相都訪問不了

function add(x, y) {
    return x + y;
}

var foo = 'aaa'
    // 在b.js 也有foo = 'bbb',   在瀏覽器跑js時, bbb會複蓋aaa, 但node只有模塊作用域 所以不會複蓋
console.log('foo的值是: ' + foo);