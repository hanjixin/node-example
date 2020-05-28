#! /usr/bin/env node

var inquirer = require('inquirer');
inquirer
  .prompt([
    /* Pass your questions in here */
    {
        type: 'input',
        name: 'name',
        message: '1213123'
    },
    {
        type: 'confirm',
        name: 'argee',
        message: '是否同意获取你的个人信息'
    },
    {
        type: "checkbox",
        name: '1212',
        choices: [
            1,2,3,4,5,6
        ],
        message: '是否同意获取你的个人信息'
    },
  ])
  .then(answers => {
      console.log(answers)
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });