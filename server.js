const express = require('express')
const app = express()
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const PORT = 8000 || process.env.PORT

require('dotenv').config()

// Middleware- must be put prior to any CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


// middleware to save data and cookie sessions
app.use(cookieParser('RemindDatabaseSecure'))
app.use(session({
    secret: "RemindDatabaseSecretSession",
    saveUninitialized: false,
    resave: false
}))

app.use(flash())


const routes = require('./routes/exerciseRoutes.js')
app.use("/", routes)


// Port connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
