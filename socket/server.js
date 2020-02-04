let net = require('net');
let util = require('util');
let server = net.createServer(function(socket){
    server.getConnections((err,count)=>{
        server.maxConnections = 3;
        socket.write(`weclome,there is ${count} users now,please input your username\r\n`);
        console.log('最大连接数量%d,当前连接数量%d',server.maxConnections,count); 
    });  
    socket.on('data', function(e) {
        console.log('接受数据' + e)
    })
    socket.on('error', function(e) {
        console.log('发生错误' + e)
    })
    let address = socket.address();
    console.log('客户端地址 %s',util.inspect(address));
  });
server.listen(8080,'localhost',function(){
    console.log('服务器开始监听');
});
