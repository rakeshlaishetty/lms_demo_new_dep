const mongoose = require("mongoose");

const FeeTransactionSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  schoolId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'schools'
  },
  date: Date,
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'student'
  },
  amount: Number,
  nextDue: Date
});

module.exports = mongoose.model("fees_transactions", FeeTransactionSchema, "fees_transactions");
