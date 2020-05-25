'use strict';
const nodemailer = require('nodemailer');

// QQ 的 host 是 smtp.qq.com；163 的 host 是 smtp.163.com
// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    port: 465, // false 587
    secure: true, // true for 465, false for other ports
    auth: {
      user: '15501259989@163.com', // generated  user
      pass: '', // generated  password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <15501259989@163.com>', // sender address
    to: '764671440@qq.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world nodejs?', // plain text body
    html: '<b>Hello world nodejs ?</b>', // html body
    // attachments: [ // 附件
    //   {
    //     filename: 'test.md',
    //     path: './test.md',
    //   },
    //   {
    //     filename: 'content',
    //     content: '发送内容',
    //   },
    // ],
  });

  console.log('Message sent: %s', info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
