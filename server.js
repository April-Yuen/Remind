const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
const PORT = 2121
require('dotenv').config()



// Mongo Connection
let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'workout',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
        collection = db.collection('categories')
    })

// Middleware- must be put prior to any CRUD operations
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('index.ejs')
    })
    .catch(error => console.error(error))
})

app.get('/completed', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('completed.ejs')
    })
    .catch(error => console.error(error))
})

app.get('/favorite', (request, response) => {
    collection.find().toArray()
    .then(results => {
        console.log(results)
        response.render('favorite.ejs')
    })
    .catch(error => console.error(error))
})



// Port connection
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})