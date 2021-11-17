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
    var newStudent = new Student(req.body);
    newStudent.save().then(value => {
        console.log('文件寫入成功');
        console.log(value);
        res.redirect('/students/');
    }, reason => {
        res.status(500).send('Server Error');
        console.log('文件讀取/寫入失敗');
        return console.log(reason);
    });


});


// edit
router.get('/students/edit', function(req, res) {
    // <a href="/students/edit?id={{ $value.id}}">edit</a> 路徑?後的不會當做url路徑,
    // 而是query參數,所以還是get到'/students/edit'
    // console.log(req.query.id);

    Student.findById(req.query.id, function(err, objStudent) {
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
    // Student.update(req.body, function(err) {
    Student.findByIdAndUpdate(req.body.id, req.body, function(err) {
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
    Student.findByIdAndRemove(req.query.id, function(err) {
        if (err) {
            return res.status(500).send('server error');
        }
        console.log('刪除數據成功!');
        res.redirect('/students');
    });
});

// 3.把router導出  (單一導出)
module.exports = router;