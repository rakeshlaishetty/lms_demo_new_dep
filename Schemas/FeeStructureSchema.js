const mongoose = require("mongoose");

const feeStructureSchema = new mongoose.Schema({
_id: mongoose.Schema.Types.ObjectId,
class: String,
tuition: Number,
admission: Number,
transport: Number,
sports: Number
  
});

module.exports = mongoose.model("fee_structure", feeStructureSchema, "fee_structure");
