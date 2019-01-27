const express = require('express')
const router = express.Router()

const db = require('../db')

router.get('/login', (req, res) => {
  res.render("auth/login", {
    users: db.get('users').value()
  })
})


module.exports = router