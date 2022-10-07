const mongoose = require("mongoose");

const SalaryTransactionsSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  date: String,
  employeeId: mongoose.Schema.Types.ObjectId,
  amount: Number
});

module.exports = mongoose.model("salary_transactions", SalaryTransactionsSchema, "salary_transactions");
