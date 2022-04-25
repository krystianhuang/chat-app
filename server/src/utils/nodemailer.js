/*  文件名： sendEmail.js    */

const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp.163.com',
  secure: true,
  auth: {
    user: 'krystianhuang@163.com',
    pass: 'DEAKNHJOCEZJNSXR'
  }
})

module.exports = async function fn(email, code) {
  console.log('email', email, code)

  let status = null
  await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: 'krystianhuang@163.com',
        to: email,
        subject: 'Verification code',
        html:
          `
            <p>Your verification code is :</p >
        <span style="font-size: 18px; color: red">` +
          code +
          `</span>`
      },
      function (err, info) {
        if (err) {
          status = 0
          reject()
        } else {
          status = 1
          resolve()
        }
      }
    )
  })
  return status
}
