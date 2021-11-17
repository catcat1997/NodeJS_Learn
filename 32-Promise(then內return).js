var fs = require('fs');
var p1 = new Promise((resolve, reject) => {
    fs.readFile('./30-a.txt', 'utf-8', function(err, data) {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});
var p2 = new Promise((resolve, reject) => {
    fs.readFile('./30-b.txt', 'utf-8', function(err, data) {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});
var p3 = new Promise((resolve, reject) => {
    fs.readFile('./30-c.txt', 'utf-8', function(err, data) {
        if (err) {
            reject(err);
        }
        resolve(data);
    });
});

// then內的return另一個Promise (p2)結果,就可以在下一個then中接收到(p2)的resolve(value),reject(error)
p1.then(value => {
    console.log(value);
    return p2;
}).catch(err => {
    console.log(err);
}).then(value => {
    console.log(value);
    return p3;
}).catch(err => {
    console.log(err);
}).then(value => {
    console.log(value);
}).catch(err => {
    console.log(err);
})