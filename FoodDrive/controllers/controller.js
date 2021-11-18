<<<<<<< HEAD
const { User, UserDetail, Store, Food  } = require('../models')
=======
const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { Food, Store } = require('../models')
>>>>>>> 7656f4448e7cb4eef29174dea3d7c8105d05f1fa

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
                        console.log("masok")
                        if (req.body.username === "admin") {
                            let username = req.body.username
                            res.redirect("/admin/home")
                        } else {
                            res.redirect(`/${req.body.username}/home`)
                        }
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
                password: req.body.password[0]
            })
                .then(data => { res.render('login') })
                .catch(err => res.send(err.errors[0].message))
        } else {
            res.send("password tidak sama")
        }
    }
}

class MainController {
<<<<<<< HEAD
    // static bridge(req, res) {
    //     let adminId = 2 //idnya admin itu 1
    //     User.findByPk(adminId)
    //         .then(data => {
    //             console.log(data)
    //             res.render('bridge', { data })
    //         })
    //         .catch(err => {
    //             res.send(err)
    //         })
    // }

    // static fetchRestaurantData(req, res) {
    //     Store.findAll()
    //     .then(data => {
    //         console.log(data)
    //         res.render('restaurantList', {data})
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    // }

    // static newRestaurantForm(req, res) {
    //     res.render('addRestaurant')
    // }

    // static saveNewRestaurant(req, res) {
    //     let {name, address} = req.body
    //     Store.create({name, address})
    //     .then(data => {
    //         res.redirect('/admin/home/storesList')
    //     })
    // }

    // static deleteRestaurant(req, res) {
    //     console.log(req.params)
    //     let id = req.params.StoreId
    //     Store.destroy({
    //         where:{
    //             id: id
    //         }
    //     })
    //     .then(data => {
    //         res.redirect('/admin/home/storesList')
    //     })
    //     .catch(err => {
    //         res.send(err)
    //     })
    // }
    
    // static fetchSelectedRestaurant(req, res) {
    //     let id = req.params.StoreId
    //     Store.findByPk(id)
    //     .then (data => {
    //         res.render('storeDetails', {data})
    //     })
    // }
=======
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
        },{
            where: {
                id: req.params.restaurantId
            }
        })
        .then(data =>{res.redirect('/admin/home')})
        .catch(err =>{res.send(err)})
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
            
        },{
            where: {
                id: req.params.foodId
            }
        })
        .then(data =>{res.redirect('/admin/home')})
        .catch(err =>{res.send(err)})
    }

    static getAddRestaurant(req, res) {
        res.render('addRestaurant')
    }

    static postAddRestaurant(req, res) {
        Store.create({
            name: req.body.name,
            address: req.body.address
        })
        .then(data=>{
            res.redirect('/admin/home')
        })
        .catch(err => res.send(err))
    }

    static getAddFood(req, res) {
        Store.findAll()
        .then(data=> res.render('addFood', { data }))
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
        .then(data =>{res.redirect('/admin/home')})
        .catch(err =>{res.send(err)})
    }

>>>>>>> 7656f4448e7cb4eef29174dea3d7c8105d05f1fa

    // static toCreateMenu(req, res) {
    //     Store.findAll()
    //     .then(data => {
    //         res.render('addItem', {data})
    //     })
    // }
}
module.exports = { UserController, MainController }