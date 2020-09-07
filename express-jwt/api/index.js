const express = require('express')

const router = express.Router()
const service = require('../service')
const newsRouter = require('./news')
const upload = require('../service/upload')
const userRouter = require('./user').userRouter
router.use('', newsRouter)
router.use('', userRouter)
router.get('/getupload', upload.getAuth)

module.exports = router
