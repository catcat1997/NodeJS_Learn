var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var url = require('url');

var app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/', function(req, res) {
    fs.readFile('./40-ajax.html', 'utf-8', function(err, data) {
        if (err) {
            return res.end(err);
        }
        return res.end(data);
    })
});
app.get('/a', function(req, res) {
    fs.readFile('./40-ajax.html', 'utf-8', function(err, data) {
        if (err) {
            return res.end(err);
        }
        return res.end(data);
    })
});

app.post('/b', function(req, res) {
    // console.log(req.body);
    // console.log(req.body.username); 
    // url module
    // var url_parsed = url.parse(req.url, true)
    // console.log(url_parsed.query);
    // console.log(url_parsed.pathname);
    if (req.body.username === 'gg') {
        res.send('you are the true master!');
    } else {
        res.send(req.body.username);
    }
});
app.listen(3000, function() {
    console.log('server is running....');
});