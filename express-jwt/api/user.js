const express = require('express')

const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config')

//秘钥
var signkey = config.secret
//生成token
const setToken = function (username, password) {
  return new Promise((resolve, reject) => {
    const token = jwt.sign(
      {
        username,
        // password,
      },
      signkey,
      { expiresIn: config.expires }
    )
    let info = jwt.verify(token, signkey)
    console.log(info);
    console.log('token', token)
    resolve(token)
  })
}
//验证token
const verToken = function (token) {
 
  return new Promise((resolve, reject) => {
    var info = jwt.verify(token.replace('Bearer ', ''), signkey, (error, decoded) => {
      if (error) {
        console.log(error.message)
        reject(error.message)
        return
      }
      resolve(decoded)
      console.log(decoded)
    })
    
  })
}
router.post('/login', async (req, res) => {
  const body = req.body
  const { username, password } = body
  const defaultUser = config.defaultUser
  if ((defaultUser.username === username, defaultUser.password === password)) {
    const token = await setToken(username, password)
    res.send({
      data: token,
      code: 1,
      msg: '登录成功',
    })
  }
})
router.get('/user/info', async (req, res) => {
  var token = req.headers['authorization']
  if (req.data) {
    res.send({
      data: req.data,
      code: 1,
      msg: '获取信息成功',
    })
    return
  }
  verToken(token)
    .then((data) => {
     console.log(111, data)
      res.send({
        data: data,
        code: 1,
        msg: '获取信息成功',
      })
    })
    .catch((error) => {
      console.log(error)
      res.send({
        data: error,
        code: -1,
        msg: '获取信息失败',
      })
    })
})

module.exports = {
  verToken,
  setToken,
  userRouter: router,
}
