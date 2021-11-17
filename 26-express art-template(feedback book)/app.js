const { log } = require('console');
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser')

var app = express();

var comments = [{
        name: '張三1',
        message: '大家好!',
        dateTime: '2015-10-06'
    }, {
        name: '張三2',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三3',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三4',
        message: '大家好!',
        dateTime: '2015-10-06'
    },
    {
        name: '張三5',
        message: '大家好!',
        dateTime: '2015-10-06'
    }
];

// 開放資源
app.use('/public', express.static('./public/'));

// 配置使用 express中的art-template模板引擎
// 第一個參數, 表示, 當渲染以 .art結尾的文件時,使用art-template模板引擎  也可以改成.html
// express-art-template是專門用來在 express中把art-template整合到 express中的
// 雖然外面這里不需要加載 art-template 但是也必須安裝
// 因為 express-art-template 依賴了 express-art-template
// npm install --save express-art-template
// express-art-template 與art-template 是不同的!!!
app.engine('html', require('express-art-template'));

// express為response 增加了一個方法: render
// render本身是不可用的, 但如果配置了 express-art-template 就可以使用了
// response.render('html模板名', {模板數據});  .html要改成.art
// render的第一個參數不能寫路徑, express art template會默認去 views目錄中查找模板文件
// 也就是說我們要開一個views 再放 需要渲染的文件到里面

// 如果想要重寫 views路徑
// app.set('views', 想要修改render函數的默認路徑);


app.get('/', function(req, res) {
    // res.render 要有express-art-template 才可以使用的 api
    res.render('index.html', {
        comments: comments
    });
    // fs.readFile('./views/index.html', function(err, data) {
    //     res.end(data);
    // });
});



app.get('/index.html', function(req, res) {
    res.render('index.html', {
        comments: comments
    });
});

app.get('/post', function(req, res) {
    res.render('post.html');
});

// body-parser配置
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())


// method用post, action就不用轉url地址(到/postComment)了 -
//  <form action="/post" method="post">
app.post('/post', function(req, res) {
    // console.log('success');
    // request.query 只能拿到 get 的請求參數
    // 我們用第三方包 body-parser
    var newComment = req.body;
    newComment.dateTime = new Date().toString();
    comments.unshift(newComment);
    res.redirect('/');

});

// app.post('/post', function(req,res) { 就不需要 /postComments了
// app.get('/postComments', function(req, res) {
//     // console.log(req.query);
//     var newComment = req.query;
//     newComment.dateTime = new Date().toString();
//     comments.unshift(newComment);
//     // 重定向
//     // res.statusCode= 302;
//     // res.setHeader('Location','/');
//     // 也可以用response.redirect('req.url');
//     res.redirect('/');
// });


app.listen(5000, function() {
    console.log('express server is running...');
});