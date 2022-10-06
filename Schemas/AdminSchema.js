const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "Password cannot be blank"],
  },
  name: String,
  employee_id: String,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

module.exports = mongoose.model("admin", adminSchema, "admin");
