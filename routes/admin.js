// admin.js -- routes /admin/

const express = require("express")
const router = express.Router()
const db_action = require("../controllers/db_controller.js")
const pluralize = require("pluralize")
const capitalize = require("capitalize")
const app = require("../app")

pluralize.addPluralRule(/ephemeron$/i, "ephemera")
pluralize.addSingularRule(/ephemera$/i, 'ephemeron')

// Helper functions. (Put this route_helpers.js in /public/js)

const getFieldType = (field) => {
  let dates = ["start_date",
               "end_date",
               "production_date",
               "publication_date",
               "acquisition_date"]
  let numbers = ["isbn",
                 "edition_size",
                 "remaining",
                 "book_id",
                 "edition_id",
                 "ephemeron_id",
                 "event_id",
                 "post_id",
                 "work_id",
                 "price"
                ]
  let text = ["name",
              "given_name",
              "family_name",
              "title",
              "materials",
              "dimensions",
              "location"
             ]
  
  switch (field) {
  case dates.includes(field):
    break
  case numbers.includes(field):
    break
  case text.includes(field):
    
  }
  
}

// Function to check the user is logged in

const authenticate = (req, res, next) => {
  if (userLoggedIn) {
    return next()
  }
  else {
    res.redirect("/login")
  }
}

// Setup Local variables for whole /admin route


router.use((req, res, next) => {
  res.locals.navlinks = {
    "Admin Home": "admin",
    "Public Home": "",
    "Logout": "logout"
  }

  let models = ["artist", "author", "book", "edition",
                "ephemeron", "event", "image", "post", "user", "work"]

  models.forEach(model => {
    res.locals.navlinks[
      capitalize(pluralize(model))] = "admin/list/" + pluralize(model)
  })
  next()
})

router.get("/", authenticate, (req, res) => {
  res.render("admin", { pagetitle: "Peak Admin" })
})

// CREATE route

router.post("/create/:item", authenticate, (req, res, cb) => {
  db_action.create(req, res, (created) => {
    res.redirect(`/admin/edit/${req.params.item}/${created.id}`)
  })

})

// READ route

router.get("/list/:collection", authenticate, (req, res) => {
  db_action.findAll(req, res, (data) =>
    res.render("admin-list", { 
      pagetitle: "All" + capitalize(pluralize(req.params.collection)), 
      data: data,
      items: capitalize(req.params.collection),
      item: pluralize.singular(req.params.collection)
    })
  )
})

// UPDATE route (get)

router.get("/edit/:item/:id", authenticate, (req, res) => {
  db_action.findOne(req, res, (entry) => {
    res.render("admin-edit", {
      pagetitle: "Edit" + capitalize(req.params.item),
      entry: entry,
      item: req.params.item
    })
  })
})

// UPDATE route (post)

router.post("/update/:item/:id", authenticate, (req, res) => {
  db_action.update(req, res, () => {
    res.redirect("/admin/list/" + pluralize(req.params.item))
  })
})

// DELETE route

router.post("/delete/:item/:id", authenticate, (req, res) => {
  db_action.delete(req, res, ()  => {
    res.redirect("/admin/list/" + pluralize(req.params.item))
  })
})

module.exports = router
