const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
  res.locals.navlinks = {
    "Artists" : "artists",
    "Exhibitions" : "exhibitions",
    "Editions" : "editions"
  }
   next()
})

/* The next three functions fetch data, and pass it on as part of req obj  */

function getArtists(req, res, next) {
  req.artists = {};
  dataModel.readTable("artists", function(data) {
    req.artists = data;
    next();
  });
}

function getEditions(req, res, next) {
  req.editions = {};
  dataModel.readTable("editions", function(data) {
    Object.keys(data).forEach(function (id) {
      let price = data[id].price;
      if (price % 100) {           /* if price is not whole dollar amount */
        price = (parseInt(price) / 100).toFixed(2);      /* include cents */
      } else {
        price = (parseInt(price) / 100);        /* otherwise omit decimal */
      }
      data[id].price = price;
    });
    req.editions = data;
    next();
  });
}

function getEvents(req, res, next) {
  dataModel.readTable("events", function (data) {
    req.events = data;
    next();
  });
}

/* Fetch data, render homepage                                            */

router.get('/', function (req, res) {
  getArtists
  getEditions
  getEvents
  res.render("index")
});

module.exports = router
