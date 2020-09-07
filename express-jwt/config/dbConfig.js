
const RUN_ENV = process.env.RUN_ENV || 'test'

console.log(RUN_ENV, 'RUN_ENV', process.env.RUN_ENV)
const testConfig = {
  host: '192.168.100.54',
  user: 'test',
  password: '',
  database: '',
  connectionLimit : 100,
  // database: 'hk_www_cms',
  // useConnectionPooling: true,
}
// 待配置
const prodConfig = {
  // host: 'rm-2ze846cwf6nfkjq1y.mysql.rds.aliyuncs.com',
  host: '', // 数据库迁移
  user: '',
  password: '',
  database: '',
  connectionLimit : 200,
  // database: 'hk_www_cms',
  // useConnectionPooling: true,
}

const config ={
  test: testConfig,
  production: prodConfig
}

module.exports = config[RUN_ENV];
