const mongoose = require("mongoose");
const { Schema } = require("mongoose");



const StaffSchema = new Schema({
    staffType: String,
    name: String,
    gender: String,
    email: String,
    phone: String,
    address: String,
    dob: String,
    profile_pic: String,
    spouse: String,
    father: String,
    aadhar: String,
    pan: String,
    salary: mongoose.Schema.Types.Mixed,
    bank_acc_no: String,
    bankName: String,
    bankIFSC: String,
    schoolId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'schools'
    },
    joined: String
});


module.exports = mongoose.model("staff", StaffSchema, "staff");
