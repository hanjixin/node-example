const express = require("express");
const router = express.Router();


/**
 * @swagger
 * /users/hello:
 *  get:
 *      tags:
 *       - 打招呼
 *      summary: hello
 *      description: 详细描述
 *      parameters:
 *           - name: name
 *             description: 用户名字
 *             in: query
 *             required: true
 *             type: string
 *      responses:
 *          200:
 *              description: 成功返回 hello
 *          400: 
 *              description: Invalid ID supplied
 *          404: 
 *              description: Pet not foun
 */
router.get("/hello", (req, res) => {
  let name = req.query.name;
  res.cookie('name', name, { expires: new Date(Date.now() + 900000), httpOnly: false, })
  res.send({
    name: name
  });
});
module.exports = router;
