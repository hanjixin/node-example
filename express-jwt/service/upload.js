var crypto = require('crypto')
var key = require('../config').oss

var host = 'https://hky-public-video.oss-cn-beijing.aliyuncs.com'
var dir = 'huike/'

exports.getAuth = function (req, res) {
  var expiration = new Date() // 指定policy过期时间
  var conditions = []
  var signatureObj = {} // 待签名对象
  var signature = '' // 完成的签名字符串
  var base64_policy = null
  var hmac = null

  // 一个小坑，UTC默认是不会加上当前时区 orz
  expiration.setHours(expiration.getHours() + 8)
  expiration.setSeconds(expiration.getSeconds() + 10)
  conditions.push(['content-length-range', 0, 1048576000]) // 文件大小
  conditions.push(['starts-with', '$key', dir]) // 校验目录
  signatureObj.expiration = expiration.toISOString() // 使用ISO格式日期
  signatureObj.conditions = conditions
  base64_policy = new Buffer(JSON.stringify(signatureObj)).toString('base64')
  // 创建带有secret秘钥的哈希值
  signature = crypto
    .createHmac('sha1', key.secret)
    .update(base64_policy)
    .digest()
    .toString('base64')
  //signature = new Buffer(signature).toString('base64'); // 愚蠢的我加了2次base64导致接口老出问题
  if (!base64_policy || !signature) {
    return res.json({
      code: 1001,
      msg: '获取签名信息失败',
    })
  }
  return res.json({
    data: {
      accessid: key.key,
      host: host,
      policy: base64_policy,
      signature: signature,
      expire: +expiration,
      dir: dir,
    },
    code: 1,
  })
}
