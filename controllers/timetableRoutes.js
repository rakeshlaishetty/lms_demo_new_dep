//********************************* TIMETABLE ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Timetable = require("../Schemas/TimetableSchema");
const Teacher = require("../Schemas/TeacherSchema");
const School = require("../Schemas/SchoolSchema");
const Classes = require("../Schemas/ClassesSchema");

router.get("/getTeacherSchedule", async (req, res) => {
  let schedule = [];
  const classes = await Classes.find({ school: req.query.schoolId });
  for (let item of classes) {
    for (let subject of item.subjects) {
      if (subject.faculty && subject.faculty.equals(req.query.teacherId)) {
        let temp = await Timetable.find({
          classId: item._id,
          subjectId: subject.subjectId,
        }).populate("subjectId");
        for (let doc of temp) {
          schedule.push({
            day: doc.day,
            timeSlot: doc.timeSlot,
            subject: doc.subjectId.name,
            class: item.class,
            division: item.division,
          });
        }
      }
    }
  }

  res.status(200).send(schedule);
});

router.get('/getStudentSchdule', async (req, res) => {
  let day = (new Date()).getDay();

  let schedule = await Timetable.find({classId: req.query.classId, day: day-1});
  res.status(200).send(schedule);
})

router.post("/addSchedule", async (req, res) => {
  const newSchedule = {
    _id: new mongoose.Types.ObjectId(),
    day: req.body.day,
    timeSlot: req.body.timeSlot,
    subjectId: mongoose.Types.ObjectId(req.body.subjectId),
    classId: mongoose.Types.ObjectId(req.body.classId),
    schoolId: mongoose.Types.ObjectId(req.body.schoolId),
  };

  const doc = new Timetable(newSchedule);

  doc
    .save()
    .then(async (s) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

module.exports = router;
