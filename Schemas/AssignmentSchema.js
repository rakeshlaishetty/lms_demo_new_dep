const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  questions: Array,
  assignmentName: String,
  subject: String,
  chapter: String,
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teacher'
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  deadline: {
    type: Date
  },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  },
  mins: {
    type: Number,
    default: null
  },
  sec: {
    type: Number,
    default: null
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects'
  },
  submission: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("assignment", assignmentSchema, "assignment");
