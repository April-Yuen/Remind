require('../database/connectDB')
const Exercise = require("../models/Exercise");


//Get homepage
exports.getExercise = async(req, res) => {
    try {
        const limitNumber = 1
        const latest = await Exercise.find({}).sort({_id: -1}).limit(limitNumber)
        res.render('index', {title: "Remind Exercise - Home", latest})
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message})
    }
}


 // Insert Exercise to Database
//  async function insertDymmyExerciseData(){
//      try {
//          await Exercise.insertMany([
//              {
//              "title": "5 Min Daily Stretch - An everyday, full body routine", 
//              "videoURL": "https://www.youtube.com/watch?v=Ef6LwAaB3_E", 
//              "isFavorite": "false", 
//              },
//              {
//               "title": "5 Min. Morning Stretch | Full Body Flexibility Routine for Beginners", 
//               "videoURL": "https://www.youtube.com/watch?v=sAf67xFS-qE", 
//               "isFavorite": "false", 
//              }
//          ])
//      } catch (error) {
//          console.log('err', + error)
//      }
//  }
// insertDymmyExerciseData()
