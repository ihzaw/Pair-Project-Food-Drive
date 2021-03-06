const bcrypt = require('bcryptjs')
const currency = require('../helper/convertToCurrency')
const { Food, Store, UserDetail, User } = require('../models')
const { Op } = require("sequelize");

class UserController {
    static getHome(req, res) {
        res.render('home')
    }

    static getLogin(req, res) {
        const error = req.query.error
        res.render('login', { error })
    }

    static postLogin(req, res) {
        console.log(req.body.username)
        User.findOne( {
            where: {
                username: req.body.username
            }
        })
            .then(data => {
                if (data !== null) {
                    let passValid = bcrypt.compareSync(req.body.password, data.password)
                    if (passValid) {
  
                        req.session.UserId = data.id // BCRYPT

                        if(data.role === 'Admin') return res.redirect(`/admin/home`)

                        return res.redirect(`/${data.username}/home`)
                    }
                    else {
                        const error = 'invalid username/password'
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = 'invalid username/password'
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => res.send(err))
    }

    static getRegister(req, res) {
        res.render('register')
    }

    static postRegister(req, res) {
        
        if (req.body.password[0] === req.body.password[1]) {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password[0],
                role: 'User'
            })
                .then(data => { 
                    UserDetail.create({
                        firstName: "",
                        lastName: "",
                        balance: 0,
                        UserId: data.id,
                        gender: "",
                        address: "",
                      })
                        .then(data => res.redirect('/login') )
                        .catch(err => res.send(err.errors[0].message))
                })
                .catch(err => res.send(err.errors[0].message))
        } else {
            res.send("password tidak sama")
        }
    }
}

class MainController {
    static getAdminHomePage(req, res) {
        Store.findAll({
            include: Food
        })
            .then(data => {
                res.render('adminHomePage', { data })
            })
            .catch(err => res.send(err))
    }

    static getEditRestaurant(req, res) {
        Store.findByPk(req.params.restaurantId)
            .then(data => {
                res.render('editRestaurant', { data })
            })
            .catch(err => res.send(err))
    }

    static postEditRestaurant(req, res) {
        Store.update({
            name: req.body.name,
            address: req.body.address
        }, {
            where: {
                id: req.params.restaurantId
            }
        })
            .then(data => { res.redirect('/admin/home') })
            .catch(err => { res.send(err) })
    }

    static getEditFood(req, res) {
        Food.findByPk(req.params.foodId)
            .then(data1 => {
                Store.findAll({})
                    .then(data2 => {
                        res.render('editFood', { data1, data2 })
                    })
            })
            .catch(err => res.send(err))
    }

    static postEditFood(req, res) {
        console.log(req.body)

        Food.update({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            berat: req.body.berat,
            StoreId: req.body.StoreId,

        }, {
            where: {
                id: req.params.foodId
            }
        })
            .then(data => { res.redirect('/admin/home') })
            .catch(err => { res.send(err) })
    }

    static getAddRestaurant(req, res) {
        res.render('addRestaurant')
    }

    static postAddRestaurant(req, res) {
        Store.create({
            name: req.body.name,
            address: req.body.address
        })
            .then(data => {
                res.redirect('/admin/home')
            })
            .catch(err => res.send(err))
    }

    static getAddFood(req, res) {
        Store.findAll()
            .then(data => res.render('addFood', { data }))
            .catch(err => res.send(err))
    }

    static postAddFood(req, res) {
        Food.create({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            berat: req.body.berat,
            StoreId: req.body.StoreId,
        })
            .then(data => { res.redirect('/admin/home') })
            .catch(err => { res.send(err) })
    }

    static getUserHome(req, res){

        const filter = req.query.filter
        console.log(filter)

        if(!filter){
            User.findOne({
                include: UserDetail,
                where: {username : req.params.username}
            })
            .then(data => {
                Store.findAll({
                    include: Food
                })
                    .then(dataFood => {
                        return res.render('userHome', { data, dataFood , currency })
                    })
                    .catch(err => res.send(err))
            })
            .catch(err => res.send(err))
        } else {
            User.findOne({
                include: UserDetail,
                where: {username : req.params.username}
            })
            .then(data => {
                Store.findAll({
                    include: Food
                    ,
                    where: {
                        name: {
                            [Op.or]: [
                                {[Op.like]: `%${filter.toUpperCase()}%`},
                                {[Op.like]: `%${filter.toLowerCase()}%`},
                                {[Op.like]: `%${filter}%`}
                            ]
                        }
                    }
                })
                    .then(dataFood => {
                        return res.render('userHome', { data, dataFood , currency })
                    })
                    .catch(err => {
                        res.send(err)
                    })
                })
                .catch(err => {
                    console.log("SAAS")
                    console.log("SAAS")
                    console.log("SAAS")
                    console.log(err)
                })
        }
    }

    static postUserHome(req, res){
        User.findOne({
            include: UserDetail,
            where: {username : req.params.username}
        })
        .then(data => {
            let nowBalance = data.UserDetail.balance + Number(req.body.addBalance)
            UserDetail.update({
                balance: nowBalance
            }, {
                where: {
                    UserId: data.id
                }
            })
            .then(data => { 
                res.redirect(`/${req.params.username}/home`) 
            })
            .catch(err => { res.send(err) })
        })
        .catch(err => res.send(err))
    }
    
    static getUserDetail(req, res){
        User.findOne({
            include: UserDetail,
            where: {username : req.params.username}
        })
        .then(data => res.render('userDetail', { currency, data }))
        .catch(err => res.send(err))
    }
    
    static postUserDetail(req, res){
        User.findOne({
            include: UserDetail,
            where: {username : req.params.username}
        })
        .then(data => {
            UserDetail.update({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                birthDate: req.body.birthDate,
                gender: req.body.gender,
                address: req.body.address
            }, {
                where: {
                    UserId: data.id
                }
            })
            .then(data => res.redirect(`/${req.params.username}/home/userdetail`))
            .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    }

}
module.exports = { UserController, MainController }