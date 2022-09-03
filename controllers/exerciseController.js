require('../database/connectDB')
const { response } = require('express');
const Exercise = require("../models/Exercise");


//Get homepage
exports.getExercise = async(req, res) => {
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
}

// Get add-video
exports.addVideo = async(req, res) => {
    const infoErrorsObj = req.flash("infoErrors")
    const infoSubmitObj = req.flash("infoSubmit")
    res.render('add-video', {title: "Remind Exercise - Add a Video", infoErrorsObj, infoSubmitObj})
}

// Submit Video
//   exports.addVideoOnPost = async(req, res) => {
//       try{
//       const newExercise = new Exercise({
//           title: req.body.title,
//           videoURL: req.body.videoURL,
//           description: req.body.description,
//           isFavorite: false,
//           timestamps: true
//       })
//       console.log(newExercise)
//       newExercise.save()
//       req.flash('infoSubmit', "Video has been added.")
//       res.redirect('/add-video')
//       }catch{
//           req.flash('infoErrors', error)
//           console.log(error)
//           res.redirect('/add-video')

//       }
//   }

 exports.addVideoOnPost = async(req, res) => {
     try {
        const {
            title, 
            videoURL, 
            description, 
            isFavorite
        } = req.body;
        console.log(req.body)

        const SubmittedVideoUrlExists = await Exercise.findOne({
            videoURL
        });
        if(SubmittedVideoUrlExists) {
            response.json({success: false, message: "An exercise with that video url already exists."})
            return;
        }
        const newExercise = {
            title, 
            videoURL,
            description,
            isFavorite
        }
        const createdExercise = await Exercise.create(newExercise)
        req.flash('infoSubmit', "Video has been added.")
        res.redirect('/add-video')

        
      
    }catch (error) {
        if(error.name === "ValidationError"){
            response.status(400).json({success: false, message: error.message})
        }else{
            console.error(error);
            response.status(500).json({success: false, message: "Server Error"})
            req.flash('infoErrors', 'Video cannot be added.')
            res.redirect("/add-video")
        }
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
