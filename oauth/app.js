
const express=require('express');
const path=require('path');
const session=require('express-session');
const bodyParser=require('body-parser');
const app=express();
const logger=require('morgan');
const oauth=require('./routes/oauth2');
const user=require('./routes/user');
app.set('view engine','html');
app.set('views',path.resolve(__dirname,'views'));
app.engine('html',require('ejs').__express);

app.use(bodyParser.urlencoded({extends: true}));
app.use(logger('dev'));
app.use(session({
    secret: 'zfpx',
    saveUninitialized: true,
    resave:true
}));
app.use(function (req,res,next) {
    res.createError=function (status,message) {
        let error=new Error(message);
        error.code=1;
        error.status=status;
        error.message=message;
        return error;
    }
    req.session.user={
        "_id": "5b7f6f189d384c73a7ee9038",
        "username": "zhangsan",
        "password": "4",
        "avatar":"http://www.gravatar.com/avatar/93e9084aa289b7f1f5e4ab6716a56c3b"
    };
    next();
});
app.use('/oauth2.0',oauth);
app.use('/user',user);
app.use(function (err,req,res,next) {
    res.status(err.status||500).json({code:err.code,message:err.message});
});
app.listen(4000,() => {
    console.log(`服务已经在4000端口上启动`);
});
