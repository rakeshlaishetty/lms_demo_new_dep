const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  day: Number,
  timeSlot: Number,
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subjects'
  },
//   facultyId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'teachers'
//   },
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

module.exports = mongoose.model("timetable", timetableSchema, "timetable");
