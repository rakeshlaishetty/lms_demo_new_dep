//********************************* ATTENDANCE ROUTES ****************************************** */

var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const Attendance = require("../Schemas/AttendanceSchema");
const TeacherAttendance = require("../Schemas/TeacherAttendanceSchema")
const Student = require("../Schemas/StudentSchema");


router.get("/getTeacherAttendance", async (req, res) => {
  let date = new Date();
  let foundAttendance = await TeacherAttendance.find({
    teacherId: req.query.teacherId,
    date: date.toDateString(),
  });
  if (foundAttendance.length) {
    res.status(200).send(true);
  } else {
    res.status(200).send(false);
  }
});

router.get('/getTeacherAttendanceData', async (req, res) => {
  let attendance = await TeacherAttendance.find({teacherId: req.query.teacherId}).sort({ $natural: 1 });
  let data = attendance.map(item => item.date.toDateString())
  res.status(200).send(data);
})

router.post("/markTeacherAttendance", async (req, res) => {
  let date = new Date();
  date = date.toDateString();
  const nDoc = {
    _id: new mongoose.Types.ObjectId(),
    teacherId: req.body.teacherId,
    date: date,
  };
  const newDoc = new TeacherAttendance(nDoc);

  newDoc
    .save()
    .then((s) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

router.get("/getAttendance", async (req, res) => {
  let date = new Date(req.query.date);
  let attendanceData = await Attendance.findOne({
    classId: req.query.classId,
    date: date.toDateString(),
  });

  let allStudents = await Student.find({class: req.query.classId}, {_id: 1, name: 1});
  let allAttendance = await Attendance.find({classId: req.query.classId});

  let average = {}
  for(let student of allStudents){
    average[student._id] = 0
  }

  for(let student of allStudents){
    for(let doc of allAttendance){
      if(!doc.absentStudents.includes(student._id)){
        average[student._id] += 1
      }
    }
  }

  let data = []
  if(attendanceData !== null){
    for(let student of allStudents){
      if(attendanceData.absentStudents.includes(mongoose.Types.ObjectId(student._id))){
        data.push({_id: student._id, name: student.name, present: false})
      }else{
        data.push({_id: student._id, name: student.name, present: true})
      }
    }
  }

  

  res.status(200).send({data: data, average: average, total: allAttendance.length});
});

router.get('/getTotalAttendance', async (req, res) => {
  let allStudents = await Student.find({class: req.query.classId}, {_id: 1, name: 1}).sort({name: 1});
  let allAttendance = await Attendance.find({classId: req.query.classId});

  let average = []
  
  for(let student of allStudents){
    let present = 0;
    for(let doc of allAttendance){
      if(!doc.absentStudents.includes(student._id)){
        present += 1
      }
    }
    average.push({_id: student._id, name: student.name, present: present});
  }

  res.status(200).send({average: average, total: allAttendance.length});

})

router.get("/checkStudentAttendanceSubmitted", async (req, res) => {
  let date = new Date();
  date = date.toDateString();
  let attendance = await Attendance.find({
    classId: req.query.classId,
    date: date,
  });
  if (attendance.length) {
    res.status(200).send({submitted: true, absent: attendance[0].absentStudents.length});
  } else {
    res.status(200).send({submitted: false, absent: null});
  }
});

router.get("/getAttendanceOfWeek", async (req, res) => {
  const total = await Student.countDocuments({class: req.query.classId});

  const date = new Date()
  const day = date.getDay()

  const daysRemaining = 5 - day
  const daysBefore = 5 - daysRemaining - 1

  const days = []
  for(let i=1; i<=daysBefore; i+=1){
    let d = new Date()
    days.push((new Date(d.setDate(d.getDate() - i))).toDateString())
  }
  for(let i=0; i<=daysRemaining; i+=1){
    let d = new Date()
    days.push((new Date(d.setDate(d.getDate() + i))).toDateString())
  }

  const data = [];
  for(let i=0; i<days.length; i++){
    let doc = await Attendance.findOne({classId: req.query.classId, date: days[i]});
    if(doc){
      data.push({date: days[i], value: total - doc.absentStudents.length})
    }else{
      data.push({date: days[i], value: null})
    }
  }

  data.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return new Date(a.date) - new Date(b.date);
  });

  res.status(200).send(data)

})

router.post("/markStudentAttendance", async (req, res) => {
  let date = new Date();
  date = date.toDateString();
  const nDoc = {
    _id: new mongoose.Types.ObjectId(),
    classId: req.body.classId,
    absentStudents: req.body.absent,
    date: date,
  };
  const newDoc = new Attendance(nDoc);

  newDoc
    .save()
    .then((s) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});


router.get('/getStudentAttendance', async (req, res) => {
  let attendance = await Attendance.find({classId: req.query.classId});
  let data = [];
  for(let item of attendance){
    if(item.absentStudents.includes(req.query.studentId)){
      data.push({date: item.date, present: false});
    }else{
      data.push({date: item.date, present: true});
    }
  }

  res.status(200).send(data);
})

module.exports = router;