//********************************* STAFF ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");

const Staff = require("../Schemas/StaffSchema");
const Teacher = require("../Schemas/TeacherSchema");
const SalaryTransactions = require("../Schemas/SalaryTransactionsSchema");


router.get('/getEmployee', async (req, res) => {
  let employee
  employee = await Staff.findOne({_id: req.query.empId});
  if(!employee){
    employee = await Teacher.findOne({_id: req.query.empId});
  }

  res.status(200).send(employee);
})

router.get('/getStaff', async (req, res) => {
    const staff = await Staff.find({staffType: req.query.staffType, schoolId: req.query.schoolId});
    res.status(200).send(staff)
})

router.post('/findStaff', async (req, res) => {
    let staff = await Staff.find({
        schoolId: mongoose.Types.ObjectId(req.body.schoolId),
        name: { $regex: req.body.name },
      });
    res.status(200).send(staff);
})

router.post("/addStaff", (req, res) => {
  let date = new Date()
  date = date.toDateString();

  const nStaff = {
    staffType: req.body.staffType,
    name: req.body.name,
    gender: req.body.gender,
    email: req.body.email,
    phone: req.body.phone,
    spouse: req.body.spouse,
    father: req.body.father,
    address: req.body.address,
    born: req.body.born,
    bankName: req.body.bankName,
    bankIFSC: req.body.bankIFSC,
    bank_acc_no: req.body.bank_acc_no,
    aadhar: req.body.aadhar,
    pan: req.body.pan,
    salary:{
        base: parseInt(req.body.salary.base),
        hra: parseInt(req.body.salary.hra),
        da: parseInt(req.body.salary.da),
        incentives: parseInt(req.body.salary.incentives),
        pf: parseInt(req.body.salary.pf),
        tds: parseInt(req.body.salary.tds),
        other: parseInt(req.body.salary.other),
    },
    schoolId: req.body.schoolId,
    joined: date
  };

  const staff = new Staff(nStaff);

  staff
    .save()
    .then((s) => {
      res.json({
        status: 200,
        message: "staff addded successfully",
      });
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
    });
});


router.get("/getSalaryTransactions", async (req, res) => {
  let data = await SalaryTransactions.find({ employeeId: req.query.empId }).sort({date: 1});
  res.status(200).send(data);
});


router.post('/creditSalary', async (req, res) => {
  let date = new Date()
  date = date.toDateString();

  const newTransaction = {
    _id: new mongoose.Types.ObjectId(),
    employeeId: req.body.empId,
    amount: parseInt(req.body.amount),
    date: date
  };

  const transaction = new SalaryTransactions(newTransaction);

  transaction
    .save()
    .then((s) => {
      res.json({
        status: 200
      });
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
      console.log(e)
    });
})

module.exports = router;
