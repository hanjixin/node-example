let express=require('express');
let uuid=require('uuid');
const querystring=require('querystring');
const {Application,Permission,AuthorizationCode,AccessToken}=require('../model');
let router=express.Router();
router.get('/authorize',async function (req,res,next) {
    //http://localhost:4000/oauth2.0/authorize?response_type=code&client_id=5b7f704beacb0274b068da17&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fuser%2Fcallback
    let {response_type='code',client_id,redirect_uri,scope='get_user_info'}=req.query;
    if (!client_id) {
        return next(res.createError(400,'缺少 client_id 参数'));
    }
    if (!redirect_uri) {
        return next(res.createError(400,'缺少 redirect_uri 参数'));
    }
    redirect_uri=decodeURIComponent(redirect_uri);
    let client=await Application.findById(client_id);
    console.log(client)
    if(!client) {
        return next(res.createError(400,'client_id 不合法'));
    }
    if (client.redirect_uri !== redirect_uri) {
        return next(res.createError(400,'传入的回调地址不匹配'));
    }
    let query={$or: scope.split(',').map(item => ({scope: item}))};
    let permissions=await Permission.find(query);
    res.render('authorize',{
        user:req.session.user,
        client,
        permissions
    });    
});

router.post('/authorize',async function (req,res,next) {
    let {client_id,redirect_uri}=req.query;
    let {permissions}=req.body;
    if (!Array.isArray(permissions)) {
        permissions=[permissions]
    }
    let authorizationCode=await AuthorizationCode.create({
        client_id,
        user: req.session.user._id,
        permissions
    });
    res.redirect(`${redirect_uri}?code=${authorizationCode._id}`);
});

router.get('/token',async function (req,res,next) {
    let {grant_type,client_id,client_secret,code,redirect_uri}=req.query;
    let authorizationCode=await AuthorizationCode.findById(code);
    if (!authorizationCode) {
        return next(res.createError(400,'授权码错误'));
    }
    let accessToken=await AccessToken.create({
        client_id: authorizationCode.client_id,
        user:authorizationCode.user,
        refresh_token: uuid.v4(),
        permissions:authorizationCode.permissions
    });
    let result={access_token: accessToken._id.toString(),expires_in: 60*60*24*90};
    res.send(querystring.stringify(result));
});

router.get('/me',async function (req,res,next) {
    let {access_token}=req.query;
    if (!access_token) {
        return next(res.createError(400,'access_token未提供'));
    }
    let {client_id,user:openid} = await AccessToken.findById(access_token);
    let result={
        client_id,
        openid
    }
    res.send(`callback(${JSON.stringify(result)})`);    
});
module.exports=router;