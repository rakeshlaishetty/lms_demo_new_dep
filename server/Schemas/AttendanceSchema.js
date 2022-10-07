const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  date:{
    type: String
  },
  absentStudents: [{ type: mongoose.Schema.ObjectId, ref: 'student' }],
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  }
});

module.exports = mongoose.model("attendance", AttendanceSchema, "attendance");
