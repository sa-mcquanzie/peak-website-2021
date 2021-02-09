// Require packages

const express = require("express")
const path = require("path")
const bodyParser = require("body-parser")
const pluralize = require("pluralize")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
const { Sequelize, DataTypes, Model } = require("sequelize")

// Require routes

const homeRouter = require("./routes/home")
const artistsRouter = require("./routes/artists")
const editionsRouter = require("./routes/editions")
const exhibitionsRouter = require("./routes/exhibitions")
const adminRouter = require("./routes/admin")
const loginRouter = require("./routes/login")

const db = require("./models")
const app = express()
const port = process.env.PORT

userLoggedIn = false

app.listen(port, () => console.log(`${process.env.APP_NAME} is running`))

app.engine("pug", require("pug").__express)

app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "pug")

app.locals.basedir = "/"
app.locals.stylesheet = app.locals.basedir + "static/css/style.css"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use("/static", express.static("public"))

app.use("/", homeRouter)
app.use("/artists", artistsRouter)
app.use("/editions", editionsRouter)
app.use("/exhibitions", exhibitionsRouter)
app.use("/login", loginRouter)
app.use("/admin", adminRouter)

app.get("/auth/google", passport.authenticate("google",
  { scope: ["profile", "email" ] })
)

app.get("/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login",
    failureRedirect: "/admin"
  })
)

app.get("/logout", (req, res) => {
  userLoggedIn = false
  app.locals.userName = null
  res.redirect("/")
})

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  },
  (token, refreshToken, profile, done) => {
    if (profile._json.hd === process.env.ORG_DOMAIN) {
      userLoggedIn = true
      app.locals.username = profile._json.given_name
      console.log(`Logged in successfully as ${app.locals.username}!`)
      return done()
    }
    else {
      userLoggedIn = false
      console.log("Not a member of peak-art.org")
      return done(new Error("Invalid host domain"))
    }
  })
)

async function syncDB() {
  try {
    await db.sequelize.authenticate()
    console.log("Connection has been established successfully.")
    await db.sequelize.sync({ force: true })
    console.log("All models were synchronized successfully.")
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

syncDB()

module.exports = app
