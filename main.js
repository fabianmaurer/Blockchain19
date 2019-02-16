var io   = require('socket.io'),
    url  = require('url'),
    sys  = require('sys'),
    express = require('express'),
    http=require('http'),
    iota=require('@iota/core');

var app = express();
var server = http.createServer(app);
var socket = io.listen(server);

app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res){
    res.render('index');
});

app.listen(8082);
sys.puts('server running ' + 'now ' + Date.now());