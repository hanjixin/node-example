#! /usr/bin/env node 
let commander = require('commander').program

console.log('mycli')
commander.version('1.0.0')
commander.command('new  <name>').description('创建你的项目').action((name, destination) => {
  console.log(`new ${name}`);
})
commander.parse(process.argv);