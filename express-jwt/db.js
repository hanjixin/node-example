const mysql = require('mysql')
const config = require('./config/dbConfig')
var pool = mysql.createPool(config)
// var pool = mysql.createPool({
//   user: 'root',
//   password: '123456',
//   host: 'localhost',
//   database: 'mysql',
//   connectTimeout: 1000
// });
pool.on('acquire', function (connection) {
  console.log('Connection %d acquired', connection.threadId);
});
pool.on('connection', function (connection) {
  console.log('connection', connection.threadId);
});
pool.on('enqueue', function () {
  console.log('Waiting for available connection slot');
});
pool.on('release', function (connection) {
  console.log('Connection %d released', connection.threadId);
});
pool.on('error', function (connection) {
  console.log('Connection %d released', connection.threadId);
});
// pool.query('SELECT * from db', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results.length);
// });
module.exports = pool
