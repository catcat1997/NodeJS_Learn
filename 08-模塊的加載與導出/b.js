var foo = 'bbb';

// exports.foo = 'hello';
console.log(exports);
// 現在exports是空對象 {}

exports.fob = 'hello';
// exports對象內會出現 鍵foo 值 'hello'}
// { foo : 'hello' }

exports.foo = foo;

exports.add = function(x, y) {
    return x + y;
}