let net  = require('net')
let socket = new net.Socket()
socket.connect(8080,'127.0.0.1')
socket.write('hello','utf-8', function(e) {
    console.log(e, '发送成功')
});
