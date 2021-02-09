"use strict"

const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = require(__dirname + "/../config/config.js")[env]
const db = {}

let sequelize

if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
}
else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password, config
  )
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) &&
      (file !== basename) &&
      (file.slice(-3) === ".js")
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model
  })

// Associations

// A book can have several authors
// ...and an author can write several books

db.book.belongsToMany(db.author, { through: "author_books" })
db.author.belongsToMany(db.book, { through: "author_books" })

// An edition can be from many artists (e.g. from a publication or a collective)
// ...and an artist can make many editions

db.edition.belongsToMany(db.artist, { through: "artist_editions" })
db.artist.belongsToMany(db.edition, { through: "artist_editions" })

// An ephemeron can be associated with many artists (e.g. group show materials)
// ...and an artist might have many ephemera associated with them

db.ephemeron.belongsToMany(db.artist, { through: "artist_ephemera" })
db.artist.belongsToMany(db.ephemeron, { through: "artist_ephemera" })

// An image can be used for many posts (e.g. a generic cover image or placeholder)
// ...and a post can have several images

db.image.belongsToMany(db.post, { through: "post_images" })
db.post.belongsToMany(db.image, { through: "post_images" })

// An image could belong to many events (e.g. an exhibition & an associated talk)
// ...and an event will almost certainly have many images

db.image.belongsToMany(db.event, { through: "event_images" })
db.event.belongsToMany(db.image, { through: "event_images" })

// An event could have many artists (e.g. a group show)
// ...and the same artist might be involved in many different events

db.event.belongsToMany(db.artist, { through: "artist_events" })
db.artist.belongsToMany(db.event, { through: "artist_events" })

// An artist will usually have several works
// ...and also a work could be by many artists (e.g. a collective)

db.work.belongsToMany(db.artist, { through: "artist_works" })
db.artist.belongsToMany(db.work, { through: "artist_works" })

// A book only has one image as its cover
// ...and an image can only be the cover of one book 

db.book.hasOne(db.image)
db.image.belongsTo(db.book)

// An edition can have several images
// ...but an image can only be used for one edition 

db.edition.hasMany(db.image)
db.image.belongsTo(db.edition)

// An ephemeron can have many images (maybe different angles, back & front, etc)
// .. but any image can only be used for one ephemeron

db.ephemeron.hasMany(db.image)
db.image.belongsTo(db.ephemeron)

// An art work can have many images
// ... but an image can only be used for one art work (BUT IS THIS TRUE???)

db.work.hasMany(db.image)
db.image.belongsTo(db.work)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
