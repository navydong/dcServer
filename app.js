var express = require('express');
var FileStreamRotator = require('file-stream-rotator')
var morgan = require('morgan');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var multipart = require('connect-multiparty')
var fs = require('fs');
var path = require('path');

var dcbackRouter = require('./route/dcback');
var backRouter = require('./route/back')
var login =require('./route/login')
var app = express()
var logDirectory = path.join(__dirname, 'log')
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
// cookie
app.use(cookieParser('secret'));
// header
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// logger
// var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {
//     flags: 'a'
// });
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDirectory, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  })
app.use(morgan('combined', {
    stream: accessLogStream
}))
// static
app.use('/static', express.static('public'));
// body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
// file
app.use(multipart());


app.use(function (req, res, next) {
    // console.log(req.signedCookies)
    next();
});

// router
app.use('/login', login)
app.use('/dcback', dcbackRouter)
app.use('/back', backRouter)

var server = app.listen(
    process.env.port || 3000,
    () => {
        console.log('app listen localhost:' + (process.env.port || 3000))
    }
)