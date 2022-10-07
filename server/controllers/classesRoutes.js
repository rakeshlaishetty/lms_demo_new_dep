//********************************* CLASSES ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");



const Classes = require("../Schemas/ClassesSchema");

router.get('/getClass', async (req, res) => {
  let foundClass = await Classes.findOne({faculty: req.query.facultyId});
  res.status(200).send({classId: foundClass._id})
})

router.get("/getClasses", async (req, res) => {
  let classes = await Classes.find({ school: req.query.schoolId })
    .sort({ class: 1, division: 1 })
    .populate("faculty");
  let data = [];
  for (let item of classes) {
    let count = await Student.countDocuments({ class: item._id });
    data.push({ ...item._doc, count: count });
  }
  res.status(200).send(data);
});

module.exports = router;
