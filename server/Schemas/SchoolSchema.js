const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  _id:mongoose.Schema.Types.ObjectId,
  name: String,
  address: String,
  city: String,
  pincode: String,
  logo: {
    data: Buffer,
    contentType: String
  },
  sessionStart: String,
  paymentDay: Number
});

module.exports = mongoose.model("schools", schoolSchema, "schools");
