const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000 || process.env.PORT

require('dotenv').config()

// Middleware- must be put prior to any CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

const routes = require('./routes/exerciseRoutes.js')
app.use("/", routes)

// Port connection
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
