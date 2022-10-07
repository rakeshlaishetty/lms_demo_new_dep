// message
// students:{
//     object_id,
//     seen
// }

const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const StudentAnnouncementSchema = new Schema({
  message: {
    type: String,
  },
  students: [{
    studentId: {
      type: Schema.ObjectId,
      ref: "student",
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

module.exports = mongoose.model("studentAnnouncement", StudentAnnouncementSchema, "studentAnnouncement");
