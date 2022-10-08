const mongoose = require("mongoose");

const DocumentSharingSchema = new mongoose.Schema({
  name: String,
  DocType: {
    type:String,
    required:true
  },
  date:{
    type : Date,
    default: Date.now
  },
  shareWithClass: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
  sharedWithTeachers:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
    },
  ],
  sharedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "teacher",
  },
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "schools",
  },
  file:{
    type:String,
    required:true,
    select:false // this field won't be returned while quering the documentSharingSchema untill and unless this field is explicitly mentioned in query
  }
});

module.exports = mongoose.model(
  "documentSharing",
  DocumentSharingSchema,
  "documentSharing"
);
