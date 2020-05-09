#! /usr/bin/env node
let commander = require("commander");
let shell = require("shelljs");
let open = require("open");
let clone = require("git-clone");
const giturl = "git@github.com:vuejs/vue-next-webpack-preview.git";
commander.version("1.0.0");
commander
  .command("new <name>")
  .description("创建项目")
  .action((name) => {
    clone(giturl, `./${name}`, (err) => {
      if (err) {
        console.log("下载失败", "" + err.buffer);
        return;
      }
      shell.rm("-rf", ` ${name}/.git`);
      shell.cd(name);
      shell.exec("npm install");
      console.log(`
            创建项目成功 ${name}
            cd ${name} 进入项目
            mycli run ${name} 启动项目
            
        `);
    });
  });
commander
  .command("run")
  .description("运行项目")
  .action((name) => {
    console.log(`运行 ${name}`);
  });
// open('https://blog.csdn.net/easyClub_hanjixin/article/details/105729802')
commander.parse(process.argv);
