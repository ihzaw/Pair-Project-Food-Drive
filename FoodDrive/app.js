const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/')
app.get('/login')
app.get('/register')
app.post('/register')
app.get('/login/:username')
app.post('/login/:username')
app.get('/')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})