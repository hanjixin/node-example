let mongoose=require('mongoose');
//https://github.com/Automattic/mongoose/issues/6880
mongoose.set('useFindAndModify',false);
const opts = { useNewUrlParser: true };
let conn=mongoose.createConnection('mongodb://localhost/oauth',opts);
let Schema=mongoose.Schema;
let ObjectId=Schema.Types.ObjectId;
let ApplicationSchema=new Schema({
    appId: {type:String,required:true}, //appId
    appKey: {type:String,required:true}, //appKey
    website: {type: String,required: true}, //网站名称
    redirect_uri: {type: String,required: true}//回调地址
});

exports.Application=conn.model('Application',ApplicationSchema);

let UserSchema=new Schema({
    username: {type:String,required:true}, //appId
    password: {type: String,required: true}, //appKey
    avatar:{type:String,required:true}
});

exports.User=conn.model('User',UserSchema);

let AuthorizationCodeSchema=new Schema({
    client_id: {type: String,required: true}, 
    user: {type: ObjectId,ref: 'User',required:true}, 
    permissions: {type: [{type:ObjectId,ref:'Permission'}],required: true},
    createAt:{type:Date,default:Date.now}//10分钟内过期
});

exports.AuthorizationCode=conn.model('AuthorizationCode',AuthorizationCodeSchema);

let PermissionSchema=new Schema({
    name: {type:String,required:true}, 
    scope: {type: String,required: true}
});

exports.Permission=conn.model('Permission',PermissionSchema);

let AccessTokenSchema=new Schema({
    client_id: {type: String,required: true}, 
    user: {type: ObjectId,ref: 'User',required:true}, 
    permissions: {type: [{type: ObjectId,ref: 'Permission'}],required: true},
    refresh_token:{type:String},
    createAt:{type:Date,default:Date.now}//10分钟内过期
});

exports.AccessToken=conn.model('AccessToken',AccessTokenSchema);