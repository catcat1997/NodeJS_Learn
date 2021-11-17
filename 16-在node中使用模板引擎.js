// eg. art-template
// art-template 是一個簡約、超快的模板引擎。它採用作用域預聲明的技術來優化模板渲染速度，從而獲得接近 JavaScript 極限的運行性能，並且同時支持 NodeJS 和瀏覽器。在線速度測試。

// 定好路徑後 npm install art-template

// 在node中使用 art-template模板引擎
// 模板引擎最早就是用於 服務器領域, 後來才發展到前端。

// 1.安裝好
// 2.在需要使用的文件模塊中加載 art-template
// node中加載,只需要用require方法加載
// 3.查文檔,使用模板引擎的API

var template = require('art-template');
var fs = require('fs');

// 這里不是瀏覽器,不能用 art-temaplte在brower中的api寫法
// template('script', {對象});

// 渲染模板
// var template = require('art-template');
// var html = template(__dirname + '/tpl-user.art', {
//     user: {
//         name: 'aui'
//     }
// });
// 核心方法
// // 基于模板名渲染模板
// template(filename, data);

// // 将模板源代码编译成函数
// template.compile(source, options);

// // 将模板源代码编译成函数并立刻执行
// template.render(source, data, options);

// var tplStr = `
// <!DOCTYPE html>
//         <html lang="en">

//         <head>
//             <meta charset="UTF-8">

//             <title>Document</title>
//         </head>

//         <body>
//             <!-- 在瀏覽器中需要引用template-web.js 這個文件 -->
//             <!--  type="text/javascript" 是跑javascript的意思 -->
//             <!-- 強調: 模板引擎不關心你的字符串內容是什麼, 只關心自己能認識的模板標記語法,
//                 例如: {{}} mustache語法 -->
//             <p>hello my name is {{name}}, </p>
//             <h1>I'm {{age}} years old, </h1>
//             <h2>I came from {{country}}.</h2>
//         </body>

//         </html>
//         `;
fs.readFile('./16.5-tpl.html', function(err, data) {
    if (err) {
        return console.log('readFile failed');
    }
    // readFile的data 是二進街, 所以要toString()
    let ret = template.render(data.toString(), {
        name: 'jack',
        age: '18',
        country: 'taiwan'
    });
    console.log(ret);
});

// let ret = template.render(tplStr, {
//     name: 'jack', 
//     age: '18',
//     country: 'taiwan'
// });
// let ret = template.render('hello {{ name }}', { name: 'jack' });
// console.log(ret);

// 模板的 {{xxx}} 可以理解為  data.replace( '{{xx}}' , replaceData ); 
// 如同14-apache的 ^_^ , data = data.replace('replacement', content);