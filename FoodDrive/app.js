const express = require('express')
const {UserController, MainController}  = require('./controllers/controller')
const app = express()
const port = 4000

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

app.get('/admin/home', MainController)
app.get('/:username/home', MainController.UserHomePage)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})