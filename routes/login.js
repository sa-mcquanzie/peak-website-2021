// login.js -- routes /login/

const express = require("express")
const router = express.Router()

function authenticate(req, res, next) {
  if (userLoggedIn) {
    res.redirect("/admin")
  }
  else {
    return next()
  }
}

// ROUTE: /login

router.get('/', authenticate, (req, res) => {
  res.render("login", { pagetitle: 'Login' })
})

module.exports = router
