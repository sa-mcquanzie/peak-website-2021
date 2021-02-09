const express = require("express")
const router = express.Router()
// const dataModel = require("../models/data-model.js")

router.get('/', (req, res) => res.render("artists"), )

router.get('/:artist', (req, res) => res.send(req.params))

module.exports = router
