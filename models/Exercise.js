const mongoose = require("mongoose")

const ExerciseSchema = new mongoose.Schema({
   title: {
      type: String,
      required: [true, "Please enter a title"],
      trim: true
   },
   videoURL: {
      type: String,
      validate: {
         validator: function (v) {
            return /^https:\/\/www.youtube.com\/.*$/.test(v)
         },
         message: props => `${props.value} is not a valid youtube link.`
      },
      required: [true, "Please enter a video url"],
      unique: true,
      trim: true
   },
   description: {
      type: String,
      required: [true, "Please enter a video url"],
      trim: true
   },
   isComplete: {
      type: Boolean,
      required: true,
      default: false
   },
   completedBy: {
      type: Array,
      default: []
   },
   favoritesBy: {
      type: Array,
      default: []
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
   },
}, {
   timestamps: true
})

module.exports = mongoose.model("Exercise", ExerciseSchema)

