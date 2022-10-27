const express = require('express')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const methodOverride = require("method-override");
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const PORT = 8000 || process.env.PORT


require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Middleware- must be put prior to any CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


// middleware to save data and cookie sessions
app.use(cookieParser('RemindDatabaseSecure'))
// app.use(session({
//     secret: "RemindDatabaseSecretSession",
//     saveUninitialized: false,
//     resave: false
// }))

//Use forms for put / delete
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash())

const routes = require('./routes/exerciseRoutes.js')
const authRoutes = require('./routes/authRoutes.js')

app.use("/", routes)
app.use("/auth", authRoutes)


// Port connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
