require('../database/connectDB')
const Exercise = require("../models/Exercise");

module.exports = {
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
        }catch(err){
            console.log(err)
        }
    },
    favoritesPage: async (req, res) => {
        try {
            const favorites = await Exercise.find({
                isFavorite: true
            });
            
            const noFavorites = favorites.length === 0;
            
            res.render("favorite", { favorites, noFavorites });
        } catch (error) {
            console.error(error);
        }
    },
    completedPage: async (req, res) => {
        try {
            const completed = await Exercise.find({
                completed: true
            });
            
            res.render("completed", { completed });
        } catch (error) {
            console.error(error);
        }
    },
    exerciseDetails: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.params.id);

            const embedVideoUrl = exercise.videoURL.replace("watch?v=", "embed/");
            exercise.videoURL = embedVideoUrl;
            
            res.render("exercise", { exercise });
        } catch (error) {
            console.error(error);
        }
    }
}
