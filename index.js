const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const port = 3000
const userRoute = require('./routes/user')

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render("index", {
    name: "Tien"
  })
})

app.use('/users', userRoute)

app.listen(port, () => console.log(port))