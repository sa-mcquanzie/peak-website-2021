const db = require('../models')
const Op = db.Sequelize.Op
const pluralize = require("pluralize")

// Create and save a new item to a collection

exports.create = (req, res, cb) => {
  const model = req.params.item
  
  db[model].create()
    .then(data => {
      cb(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || `Unable to create new ${model}`
      })
    })
}

// Retrieve all items of a collection from the database.

exports.findAll = (req, res, cb) => {
  console.log(req.params.collection)
  const model = pluralize.singular(req.params.collection)

  db[model].findAll({ raw: true })
    .then(data => {
      cb(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Failed to retrieve ${model}`
      })
    })
}

// Find a single collection item by id

exports.findOne = (req, res, cb) => {
  const model = req.params.item
  const id = req.params.id

  db[model].findByPk(id, { raw: true })
    .then(data => {
      cb(data)
    })
    .catch(err => {
      res.status(500).send({
        message: `Couldn't find ${model} with id: ${id}`
      })
    })
}

// Update a collection item by id

exports.update = (req, res, cb) => {
  const model = req.params.item
  const id = req.params.id

  db[model].update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(`${model} was updated successfully.`)
        cb()
      } else {
        res.send({
          message: `Couldn't update ${model} with id: ${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Couldn't update ${model} with id: ${id}`
      })
    })
}

// Delete a collection item by id

exports.delete = (req, res, cb) => {
  const model = req.params.item
  const id = req.params.id

    db[model].destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        console.log(`${model} was deleted successfully!`)
        db.sequelize.sync()
        cb()
      } else {
        res.send({
          message:  `Couldn't delete ${model} with id: ${id}.`
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Couldn't delete ${model} with id: ${id}.`
      })
    })
}
