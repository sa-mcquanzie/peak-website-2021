const express = require("express")
const router = express.Router()
//const dataModel = require("../models/data-model.js")

router.get('/', (req, res) => res.render("editions"), )

router.get('/:edition', (req, res) => res.send(req.params))

module.exports = router
