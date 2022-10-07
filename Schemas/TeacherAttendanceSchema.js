const mongoose = require("mongoose");

const teacherAttendanceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: Date,
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teachers'
  }
});

module.exports = mongoose.model("teacher_attendance", teacherAttendanceSchema, "teacher_attendance");
