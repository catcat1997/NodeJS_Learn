console.log('b.js被加載了!');
require('./c.js');
var foo = 'bbb';
// console.log(add(10, 20)); 
// 會報錯,因為node只有模塊作用域, b文件不能用a文件的function方法。


console.log('b.js執行結束!');