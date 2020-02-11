var fs = require('fs');
var zlib = require('zlib');

function zip(src) {
    var gzip = zlib.createGzip();//创建压缩流
    var inputStream = fs.createReadStream(src);
    var outputStream = fs.createWriteStream(src+'.gz');
    inputStream.pipe(gzip).pipe(outputStream);
}
zip('source.txt');

function unzip(src){
    var gunzip = zlib.createGunzip();
    var inputStream = fs.createReadStream(src);
    var outputStream = fs.createWriteStream(src.slice(0,-3));
    inputStream.pipe(gunzip).pipe(outputStream);
}

unzip('source.txt.gz');
