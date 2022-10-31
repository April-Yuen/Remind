require('../database/connectDB')
const { response } = require('express');
const Exercise = require("../models/Exercise");

module.exports = {
    getExercise: async (req, res) => {
        try {
            const limitNumber = 1
            let latest = await Exercise.find({}).sort({ _id: -1 }).limit(limitNumber)

            if(latest.length > 0){
              const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");
              latest[0].videoURL = embedVideoUrl
            }

            res.render('index', { title: "Remind Exercise - Home", latest, user : req.user })
        } catch (error) {
            console.error(error);
            res.render("error", { message: error.message });
        }
    },
    markFavorite: async (req, res) => {
        let videoId = req.body.exerciseId
        let userId = (req.user.id).toString()
        console.log(userId)
        console.log(videoId)
        try {
            const exercise = await Exercise.findById(req.body.exerciseId);

            let arr = exercise.favoritesBy

            arr.push(userId)

            await exercise.save()

            req.user.favorites.push(videoId)

            await req.user.save()

            // const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
            //     isFavorite: !exercise.isFavorite
            // }, { new: true });
            console.log('Marked Like', videoId)
            res.json('Marked Like')
            // res.json(updatedExercise);
        } catch (err) {
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.body.exerciseId);
            const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
                isComplete: !exercise.isComplete
            }, { new: true });

            console.log(updatedExercise);

            res.json(updatedExercise);
        } catch (err) {
            console.log(err)
        }
    },
    favoritesPage: async (req, res) => {
        try {
            const favorites = await Exercise.find({
                isFavorite: true
            });

            const noFavorites = favorites.length === 0;

            res.render("favorite", { favorites, noFavorites, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    completedPage: async (req, res) => {
        try {
            const completed = await Exercise.find({
                isComplete: true
            });

            const noCompleted = completed.length === 0;

            res.render("completed", { completed, noCompleted, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    exerciseDetails: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.params.id);

            const embedVideoUrl = exercise.videoURL.replace("watch?v=", "embed/");
            exercise.videoURL = embedVideoUrl;

            res.render("exercise", { exercise , user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    exercisesPage: async (req, res) => {
        try {
            const exercises = await Exercise.find();

            const noExercises = exercises.length === 0;

            res.render("exercises", { exercises, noExercises, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    addExercisePage: (req, res) => {
        res.render("add-exercise", { success: null, message: null });
    },
    addVideo: async (req, res) => {
        const infoErrorsObj = req.flash("infoErrors")
        const infoSubmitObj = req.flash("infoSubmit")
        res.render('add-video', { title: "Remind Exercise - Add a Video", infoErrorsObj, infoSubmitObj })
    },
    addVideoOnPost: async (req, res) => {
        try {
            let {
                title,
                videoURL,
                description
            } = req.body;

            videoURL = videoURL.split('&')[0]

            const SubmittedVideoUrlExists = await Exercise.findOne({
                videoURL
            });

            if (SubmittedVideoUrlExists) {
                res.render("add-exercise", { success: false, message: "An exercise with that video url already exists." })
                return;
            }

            const newExercise = {
                title,
                videoURL,
                description
            }
            const createdExercise = await Exercise.create(newExercise);
            res.redirect('/exercises/' + createdExercise._id);
        } catch (error) {
            if (error.name === "ValidationError") {
                res.render("add-exercise", { success: false, message: error.message })
            } else {
                console.error(error);
                res.render("add-exercise", { success: false, message: "Server Error" });
            }
        }
    }
}
