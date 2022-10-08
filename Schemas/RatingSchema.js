const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  ratings: Array
});

module.exports = mongoose.model("ratings", RatingSchema, "ratings");
