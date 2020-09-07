/**
 * @author Hank
 *
 *
 */
const express = require('express')
const app = express()
const expressJwt = require('express-jwt')
const apiRouter = require('./api')
const cors = require('cors')
const bodyparser = require('body-parser')
const user = require('./api/user')
const config = require('./config')
const path  = require('path')

app.use(bodyparser.urlencoded({ extende: true }))
app.use(bodyparser.json())
app.use(cors())
app.use(express.static(path.resolve(__dirname, '../build')));
const jwt = require('jsonwebtoken')
// 解析token获取用户信息

app.use(function (req, res, next) {
  var token = req.headers['authorization']
  if (token == undefined) {
    return next()
  } else {
    console.log('校验')
    user
      .verToken(token)
      .then((data) => {
        req.data = data
        return next()
      })
      .catch((error) => {
        console.log('校验失败')
        console.log(error)
        if (req.url !== '/api/login') {
          res.status(401)
          res.send({
            code: -1,
            msg: error,
            data: null,
          })
        }
        return next()
      })
  }
})

//验证token是否过期并规定哪些路由不用验证
app.use('/api',
  expressJwt({
    secret: config.secret,
    algorithms: ['HS256'],
  }).unless({
    path: ['/', '/api/login'], //除了这个地址，其他的URL都需要验证
  })
)
app.use('/api/', apiRouter)

app.listen(9000, () => {
  console.log('app is run port 9000')
})


