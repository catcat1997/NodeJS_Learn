var fs = require('fs');

// 原理寫法: module.exports = function(app) {
// router.js 作用是導出一個function給app.js用 (單一導出) 
// module.exports = function(app) {

//     app.get('/', function(req, res) {
//         // fs.readfile 的第二個參數(optional),傳入utf8 告訴fs把讀取到的文件直接轉換做utf8編碼
//         // 這相同於data.toString();
//         fs.readFile('./db.json', 'utf-8', function(err, data) {
//             if (err) {
//                 return res.status(500).send('failed to load database');
//             }
//             res.render('index.html', {
//                 fruits: [
//                     'apple',
//                     'banana',
//                     'orange',
//                     'melon'
//                 ],
//                 // JSON.parse() 方法将数据转换为 JavaScript 对象。
//                 // JSON.parse() 將讀取到的文件數據轉換javascript 對象
//                 students: JSON.parse(data).students,
//                 // db.json內 有一個對象, 這個對象內的students對象才是我們要的
//             });

//         });
//     });
// };

// 以上的方法是原理, 但不方便
// express提供了 Router方法,用來包裝路由
var express = require('express');
var Student = require('./students.js');

// 利用express.Router() 寫法:
// 1.創建一個express路由容器
var router = express.Router();
// 2.把路由都掛載到 router 路由容器中
router.get('/', function(req, res) {
    // fs.readfile 的第二個參數(optional),傳入utf8 告訴fs把讀取到的文件直接轉換做utf8編碼
    // 這相同於data.toString();
    fs.readFile('./db.json', 'utf-8', function(err, data) {
        if (err) {
            return res.status(500).send('failed to load database');
        }
        res.render('index.html', {
            fruits: [
                'apple',
                'banana',
                'orange',
                'melon'
            ],
            // JSON.parse() 方法将数据转换为 JavaScript 对象。
            // JSON.parse() 將讀取到的文件數據轉換javascript 對象
            students: JSON.parse(data).students,
            // db.json內 有一個對象, 這個對象內的students對象才是我們要的
        });

    });
});

// 同 '/'為首頁
router.get('/students', function(req, res) {

    Student.find(function(err, data) {
        if (err) {
            return res.status(500).send('server error.');
        }
        res.render('index.html', {
            fruits: [
                'apple',
                'banana',
                'orange',
                'melon'
            ],
            students: data,
        });
    });

});

// new
router.get('/students/new', function(req, res) {
    res.render('new.html');
});
router.post('/students/new', function(req, res) {
    // 1.獲取表單數據 (req.body)
    // var new_data = req.body;

    // 2.處理 (保存到db.json文件中用以持久化) 
    // 先讀取db.json數據轉成對象
    // push數據
    // 把對象轉為字符串
    // 把字符串writeFile到文件中
    // fs.readFile('./db.json', function(err, data) {
    //     if (err) {
    //         return res.end('failed to connect to db.json');
    //     }
    //     // 先讀取db.json數據轉成對象
    //     var db_data = JSON.parse(data);

    //     // 給數據加id
    //     var last_id = db_data.students[(db_data.students.length - 1)].id;
    //     new_data.id = last_id + 1;
    //     // push數據
    //     db_data.students.push(new_data);
    //     // 把對象轉為字符串
    //     db_data = JSON.stringify(db_data);
    //     // 把字符串writeFile到文件中
    //     fs.writeFile('./db.json', db_data, function(err) {
    //         if (err) {
    //             return console.log('文件寫入失敗!');;

    //         }
    //         console.log('文件寫入成功!');
    //     });
    // });

    //  調用save()
    // 傳new_data參(也可以直接傳req.body) 到save函數
    Student.save(req.body, function(err) {
        if (err) {
            // 如果有err 會傳err參數過來callback
            res.status(500).send('Server Error');
            return console.log('文件讀取/寫入失敗');
        }
        console.log('文件寫入成功');
        res.redirect('/students/');
    });
    // 3.發送response 重定向
    // res.redirect('/students/');

});

// Student.update({
//     id: 15,
//     name: '15csscc',
//     gender: 2,
//     age: 350
// }, function(err) {
//     if (err) {
//         return console.log('修改數據失敗!');
//     }
//     console.log('修改數據成功!');
// });

// edit
router.get('/students/edit', function(req, res) {
    // <a href="/students/edit?id={{ $value.id}}">edit</a> 路徑?後的不會當做url路徑,
    // 而是query參數,所以還是get到'/students/edit'
    // console.log(req.query.id);

    Student.findById(parseInt(req.query.id), function(err, objStudent) {
        if (err) {
            return res.status(500).send('server error');
        }

        // console.log(objStudent);
        res.render('edit.html', {
            student: objStudent
        });
    });

});
router.post('/students/edit', function(req, res) {
    // 1.獲取數據 req.bodu
    // 2.更新數據 調用update()
    // 3.重定向
    // console.log(req.body);
    Student.update(req.body, function(err) {
        if (err) {
            return res.status(500).send('server error');
        }
        console.log('更新數據成功!');
        res.redirect('/students');
    });
});
// delete
router.get('/students/delete', function(req, res) {
    console.log(req.query.id);
    Student.delete(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('server error');
        }
        console.log('刪除數據成功!');
        res.redirect('/students');
    });
});

// 3.把router導出  (單一導出)
module.exports = router;