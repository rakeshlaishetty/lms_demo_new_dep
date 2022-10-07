const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: String,
  class: Number,
  division: String,
  subjects: Array,
  faculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

module.exports = mongoose.model("classes", classSchema, "classes");
