const { User } = require('../models')
const bcrypt = require('bcryptjs')

class UserController {
    static getHome(req, res){
        res.render('home')
    }
    
    static getLogin(req, res) {
        res.render('login')
    }

    static postLogin(req, res) {
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
                        res.redirect("/admin/home")
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

}
module.exports = {UserController, MainController}