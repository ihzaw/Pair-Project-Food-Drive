const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 4000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.get('/')
app.get('/login')
app.post('/login')
app.get('/register', Controller.getRegister)
app.post('/register', Controller.postRegister)
app.get('/login/:username')
app.post('/login/:username')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})