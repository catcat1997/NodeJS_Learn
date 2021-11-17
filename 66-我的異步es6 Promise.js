var fs = require('fs');

var path = './被讀.md'
var fsREAD = new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            reject(err);

        }
        resolve(JSON.stringify(data));
    });
});



fsREAD.then(value => {
    console.log(value);

}).catch((err) => {
    console.log(err);

});