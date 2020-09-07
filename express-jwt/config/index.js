const dbConfig = require('./dbConfig')

module.exports = {
  dbConfig,
  oss: {
    key: '',
    secret: '',
  },
  secret: 'mes_huike_cms',
  expires: 60 * 60 * 24 * 3,
  defaultUser: {
      username: '',
      password: '\'
  }
}
