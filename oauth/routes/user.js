let express=require('express');
const axios=require('axios');
const {User}=require('../model');
const querystring = require('querystring');
const {appId,appKey,redirect_uri,fetchAccessTokenUrl,fetchOpenIdUrl,getUserInfoUrl}=require('../config');
const {addQueryParamsToUrl}=require('../utils');
let router=express.Router();
router.get('/login',function (req,res) {
    res.render('login');
});
router.get('/callback',async function (req,res) {
    let {code}=req.query;
    let options={
        grant_type: 'authorization_code',
        client_id: appId,
        client_secret: appKey,
        code,
        redirect_uri
    }
    let url=addQueryParamsToUrl(fetchAccessTokenUrl,options);
    let result=await axios.get(url);
    let {access_token,expires_in,refresh_token}=querystring.parse(result.data);

    url=addQueryParamsToUrl(fetchOpenIdUrl,{
        access_token
    });
    result=await axios.get(url);
    let start=result.data.indexOf('{');
    let end=result.data.lastIndexOf('}');
    result.data=result.data.slice(start,end+1);
    let {client_id,openid}=JSON.parse(result.data);
    url=addQueryParamsToUrl(getUserInfoUrl,{
        access_token,
        oauth_consumer_key: client_id,
        openid
    });
    result=await axios.get(url);
    let {username,avatar}=result.data;
    let user = await User.create({
        access_token,
        refresh_token,
        username,
        avatar
    });
    req.session.user=user;
    res.redirect('/');
});
module.exports=router;