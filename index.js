const express = require('express')
const bodyParser = require('body-parser')
const shortid = require('shortid')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const app = express()
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

const port = 3000

app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.render("index", {
    name: "Tien"
  })
})

app.get('/users', (req, res) => {
  res.render("users/index", {
    users: db.get('users').value()
  })
})

app.get('/users/create', (req, res) => {
  res.render("users/create")
})

app.post('/users/create', (req, res) => {
  req.body.id = shortid.generate()
  db.get("users").push(req.body).write()
  res.redirect('/users')
})

app.get('/users/:id', (req, res) => {
  const {id} = req.params
  const user = db.get('users').find({id}).value()
  res.render("users/view", { user })
})

app.get('/users/search', (req, res) => {
  const {q} = req.query
  const matchedUsers = users.filter(u => u.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  res.render("users/index", {
    users: matchedUsers
  })
})

app.listen(port, () => console.log(port))