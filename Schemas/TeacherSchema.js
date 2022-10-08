// name
// email
// phone
// address
// employee_id
// age
// class[]
// profile_pic
// roll
// division
// degree[]
// attendence
// salary

const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
  email: String,
  phone: String,
  address: String,
  employee_id: String,
  division: [],
  attendence: [{ subject: String, percentage: Number }],
  class: [{ class: String, subject: String, division: String }],
  born: Date,
  age: String,
  profile_pic: String,
  spouse: String,
  father: String,
  degree: [],
  salary: mongoose.Schema.Types.Mixed,
  password: {
    type: String,
    default: '123456'
  },
  aadhar: String,
  pan: String,
  bank_acc_no: String,
  bankName: String,
  bankIFSC: String,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  }
});

Teacher = mongoose.model("teacher", TeacherSchema, "teacher");
module.exports = Teacher;
