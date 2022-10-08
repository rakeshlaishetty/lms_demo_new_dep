const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: String,
  class: Number,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

module.exports = mongoose.model("subjects", subjectSchema, "subjects");
