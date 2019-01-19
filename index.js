const express = require('express')
const app = express()

const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render("index", {
    name: "Tien"
  })
})

app.get('/users', (req, res) => {
  res.render("users/index", {
    users: [
      {id: 1, name: "no1"},
      {id: 2, name: "no2"}
    ]
  })
})

app.listen(port, () => console.log(port))