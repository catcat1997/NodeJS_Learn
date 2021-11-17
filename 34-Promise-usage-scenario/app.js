const express = require('express');
const fs = require('fs');


let app = express();


let readData = function(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', function(err, data) {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        });
    })
}

// 這個readData(path) 在實用上可能是兩個不同path的file 所以會用到then內return (promise嵌套)


app.engine('html', require('express-art-template'));


app.get('/', function(req, res) {

    readData('./34-data.json').then(value => {
        res.render('index.html', {
            datas: JSON.parse(value).users,
            jobs: JSON.parse(value).jobs
        });
    });


});

app.listen(5000, function() {
    console.log('server is running...');
});