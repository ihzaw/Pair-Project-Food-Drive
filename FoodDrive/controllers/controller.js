const bcrypt = require('bcryptjs')
const { Food, Store, UserDetail, User } = require('../models')

class UserController {
    static getHome(req, res) {
        res.render('home')
    }

    static getLogin(req, res) {
        res.render('login')
    }

    static postLogin(req, res) {
        console.log(req.body.username)
        User.findOne({
            where: {
                username: req.body.username
            }
        })
            .then(data => {
                if (data !== null) {
                    let passValid = bcrypt.compareSync(req.body.password, data.password)
                    if (passValid) {


                        
                        req.session.UserId = data.id



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
                .then(data => { res.render('login') })
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
        console.log(req.params.username)
        User.findOne({
            include: UserDetail,
            where: {username : req.params.username}
        })
        .then(data => {
            Store.findAll({
                include: Food
            })
                .then(dataFood => {
                    res.render('userHome', { data, dataFood })
                })
                .catch(err => res.send(err))
        })
        .catch(err => res.send(err))
    }

    static postUserHome(req, res){
        console.log(req.body.addBalance)
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
                .then(data => { res.redirect(`/${req.params.username}/home`) })
                .catch(err => { res.send(err) })
        })
        .catch(err => res.send(err))
    }

    static getUserDetail(req, res){
        User.findOne({
            include: UserDetail,
            where: {username : req.params.username}
        })
        .then(data => res.render('userDetail', { data }))
        .catch(err => res.send(err))
    }

    static postUserDetail(req, res){
        console.log(req.body)


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