// message
// teachers:{
//     object_id,
//     seen
// }

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TeacherAnnouncementSchema = new Schema({
  message: {
    type: String,
  },
  teachers: [{
    teacherId: {
      type: Schema.ObjectId,
      ref: "teacher",
    },
    seen: {
      type: Boolean,
      default:false
    },
  }],
  media:{ type: String , trim: true},
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

module.exports = mongoose.model("teacherAnnouncement", TeacherAnnouncementSchema, "teacherAnnouncement");
