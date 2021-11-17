require('./a');
var fn = require('./b');

fn.fn();
// console.log(fn.fn()); 如果這樣寫 會多返回一個undefined

// 結果 console.log('b.js被加載了'); 只會加載一次 因為在a.js中加載了b.js 所以main.js內的require('./b')不會再執行一次

// main.js的require('./b')可以拿到b.js的接口對象,但不會再執行一次

// node不會重新加載, 提高樸塊加載效率