const { User } = require('../models')

class Controller{
    static getRegister(req, res){
        res.render('register')
    }

    static postRegister(req, res){
        if(req.body.password[0] === req.body.password[1]){
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password[0]
            })
            .then(data => console.log(data))
            .catch(err => res.send(err))
        }
        res.send("password tidak sama")
    }
}

module.exports = Controller