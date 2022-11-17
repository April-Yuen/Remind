require('../database/connectDB')
const Exercise = require("../models/Exercise");
const { generateExerciseVideoThumbnail } = require("../utils/generateYoutubeThumbnail");

module.exports = {
    getIndex: (req, res) => {
        res.render("index.ejs");
    },
    getExercise: async (req, res) => {
        try {
            const limitNumber = 1
            let latest = await Exercise.find({}).sort({ _id: -1 }).limit(limitNumber)

            if (latest.length > 0) {
                const embedVideoUrl = latest[0].videoURL.replace("watch?v=", "embed/");
                latest[0].videoURL = embedVideoUrl
            }

            res.render('posts', { title: "Remind Exercise - Home", latest, user: req.user })
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
            const exercise = await Exercise.findById(videoId);

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
    // Put- Not Like Story
    markNotFavorite: async (req, res) => {
        let videoId = req.body.exerciseId
        console.log(videoId)
        try {
            const exercise = await Exercise.findById(videoId);

            exercise.favoritesBy = exercise.favoritesBy.filter(id => id.toString() !== req.user.id.toString())
            console.log(exercise.favoritesBy)

            await exercise.save()

            req.user.favorites = req.user.favorites.filter(exercise => exercise !== videoId)

            console.log(req.user.favorites)

            await req.user.save()

            // const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
            //     isFavorite: !exercise.isFavorite
            // }, { new: true });
            console.log('Marked not like', videoId)
            res.json('Marked not like')
            // res.json(updatedExercise);
        } catch (err) {
            console.log(err)
        }
    },
    markComplete: async (req, res) => {
         let videoId = req.body.exerciseId
        let userId = (req.user.id).toString()
        console.log(userId)
        console.log(videoId)
        try {
            const exercise = await Exercise.findById(videoId);

            let arr = exercise.completedBy

            arr.push(userId)

            await exercise.save()

            req.user.completed.push(videoId)

            await req.user.save()

            // const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
            //     isFavorite: !exercise.isFavorite
            // }, { new: true });
            console.log('Marked Complete', videoId)
            res.json('Marked Complete')
            // res.json(updatedExercise);
        } catch (err) {
            console.log(err)
        }
    },
    markIncomplete: async (req, res) => {
        let videoId = req.body.exerciseId
        console.log(videoId)
        try {
            const exercise = await Exercise.findById(videoId);

            exercise.completedBy = exercise.completedBy.filter(id => id.toString() !== req.user.id.toString())
            console.log(exercise.completedBy)

            await exercise.save()

            req.user.completed = req.user.completed.filter(exercise => exercise !== videoId)

            console.log(req.user.completed)

            await req.user.save()

            // const updatedExercise = await Exercise.findByIdAndUpdate({ _id: req.body.exerciseId }, {
            //     isFavorite: !exercise.isFavorite
            // }, { new: true });
            console.log('Marked Incomplete', videoId)
            res.json('Marked Incomplete')
            // res.json(updatedExercise);
        } catch (err) {
            console.log(err)
        }
    },
    favoritesPage: async (req, res) => {
        try {
            // Querying the database to find all the exercises the user marked as favorite. 
            // Checking if the current logged in userid is in the exercise's favoritesBy array. 
            // https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
            const favoriteExercises = await Exercise.find({favoritesBy: {$elemMatch : {$eq: req.user.id}}});
            console.log(favoriteExercises)


            const favoritesWithThumbnails = generateExerciseVideoThumbnail(favoriteExercises);
            console.log(favoritesWithThumbnails)

            const noFavorites = favoriteExercises.length === 0;

            res.render("favorite", { favorites: favoritesWithThumbnails, noFavorites, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    completedPage: async (req, res) => {
        try {
            // Querying the database to find all the exercises the user marked as favorite. 
            // Checking if the current logged in userid is in the exercise's favoritesBy array. 
            // https://www.mongodb.com/docs/manual/reference/operator/query/elemMatch/
            const completeExercises = await Exercise.find({completedBy: {$elemMatch : {$eq: req.user.id}}});
            console.log(completeExercises)


            const completedWithThumbnails = generateExerciseVideoThumbnail(completeExercises);
            console.log(completedWithThumbnails)

            const notComplete = completeExercises.length === 0;

            res.render("completed", { completed: completedWithThumbnails, notComplete, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    exerciseDetails: async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.params.id);

            const embedVideoUrl = exercise.videoURL.replace("watch?v=", "embed/");
            exercise.videoURL = embedVideoUrl;

            res.render("exercise", { exercise, user: req.user });
        } catch (error) {
            console.error(error);
        }
    },
    exercisesPage: async (req, res) => {
        try {
            const exercises = await Exercise.find();

            const exercisesWithThumbnails = generateExerciseVideoThumbnail(exercises);

            const noExercises = exercises.length === 0;

            res.render("exercises", { exercises: exercisesWithThumbnails, noExercises, user: req.user });
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
