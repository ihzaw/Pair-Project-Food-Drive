const express = require('express')
const {UserController, MainController}  = require('./controllers/controller')
const app = express()
const port = 3000
const session = require('express-session')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))



app.use(session({ // BCRYPT
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: { 
    secure: false,
    sameSite: true 
  }
}))



app.get('/', UserController.getHome)
app.get('/login' , UserController.getLogin)
app.post('/login' , UserController.postLogin)
app.get('/register', UserController.getRegister)
app.post('/register', UserController.postRegister)
app.get('/login/:username')
app.post('/login/:username')


// app.use(function(req,res,next){
//   console.log(req.session)
//   next()
// })




// const test = app.use(function(req, res, next){
//   console.log("MAOSKOKSOKSOK")
//   next()
// })

app.use(function(req,res,next){ // BCRYPT
  console.log(req.session)
  if(!req.session.UserId){
    const error = 'Please login First'
    res.redirect(`/login?error=${error}`)
  } else {
    next()
  }
})


app.get('/admin/home', MainController.getAdminHomePage)
app.get('/admin/home/edit/restaurant/:restaurantId', MainController.getEditRestaurant)
app.post('/admin/home/edit/restaurant/:restaurantId', MainController.postEditRestaurant)

app.get('/admin/home/edit/food/:foodId', MainController.getEditFood)
app.post('/admin/home/edit/food/:foodId', MainController.postEditFood)

app.get('/admin/home/add/restaurant', MainController.getAddRestaurant)
app.post('/admin/home/add/restaurant', MainController.postAddRestaurant)

app.get('/admin/home/add/food', MainController.getAddFood)
app.post('/admin/home/add/food', MainController.postAddFood)

app.get('/:username/home', MainController.getUserHome) // GLENN
app.post('/:username/home', MainController.postUserHome) // update topup // GLENN
app.get('/:username/home/userdetail', MainController.getUserDetail)
app.post('/:username/home/userdetail', MainController.postUserDetail)
app.get('/:username/home/checkout') // IHZA
app.post('/:username/home/checkout') //update balance // IHZA


// app.get('/:username/home', MainController.UserHomePage)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})