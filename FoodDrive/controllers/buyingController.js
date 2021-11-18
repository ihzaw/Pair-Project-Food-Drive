const {User, UserDetail, Food, Store} = require('../models')
const currency = require('../helper/convertToCurrency')
// let transporter = require('../nodemailer')
const nodemailer = require('nodemailer')

class BuyingController {
    static checkoutPage(req, res) {
        console.log(req.params, req.body)
        User.findOne({
            include: UserDetail,
            where: [{
                username: req.params.username
            }],
            // raw:true
        },)
        .then(objUserAndUserDetail => {
            let tempArr = []
            tempArr.push(objUserAndUserDetail)
            Food.findByPk(req.params.ItemId)
            .then(item => {
                tempArr.push(item)
                console.log(tempArr)
                res.render('checkOut', {tempArr, currency})
            })
            .catch(err => {
                res.send(err)
            })
        })
        .catch(err => {
            res.send('engga sampe masuk ke data item, jadi ini error di pencarian user')
        })
    }

    static processBuy(req, res) {
        let itemId = req.params.ItemId
        let username = req.params.username
        Food.findByPk(itemId)
        .then(item => {
            let itemPrice = item.price
            let itemName = item.name
            User.findOne({
                include: UserDetail,
                where: {
                    username: username
                }
            })
            .then(userObj => {
                let firstNameForEmail = userObj.UserDetail.firstName
                let email = userObj.email
                let currentMoney = userObj.balance
                let nowBalance = userObj.UserDetail.balance-itemPrice
                UserDetail.update({
                    balance: nowBalance
                }, {
                    where: {
                        UserId: userObj.id
                    }
                })
                .then(empty => {
                    console.log('userAfterUpdatedBalance', `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<`)
                    nodemailer.createTestAccount((err, account) => {
                        let transporter = nodemailer.createTransport({
                            host: account.smtp.host,
                            port: account.smtp.port,
                            secure: account.smtp.secure,
                            auth: {
                                user: account.user,
                                pass: account.pass
                            }
                        })
                        let mailContent = {
                            from: "fooddrivenotice@gmail.com",
                            to: `${email}`, //diganti dengan userAfterUpdatedBalance.email
                            subject: `Food Drive Purchase `,
                            text:`
                            Dear ${firstNameForEmail}, Thank you for your purchase of ${itemName}
                            Purchase was done on ${new Date()}, with bill total of ${currency(itemPrice)}.
                            You have ${currency(nowBalance)} left in your account
                            `,
                        }
                        transporter.sendMail(mailContent, (err, info) => {
                            if (err) {
                                console.log('Error occurred. ' + err.message);
                                return process.exit(1);
                            }
                    
                            console.log('Message sent: %s', info.messageId);
                            // Preview only available when sending through an Ethereal account
                            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        })
                    });
                    res.redirect(`/${req.params.username}/home`)
                })
                .catch(err => {
                    console.log(err)
                    res.send('err')
                })
            })
            .catch(err => {
                res.send('error di pencarian data user + user Detail')
            })
        })
        .catch(err => {
            res.send('error di pencarian data item')
        })
    }

    static rejectBuy(req, res) {
        console.log(req.params.username)
        res.redirect(`/${req.params.username}/home`)
    }
}

module.exports = BuyingController