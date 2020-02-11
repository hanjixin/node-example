var zlib = require('zlib');
var fs = require('fs');
var http = require('http');
http.createServer(function (request, response) {
    var raw = fs.createReadStream('.' + request.url);
    var acceptEncoding = request.headers['accept-encoding'];
    if (!acceptEncoding) {
        acceptEncoding = '';
    }
    if (acceptEncoding.match(/\bdeflate\b/)) {
        response.setHeader('Content-Encoding','deflate');
        raw.pipe(zlib.createDeflate()).pipe(response);
    } else if (acceptEncoding.match(/\bgzip\b/)) {
        response.setHeader('Content-Encoding','gzip');
        raw.pipe(zlib.createGzip()).pipe(response);
    } else {
        raw.pipe(response);
    }
}).listen(9090)
var request = http.get({
  host: 'localhost',
  path: '/index.html',
  port: 9090,
  headers: {
      'accept-encoding': 'gzip,deflate'
  }
})

request.on('response', function (response) {
  var output = fs.createWriteStream('test.txt');
  switch (response.headers['content-encoding']) {
      case 'gzip':
          response.pipe(zlib.createGunzip()).pipe(output);
          break;
      case 'deflate':
          response.pipe(zlib.createInflate()).pipe(output);
          break;
      default:
          response.pipe(output);
          break;
  }
});
request.end();