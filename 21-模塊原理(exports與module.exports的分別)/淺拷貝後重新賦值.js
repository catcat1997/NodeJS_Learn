var obj = {};
var obj1 = obj;

obj1.foo = 'bar';
console.log(obj);
console.log(obj1);
obj.foo = 'hello';
console.log(obj);
console.log(obj1);

console.log('//這裡開始就是新的地址,不再是引用地址了');
obj1 = {}; // 這裡開始就是新的地址,不再是引用地址了
obj1.foo = 'world';

console.log(obj);
console.log(obj1);