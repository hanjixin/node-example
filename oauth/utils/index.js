let {parse,format}=require('url');
exports.addQueryParamsToUrl=function (url,options) {
    let {protocol,host,pathname,query}=parse(url,true);
    Object.assign(query,options);
    return format({protocol,host,pathname,query});
}