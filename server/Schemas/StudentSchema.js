// adharNumber: "s"
// admissionNum: "s"
// admissionRemark: "s"
// bus: "yes"
// catagory: "open"
// childWithSpecialNeed: "no"
// childid: "s"
// class: "s"
// dateOfAdmission: "2022-12-04"
// dob: "2000-12-05"
// enrollmentNo: "s"
// familyid: "s"
// fatherAccountNo: "s"
// fatherBankIfsc: "s"
// fatherBankName: "s"
// fatherContactNo1: "s"
// fatherContactNo2: "s"
// fatherEmail: "s"
// fatherName: "s"
// fatherOccupation: "s"
// fees_catagory: "four_months"
// gender: "male"
// guardianContactNo: "s"
// guardianEmail: "s"
// guardianName: "s"
// guardianOccupation: "s"
// handicapped: "yes"
// hostel: "no"
// library: "no"
// motherContactNo: "s"
// motherEmail: "s"
// motherName: "s"
// name: "s"
// prevClass: "s"
// prevSchoolName: "s"
// regestrationNo: "s"
// scholorshipNo: "s"
// section: "s"
// smsContact: "s"
// smsFacility: "no"
// studentAccountNo: "s"
// studentBankIfsc: "s"
// studentBankName: "s"
// studentConveyance: "yes"
// studentEmail: "s"
// studentNumber: "s"

const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  adharNumber: String,
  admissionNum: String,
  admissionRemark: String,
  bus: String,
  catagory: String,
  childWithSpecialNeed: String,
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'classes'
  },
  className: {
    type: String
  },
  dateOfAdmission: String,
  dob: String,
  enrollmentNo: String,
  fatherAccountNo: String,
  fatherBankIfsc: String,
  fatherBankName: String,
  fatherContactNo1: String,
  fatherContactNo2: String,
  fatherEmail: String,
  fatherName: String,
  fatherOccupation: String,
  fees_catagory: String,
  gender: String,
  guardianContactNo: String,
  guardianEmail: String,
  guardianName: String,
  guardianOccupation: String,
  handicapped: String,
  hostel: String,
  library: String,
  motherContactNo: String,
  motherEmail: String,
  motherName: String,
  name: String,
  prevClass: String,
  prevSchoolName: String,
  scholorshipNo: String,
  division: String,
  smsContact: String,
  smsFacility: String,
  studentAccountNo: String,
  studentBankIfsc: String,
  studentBankName: String,
  studentConveyance: String,
  email: String,
  studentNumber: String,
  attendence: [{ subject: String, percentage: Number }],
  fees: {
    type: mongoose.Schema.Types.Mixed
  },
  age: String,
  rollnumber: String,
  password: {
    type: String,
    default: "123456",
  },
  submittedAssignment: Array,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  },
  admissionDate: {
    type: Date,
    default: new Date()
  },
  paymentType: String
});

Student = mongoose.model("student", StudentSchema, "student");
module.exports = Student;
