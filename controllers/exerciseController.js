require('../database/connectDB')
const Exercise = require("../models/Exercise");

module.exports = {
//Get homepage
getExercise : async(req, res) => {
    try {
        const limitNumber = 1
        let latest = await Exercise.find({}).sort({_id: -1}).limit(limitNumber)

        const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");
        latest[0].videoURL = embedVideoUrl;

        res.render('index', {title: "Remind Exercise - Home", latest })
    } catch (error) {
        console.error(error);
        res.status(500).json({success: false, message: error.message})
    }
},
markFavorite: async (req, res)=>{
    try{
        await Exercise.findByIdAndUpdate({_id:req.body.todoIdFromJSFile},
            {
            isFavorite: true, 
        })
        res.render('index', {isFavorite : true})
        
        
        console.log('Marked Favorite')
        res.json('Marked Favorite')
    }catch(err){
        console.log(err)
    }
},


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
