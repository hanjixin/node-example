var express = require('express');
var path = require('path');
var app = express();


app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
});
app.use(express.static('./public'))
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function (socket) {
    console.log('客户端已经连接');
    socket.on('message', function (msg) {
        console.log(msg);
        socket.send('sever:' + msg);
    });
});
server.listen(8080, function() {
    console.log('server is run  listen port 8080')
});