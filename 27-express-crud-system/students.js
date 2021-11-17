//  操作文件中的數據, 只處理數據,不關心業務
// 封裝函數常常會出現 封裝異步api, 所以要用到大量callback回調函數
var fs = require('fs');


// crud方法api


var dbPath = './db.json'


// 獲取所有學生列表   ***readFile是異步任務, 如果封裝函數,要用callback回調函數 獲取數據***
module.exports.find = function(callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        }
        // JSON.parse(data).students;
        callback(null, JSON.parse(data).students);
    });
};

// callback中的參數
//  第一個參數err   成功是 null, 失敗是失敗對象
//  第二個參數data  成功是數組,  失敗是 null

// 使用find(): callback的 err和data是給回調函數 傳參 的
// find(function(err, data) {
// });

// 添加保存學生
module.exports.save = function(student, callback) {
    // 1.獲取表單數據 (req.body)
    // 2.處理 (保存到db.json文件中用以持久化) 
    // 先讀取db.json數據轉成對象
    // push數據
    // 把對象轉為字符串
    // 把字符串writeFile到文件中
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        }
        // 先讀取db.json數據轉成對象
        var db_data = JSON.parse(data);
        // 為新添加的student對象加id
        var last_id = db_data.students[(db_data.students.length - 1)].id;
        student.id = last_id + 1;
        // push數據
        db_data.students.push(student);
        // 把對象轉為字符串
        db_data = JSON.stringify(db_data);
        fs.writeFile(dbPath, db_data, function(err) {
            if (err) {
                // 錯誤就是傳err到 callback
                return callback(err);
            }
            // 成功沒有錯誤, 錯誤對象為null
            callback(null);
        });
    });

};

// 使用save():
// save({ name: 'xx', age: 18 }, function(err) {
//     if (err) {
//         return console.log('保存失敗');
//     }
//     console.log('保存成功');
// });


// 更新學生
module.exports.update = function(student, callback) {
    fs.readFile(dbPath, 'utf-8', function(err, data) {
        if (err) {
            return callback(err);
        }
        var db_data = JSON.parse(data).students;
        // 統一把id轉回為數字
        student.id = parseInt(student.id);
        // 要修改誰,就要把它找出來
        // es6 Array.find()  返回目標 的值value;
        var objStudent = db_data.find((item) => {
            return item.id === parseInt(student.id);
        });
        // 方法1: 直接對簡單數據類型賦值,   沒有發生複雜數據類型重新賦值的問題(因為我們用find())
        // objStudent.name = student.name;
        // objStudent.gender = student.gender;
        // objStudent.age = student.age;
        // 方法2: for-in 方法對簡單數據類型賦值
        // for (var key in student) {
        //     objStudent[key] = student[key];
        // }
        //方法3: Object.assign 淺拷貝賦值  (因為我們用find())
        Object.assign(objStudent, student);
        // ***這里 objStudent修改了, 同時db_data內也被修改了 
        // 我們(沒有發生複雜數據類型重新賦值的問題,如果直接對objStudent賦值,就是淺拷貝,引用地址,
        // objStundent就會失去對db_data的淺拷貝引用地址,所以我們是對簡單數據類型賦值 
        // objStudent.name (string)  objStudent.gender (string) objStudent.age (number) )
        // ***因為es6的find方法得出的結果是之前數據的引用，也就是淺復制，所以後期修改都會修改原來的數據對象
        // console.log(db_data);

        // 轉字符串
        var newdb_data = JSON.stringify({
            "students": db_data
        });

        // 上傳到database fs.writeFile
        fs.writeFile(dbPath, newdb_data, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    });
};

// findById
module.exports.findById = function(studentID, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err);
        }
        var db_data = JSON.parse(data).students;
        var objStudent = db_data.find(item => {
            return item.id === studentID
        });
        callback(null, objStudent);
    });
};

// 刪除學生

module.exports.delete = function(studentID, callback) {
    fs.readFile(dbPath, function(err, data) {
        if (err) {
            return callback(err);
        }
        var db_data = JSON.parse(data).students;
        // es6 Array.findIndex(); 根據條件 返回索引
        var objStudentIndex = db_data.findIndex(function(item) {
            return item.id === parseInt(studentID);
        });
        db_data.splice(objStudentIndex, 1);
        var new_data = JSON.stringify({
            students: db_data
        });
        fs.writeFile(dbPath, new_data, function(err) {
            if (err) {
                return callback(err);
            }
            callback(null);
        });
    })
};