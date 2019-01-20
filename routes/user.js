const express = require('express')
const router = express.Router()
const shortid = require('shortid')

const validate = require('../validate/user')
const db = require('../db')

router.get('/', (req, res) => {
  res.render("users/index", {
    users: db.get('users').value()
  })
})

router.get('/create', (req, res) => {
  res.render("users/create")
})

router.post('/create', validate.postCreate, (req, res) => {
  req.body.id = shortid.generate()
  db.get("users").push(req.body).write()
  res.redirect('/users')
})

router.get('/search', (req, res) => {
  const {q} = req.query
  const matchedUsers = db.get('users').value().filter(u => u.name.toLowerCase().indexOf(q.toLowerCase()) !== -1)
  res.render("users/index", {
    users: matchedUsers
  })
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const user = db.get('users').find({id}).value()
  res.render("users/view", { user })
})


module.exports = router