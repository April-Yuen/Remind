require('../database/connectDB')
const { response } = require('express');
const Exercise = require("../models/Exercise");

module.exports = {
    getExercise: async (req, res) => {
        try {
            const limitNumber = 1
            let latest = await Exercise.find({}).sort({ _id: -1 }).limit(limitNumber)

            const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");
            latest[0].videoURL = embedVideoUrl;

            res.render('index', { title: "Remind Exercise - Home", latest })
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: error.message })
        }
    },
    markFavorite: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.body.exerciseId);
            const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
                isFavorite: !exercise.isFavorite
            }, { new: true });

            res.json(updatedExercise);
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

            res.render("favorite", { favorites, noFavorites });
        } catch (error) {
            console.error(error);
        }
    },
    completedPage: async (req, res) => {
        try {
            const completed = await Exercise.find({
                isComplete: true
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
    },
    exercisesPage: async (req, res) => {
        try {
            const exercises = await Exercise.find();

            res.render("exercises", { exercises });
        } catch (error) {
            console.error(error);
        }
    },
    addExercisePage: (req, res) => {
        res.render("add-exercise");
    },
    addVideo: async (req, res) => {
        const infoErrorsObj = req.flash("infoErrors")
        const infoSubmitObj = req.flash("infoSubmit")
        res.render('add-video', { title: "Remind Exercise - Add a Video", infoErrorsObj, infoSubmitObj })
    },
    addVideoOnPost: async (req, res) => {
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
            if (SubmittedVideoUrlExists) {
                response.json({ success: false, message: "An exercise with that video url already exists." })
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
        } catch (error) {
            if (error.name === "ValidationError") {
                response.status(400).json({ success: false, message: error.message })
            } else {
                console.error(error);
                response.status(500).json({ success: false, message: "Server Error" })
                req.flash('infoErrors', 'Video cannot be added.')
                res.redirect("/add-video")
            }
        }
    }
}
