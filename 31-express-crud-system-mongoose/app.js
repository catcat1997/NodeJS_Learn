var express = require('express');
var fs = require('fs');
var router = require('./router.js');
var bodyParser = require('body-parser');



var app = express();

app.engine('html', require('express-art-template'));
app.use('/public/', express.static('./public/'));


// 注意: 模板引擎和 body-parser要放在router之前

// bodyParser配置
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
    // parse application/json
app.use(express.json())



// 原理寫法:使用router函數   
// 因為router.js寫成了一個function 參數是app, 我們這里就輸入參數app 就可以使用了
// router(app);

// 使用express router
// 把路由容器掛載到 app 服務中
app.use(router);

app.listen(3000, function() {
    console.log('server is running...');
});