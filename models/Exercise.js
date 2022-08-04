const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter a title"],

        trim: true
    },
     videoURL: {
        type: String,
        required: [true, "Please enter a video url"], 
        unique: true, 
        trim: true
     },
     isFavorite: {
        type: Boolean,
        default: false,
     },
   },{
      timestamps:true 
})

module.exports = mongoose.model("Exercise", ExerciseSchema)