// 封裝異步function的話,記得是return new Promise() 是(function)
// 如果只是寫一個promise,就不用return     是(variable)

var fs = require('fs');

function myFS(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, 'utf-8', (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

myFS('./30-a.txt')
    .then(value => {
        console.log(value);
        return myFS('./30-b.txt');
    }, reason => { console.log(reason) })
    .then(value => {
        console.log(value);
        return myFS('./30-c.txt');
    }, reason => { console.log(reason) })
    .then(value => {
        console.log(value);
    })