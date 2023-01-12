const mongoose = require('mongoose');
mongoose.connect(process.env.DB_STRING)
 
 const db = mongoose.connection;
 db.on('error', console.error.bind(console, 'connection error:'))
 db.once('open', function(){
     console.log('Connected to database')
 }) 
 
//  Models
require('../models/Exercise')

