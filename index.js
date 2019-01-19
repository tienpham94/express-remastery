const express = require('express')
const app = express()

const port = 3000

const users = [
  {id: 1, name: "no1"},
  {id: 2, name: "no2"},
  {id: 2, name: "tiendzai"},
]

app.set('view engine', 'pug')
app.set('views', './views')

app.get('/', (req, res) => {
  res.render("index", {
    name: "Tien"
  })
})

app.get('/users', (req, res) => {
  res.render("users/index", {
    users
  })
})

app.get('/users/search', (req, res) => {
  const {q} = req.query
  const matchedUsers = users.filter(u => u.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  res.render("users/index", {
    users: matchedUsers
  })
})

app.listen(port, () => console.log(port))