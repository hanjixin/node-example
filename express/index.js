var app = function (res, req) {
    var i = 0;
    function next() {
        var fn = app.routes[i++]
        if(fn) {
            fn(res, req, next) 
        }
    }
    next()
}
app.routes = []
app.use = function(fn){
    //往数组里添加函数
    app.routes.push(fn);
}
app.use(function(req,res,next){
    console.log(req.url);
    console.log(1);
    next();
});
app.use(function(req,res,next){
    console.log(2);
    res.end('ok');
    next();
});
//-------------------
var http = require('http');
var server = http.createServer(app);
server.listen(9090, function(){
    console.log('server is run ,  listen port 9090')
});
// params
var path = '/users/:name/:age';
//真实请求的URL
var url = '/users/zfpx/8';
//存放所有的参数名
var paramNames = [];
var regStr = path.replace(/:(\w+)/g,function(matchedStr,group1){
    paramNames.push(group1);// name age 添加进来的
    return '(\\w+)';
});
console.log(regStr);//   \/users\/(\w+)\/(\w+)
var reg = new RegExp(regStr);
var result = url.match(reg);
//[ '/users/zfpx/8', 'zfpx', '8', index: 0, input: '/users/zfpx/8' ]
console.log(result);
var params = {};
//循环数组名 值就是 result中的分组
for(var i=0;i<paramNames.length;i++){
    params[paramNames[i]] = result[i+1];
}
console.log(params);
