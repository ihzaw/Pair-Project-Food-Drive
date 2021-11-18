const {User, UserDetail, Food, Store} = require('../models')
const currency = require('../helper/convertToCurrency')

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
            User.findOne({
                include: UserDetail,
                where: {
                    username: username
                }
            })
            .then(userObj => {
                let nowBalance = userObj.UserDetail.balance-itemPrice
                UserDetail.update({
                    balance: nowBalance
                }, {
                    where: {
                        UserId: userObj.id
                    }
                })
                .then(userAfterUpdatedBalance => {
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