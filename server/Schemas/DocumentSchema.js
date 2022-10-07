const mongoose = require("mongoose");

const documentsSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: String,
  category: String,
  format: String,
  url: String,
  bytes: Number,
  created: String,
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  }
});

module.exports = mongoose.model("documents", documentsSchema, "documents");
