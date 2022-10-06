//********************************* ADMISSION ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");



const Student = require("../Schemas/StudentSchema");
const Classes = require("../Schemas/ClassesSchema");


router.get("/getAdmission", async (req, res) => {
  let data = await Student.find({ class: req.query.classId });
  res.status(200).send(data);
});

router.get("/getRecentAdmissions", async (req, res) => {
  let data = await Student.find({ $orderby: { $natural: -1 } }).limit(3).populate('class');
  res.status(200).send(data);
});



module.exports = router;