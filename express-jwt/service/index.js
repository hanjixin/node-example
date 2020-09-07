const db = require('../db')

const getTotal = function (tabelName, classId) {
  return new Promise(function (resolve, reject) {
    db.query(
      `select count(*) from ${tabelName} where class_id=${classId}`,
      function (err, data) {
        if (err) {
          reject(err)
        }
        resolve(data)
      }
    )
  })
}

function objToSql(data) {
  let obj = {
    updateString: '',
    stringKeys: '',
    stingValues: '',
  }
  let keys = Object.keys(data)
  obj.values = []
  obj.stringKeys = keys.join(',')
  keys.forEach((item) => {
    obj.values.push(data[item])
    obj.updateString += `${item} = ${JSON.stringify(data[item])}, `
    obj.stingValues += `${JSON.stringify(data[item])}, `
  })
  obj.updateString = obj.updateString.slice(0, obj.updateString.length - 2)
  obj.stingValues = obj.stingValues.slice(0, obj.stingValues.length - 2)
  return obj
}

function getList(page = 1, limit = 20, tabelName, classId) {
  return new Promise(async function (resolve, reject) {
    let totalData = await getTotal(tabelName, classId)
    let total = totalData.length ? totalData[0]['count(*)'] : 0
    let arr = [(page - 1) * limit, parseInt(limit)]
    db.query(
      `select * from ${tabelName} where available = 1 AND class_id=${classId} ORDER BY create_time desc limit ?,?`,
      arr,
      function (err, data) {
        // console.log(data);
        if (err) {
          reject(err)
        }
        resolve({
          data: data || [],
          page,
          limit,
          total,
        })
      }
    )
  })
}
module.exports = {
  // 荣誉奖项 79  领导关怀80
  // 新闻
  getNewsList(page = 1, limit = 20) {
    return getList(page, limit, 'news', 9)
  },
  // 媒体报道
  getArticleList(page = 1, limit = 20) {
    return getList(page, limit, 'news', 10)
  },
  getList(page = 1, limit = 20, classId = 9) {
    return getList(page, limit, 'news', classId)
  },
  deleteNews(id) {
    return new Promise((resolve, reject) => {
      db.query(`update news set available = 0 where id=${id}`, function (
        err,
        data
      ) {
        if (err) {
          reject(err)
        }
        resolve(data)
        // resolve(data);
      })
    })
  },
  addNews(classId, queryData) {
    const content = queryData.content
    let bodyData = {
      ...queryData,
      update_time: parseInt(Date.now() / 1000, 10),
    }
    delete bodyData.content
    const { stringKeys, stingValues } = objToSql(bodyData)
    console.log(objToSql(bodyData))
    console.log(`INSERT INTO news (${stringKeys}) VALUES (${stingValues})`)
    // return new Error(21313)
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO news (${stringKeys}) VALUES (${stingValues})`,
        function (err, data) {
          if (err) {
            reject(err)
          }
          const insertId = data.insertId
          console.log(insertId, classId, content)
          // console.log(aaaa)
          db.query(
            `INSERT INTO news_content (news_id,class_id,content) VALUES (${insertId}, ${classId}, ${JSON.stringify(
              content
            )})`,
            function (err, data) {
              if (err) {
                reject(err)
              }
              resolve(data)
            }
          )
        }
      )
    })
  },
  updateNews(id, queryData) {
    const content = queryData.content
    let bodyData = {
      ...queryData,
      update_time: parseInt(Date.now() / 1000, 10),
    }
    delete bodyData.content
    delete bodyData.class_id
    const { updateString } = objToSql(bodyData)
    console.log(updateString)
    return new Promise((resolve, reject) => {
      db.query(`update news set ${updateString} where id=${id}`, function (
        err,
        data
      ) {
        if (err) {
          reject(err)
        }
        db.query(
          `update news_content set content=${JSON.stringify(
            content
          )} where news_id=${id}`,
          function (err, data) {
            if (err) {
              reject(err)
            }
            resolve(data)
          }
        )
        // resolve(data);
      })
    })
  },
  getNewsDetail(id) {
    return new Promise(async function (resolve, reject) {
      db.query(
        `select n.id,n.title,n.title_pic,n.class_id,n.create_time,n.small_text,r.content from news n,news_content r where r.news_id=${id} and r.news_id=n.id`,
        function (err, data) {
          //   console.log(data);
          if (err) {
            reject(err)
          }
          resolve(data[0] || null)
        }
      )
    })
  },
  getHotNews(id, classId) {
    return new Promise(async function (resolve, reject) {
      db.query(
        `select id,title,small_text as smalltext,title_pic as titlepic,create_time as newstime, class_id as classid from news where class_id=${classId} and id!=${id} ORDER BY create_time desc limit 0,10`,
        function (err, data) {
          //   console.log(data);
          if (err) {
            reject(err)
          }
          resolve(data || [])
        }
      )
    })
  },
}
