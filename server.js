const express = require('express') // help build out API
const app = express()
const flash = require('express-flash') // shows notifcations, error messages etc.
// const flash = require('connect-flash') // shows notifcations, error messages etc.
const session = require('express-session')//users stay logged in uses cookies client side, can see who is logged in, so we can build out posts linked to user etc.
const cookieParser = require('cookie-parser')
const logger = require("morgan");
const methodOverride = require("method-override"); //Browser only GET and POST, we can override methods coming in and treat GET and POST as DELETE, PUT etc.
const cors = require('cors')
const passport = require('passport') //enables us to use different strategies to login
const mongoose = require('mongoose') //Talks to MongoDB
const MongoStore = require('connect-mongo')(session) // stores session in MongoDB keeps user logged in even if exited 
const PORT = 8000 || process.env.PORT

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

// Middleware- must be put prior to any CRUD operations
  //Using EJS for Views - HTML is ultimatly sent t client
app.set('view engine', 'ejs')

  //Static Folder - CSS, JS, Img files, for base application to run
app.use(express.static('public'))

  //Body Parsing - pull stuff out of requests being made.
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//Logging
app.use(logger("dev"));

// CORS 
app.use(cors())


// middleware to save data and cookie sessions
app.use(cookieParser('RemindDatabaseSecure'))


//Use forms for put / delete - if query parameter is _method. able to override any request coming from server. reminder fetch is a web API - if Web API not supported by browser, request will still work. 
app.use(methodOverride("_method"))

// Setup Sessions - stored in MongoDB - 
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
app.use(passport.session()); // user stays logged in

app.use(flash()) // error mesages

//routes
const routes = require('./routes/exerciseRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
app.use("/", routes) 
app.use("/auth", authRoutes)


// Port connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}, you better catch it!`)
})
