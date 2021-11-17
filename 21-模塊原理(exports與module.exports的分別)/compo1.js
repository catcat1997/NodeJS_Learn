// 在node中,每個模塊都有一個自己的module對象
// 該module對象中,有一個成員叫exports 也是一個對象

// var module = {
//     exports:{

//     }
// }

// 默認在代碼的最後有一句 return module.exports;
// 也就是說
// a. exports.foo = 'bar';
// b. module.exports.foo = 'bar';
// a和b的寫法都一樣的
// a寫法是簡便寫法, b寫法是正真的代碼

console.log(exports === module.exports); // true

// 但如果寫死module.exports = 'abcStr'
// module.exports對象就被蓋過寫死了 由空對象 null Object 變成了 字符串String=
// module.exports = 'abc';
// console.log(module.exports);

// 如果是exports = 'abcStr' 就不同了
// ***一定要記往, 最後return的是 module.exports 不是exports
// 所以如果我們給exports 重新賦值不管用

exports.a = 123;
// 這個exports = {} 沒有return到module.exports 所以下面的exports.b 也沒有了
// 淺拷貝後重新賦值, 但exports走向了新的地址, 不再是引用module.exports了 (可查看淺拷貝後重新賦值.js)
exports = {};
exports.b = 456;
// 這裡用回正確寫法才有效, 上面因為exports = {}; 使簡易寫法失效了
module.exports.c = 789;

// 同理, 如果給module.exports重新賦值, module.exports的地址也會改, exports也就不再與module.exports相同了
// 原理: 一開始module.exports 與 exports 都是指向0x1600。無論誰重新賦值,都會使指向的地址改變

// 我們也可以手動使它們兩個指向同一地址 重新設定回來 module.exports = exports;

// 最安全寫法:
// 不要寫複蓋 exports 和module.exports的寫法:
// 不要寫: exports = xxx;
// 不要寫 module.exports = xxx;

// 不要去重新賦值!!!!******

// 好的寫法: exports.xxx = xxx;
// 好的寫法: module.exports.xxx = xxx;