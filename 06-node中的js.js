var os = require('os');
var path = require('path');


console.log(os.cpus()); // check your cpu
console.log(os.totalmem()); // check memeroy how many bytes


// path.extname extension name
// 參數：此方法接受單個參數路徑，該路徑包含用於提取擴展名的文件路徑。

// 返回值：它返回帶有路徑擴展部分的字符串。如果此參數不是字符串值，則拋出TypeError。
console.log('path.extname("D:/html+css/NodeJS Learn/00-helloworld.js")');
console.log(path.extname("D:/html+css/NodeJS Learn/00-helloworld.js"));
// 返回 .js 字符串