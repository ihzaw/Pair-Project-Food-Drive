const nodemailer = require("nodemailer")

nodemailer.createTestAccount((err, account) => {
    
});

let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: account.user, // generated ethereal user
        pass: account.pass  // generated ethereal password
    }
})

//code buat trigger send email
// transporter.sendEmail(options, (err, info) => {
//     if (err) {
//         console.log(error)
//         return
//     }
//     console.log(`Sent ` + info.response)
// })

module.exports = transporter