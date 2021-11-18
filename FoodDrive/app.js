const express = require('express')
const {UserController, MainController}  = require('./controllers/controller')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.get('/', UserController.getHome)
app.get('/login' , UserController.getLogin)
app.post('/login' , UserController.postLogin)
app.get('/register', UserController.getRegister)
app.post('/register', UserController.postRegister)
app.get('/login/:username')
app.post('/login/:username')

<<<<<<< HEAD
app.get('/admin/home', MainController.bridge)
app.get('/admin/home/storesList', MainController.fetchRestaurantData)
app.get('/admin/home/addRestaurant', MainController.newRestaurantForm)
app.post('/admin/home/addRestaurant', MainController.saveNewRestaurant)
app.get('/admin/home/storesList/:StoreId', MainController.fetchSelectedRestaurant)
app.get('/admin/home/storesList/:StoreId/delete', MainController.deleteRestaurant)
app.get('/admin/home/addNewMenu', MainController)
app.get('/:username/home', MainController)
=======

app.get('/admin/home', MainController.getAdminHomePage)
app.get('/admin/home/edit/restaurant/:restaurantId', MainController.getEditRestaurant)
app.post('/admin/home/edit/restaurant/:restaurantId', MainController.postEditRestaurant)

app.get('/admin/home/edit/food/:foodId', MainController.getEditFood)
app.post('/admin/home/edit/food/:foodId', MainController.postEditFood)

app.get('/admin/home/add/restaurant', MainController.getAddRestaurant)
app.post('/admin/home/add/restaurant', MainController.postAddRestaurant)

app.get('/admin/home/add/food', MainController.getAddFood)
app.post('/admin/home/add/food', MainController.postAddFood)

app.get('/:username/home') // GLENN
app.post('/:username/home') // update topup // GLENN
app.get('/:username/home/userdetail')
app.post('/:username/home/userdetail')
app.get('/:username/home/checkout') // IHZA
app.post('/:username/home/checkout') //update balance // IHZA


// app.get('/:username/home', MainController.UserHomePage)
>>>>>>> 7656f4448e7cb4eef29174dea3d7c8105d05f1fa

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})