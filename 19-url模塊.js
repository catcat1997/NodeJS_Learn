var url = require('url');

var obj = url.parse('/postComments?name=123&message=12344', true);

// parse會把 name和message 解析出來做對象 放到query中
console.log(obj);
console.log(obj.query);