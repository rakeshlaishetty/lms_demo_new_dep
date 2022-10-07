//********************************* ASSIGNMENT ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
require('dotenv').config()

const Assignment = require("../Schemas/AssignmentSchema");

const { assign } = require("nodemailer/lib/shared");

cloudinary.config({
  cloud_name: 'db0vkpdye',
  api_key: '321311331486674',
  api_secret: '3K_bVdk1OhgWQFvfQi-qKOZiGdY'
});


router.get("/getAssignments", async (req, res) => {
  let assignments = await Assignment.find({
    facultyId: req.query.facultyId,
  }).populate("subjectId");
  res.status(200).send(assignments);
});

router.get("/getAssignmentsBySubjects", async (req, res) => {
  let assignments = await Assignment.find({ classId: req.query.classId });
  let data = {};
  for (let assignment of assignments) {
    data[assignment.subjectId] = [];
  }

  for (let assignment of assignments) {
    data[assignment.subjectId].push(assignment);
  }

  res.status(200).send(data);
});

router.get("/getDashboardAssignmentsTeacher", async (req, res) => {
  let lower = new Date();
  lower.setDate(lower.getDate() - 5);

  let assignments = await Assignment.find({
    facultyId: req.query.facultyId,
    date: { $gte: lower },
  });
  res.status(200).send(assignments);
});

router.get("/getAssignmentsPerformance", async (req, res) => {
  let assignment = await Assignment.findOne({ _id: req.query.id });
  let temp = assignment.submission;
  temp.sort((a, b) => {
    return b.marks - a.marks;
  });

  res.status(200).send(temp);
});

router.get("/getPerticularAssignment", (req, res) => {
  Assignment.findOne({ _id: req.query.id })
    .populate("facultyId")
    .then((aiss) => {
      res.status(200).send({
        status: true,
        message: "route  working fine student assignment sent",
        aiss: aiss,
      });
    })
    .catch((e) => {
      console.log("error occured while getting the student assignments ,", e);
      res.send({
        status: false,
        message: "route not working fine student assignment not sent",
        error: e,
      });
    });
});

router.get("/getPendingAssignments", async (req, res) => {
  let pending = [];
  let assignments = await Assignment.find({ classId: req.query.classId }).sort({
    date: -1,
  });
  for (let item of assignments) {
    let found = false;
    for (let sub of item.submission) {
      if (sub._id.equals(req.query.studentId)) {
        found = true;
      }
    }
    if (!found) pending.push(item);
  }

  res.status(200).send(pending);
});

router.post("/createAssignment", async (req, res) => {
  const newAssign = {
    _id: new mongoose.Types.ObjectId(),
    assignmentName: req.body.name,
    facultyId: req.body.facultyId,
    deadline: req.body.deadline,
    mins: req.body.mins,
    sec: req.body.sec,
    classId: req.body.class,
    subjectId: req.body.subjectId,
  };

  const nAssign = new Assignment(newAssign);
  nAssign
    .save()
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log("error while creatring the nwe assignment ");
      res.send({ status: false, message: "route not working fine" });
    });
});

router.post("/deleteAssignment", async (req, res) => {
  try {
    await Assignment.deleteOne({ _id: req.body.id });
    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

router.post("/addAssignmentQuestion", async (req, res) => { 
  let uploadResponse;
  
  if(req.body.img){
    uploadResponse = await cloudinary.uploader.upload(req.body.img, {folder: 'Assignment Images'});
  }
  
  Assignment.updateOne(
    { _id: req.body.assignId },
    { $push: { questions: {...req.body, img: req.body.img ? uploadResponse.url : ''} } }
  )
    .then((resp) => res.status(200).send())
    .catch((err) => res.status(500).send(err.message));
});

router.post("/updateScore", async (req, res) => {
  Assignment.updateOne(
    { _id: req.body.assignmentId },
    {
      $push: {
        submission: {
          name: req.body.studentName,
          marks: req.body.score,
          _id: mongoose.Types.ObjectId(req.body.studentId)
        }
      }
    }
  )
    .then((resp) => res.status(200).send())
    .catch((err) => res.status(500).send(err.message));
});

module.exports = router;
