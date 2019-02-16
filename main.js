var io = require('socket.io'),
    url = require('url'),
    sys = require('sys'),
    express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.get('/', function (req, res) {
    res.render('index');
});
app.listen(8082);  