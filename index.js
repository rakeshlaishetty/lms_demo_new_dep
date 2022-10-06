const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./connection/database")(mongoose);

// const Admin = require("./Schemas/AdminSchema");
// const School = require("./Schemas/SchoolSchema");
// const Student = require("./Schemas/StudentSchema");
// const Questions = require("./Schemas/Questions");
// const MathChapters = require("./Schemas/MathChaptersSchema");
// const MathQuestions = require("./Schemas/MathQuestionsSchema");
// const MathSimilarQuestions = require("./Schemas/MathSimilarQuestionSchema");
// const Attendance = require("./Schemas/AttendanceSchema");
// const FeeTransactions = require("./Schemas/FeeTransactionSchema");
// const SalaryTransactions = require("./Schemas/SalaryTransactionsSchema");
// const FeeStructure = require("./Schemas/FeeStructureSchema");
// const TeacherAnnouncement = require("./Schemas/TeacherAnnouncementSchema");
// const StudentAnnouncement = require("./Schemas/StudentAnnouncementSchema");
// const DocumentSharing = require("./Schemas/DocumentSharingSchema");
// const MathChapters = require('./Schemas/MathChaptersSchema');
// const MathQuestions = require('./Schemas/MathQuestionsSchema');
// const MathSimilarQuestions = require('./Schemas/MathSimilarQuestionSchema');
// const Attendance = require('./Schemas/AttendanceSchema');
// const FeeTransactions = require('./Schemas/FeeTransactionSchema');
// const SalaryTransactions = require('./Schemas/SalaryTransactionsSchema');
// const FeeStructure = require('./Schemas/FeeStructureSchema');
// const Subject = require("./Schemas/SubjectSchema");

const cors = require("cors");
const bodyparser = require("body-parser");
const localStorage = require("localStorage");
const session = require("express-session");
const sessionstorage = require("sessionstorage");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const blobStream = require("blob-stream");
const nodemailer = require("nodemailer");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const fileUpload = require("express-fileupload");
const path = require("path");

const filesPayloadExists = require("./middleware/filesPayloadExists");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const fileSizeLimiter = require("./middleware/fileSizeLimiter");

//********************************* CONTROLLERS ****************************************** */
const attendance = require("./controllers/attendanceRoutes");
const admin = require("./controllers/adminRoutes");
const admission = require("./controllers/admissionRoutes");
const classes = require("./controllers/classesRoutes");
const staff = require("./controllers/staffRoutes");
const fees = require("./controllers/feesRoutes");
const timetable = require("./controllers/timetableRoutes");
const assignments = require("./controllers/assignmentRoutes");

//********************************* CONFIGURATIONS ****************************************** */

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 100000000, httpOnly: false },
  })
);

app.use("/attendance", attendance);
app.use("/admin", admin);
app.use("/admission", admission);
app.use("/classes", classes);
app.use("/staff", staff);
app.use("/fees", fees);
app.use("/timetable", timetable);
app.use("/assignments/", assignments);

//********************************* SCHEMAS ****************************************** */

const School = require("./Schemas/SchoolSchema");
const Admin = require("./Schemas/AdminSchema");
const Attendance = require("./Schemas/AttendanceSchema");
const Student = require("./Schemas/StudentSchema");
const TeacherAttendance = require("./Schemas/TeacherAttendanceSchema");
const Questions = require("./Schemas/Questions");
const MathChapters = require("./Schemas/MathChaptersSchema");
const MathQuestions = require("./Schemas/MathQuestionsSchema");
const MathSimilarQuestions = require("./Schemas/MathSimilarQuestionSchema");
const FeeTransactions = require("./Schemas/FeeTransactionSchema");
const SalaryTransactions = require("./Schemas/SalaryTransactionsSchema");
const FeeStructure = require("./Schemas/FeeStructureSchema");
const TeacherAnnouncement = require("./Schemas/TeacherAnnouncementSchema");
const StudentAnnouncement = require("./Schemas/StudentAnnouncementSchema");
const DocumentSharing = require("./Schemas/DocumentSharingSchema");
// const MathChapters = require('./Schemas/MathChaptersSchema');
// const MathQuestions = require('./Schemas/MathQuestionsSchema');
// const MathSimilarQuestions = require('./Schemas/MathSimilarQuestionSchema');
// const Attendance = require('./Schemas/AttendanceSchema');
// const FeeTransactions = require('./Schemas/FeeTransactionSchema');
// const SalaryTransactions = require('./Schemas/SalaryTransactionsSchema');
// const FeeStructure = require('./Schemas/FeeStructureSchema');
const Classes = require("./Schemas/ClassesSchema");
const Subject = require("./Schemas/SubjectSchema");
const TimeTable = require("./Schemas/TimetableSchema");

//********************************* BASIC ROUTES ****************************************** */

app.get("/home", (req, res) => {
  req.session.name = "waghmare";
  // sessionstorage.setItem("userdata", "this is sessionstorage");

  // req.session.surname = "waghmare";
  res.json({ status: "workking fine" });
});

app.get("/getSchool", async (req, res) => {
  let school = await School.findOne({ _id: req.query.id });
  res.status(200).send(school);
});

app.get("/session", (req, res) => {
  res.json({ status: "workking fine" });
});

app.get("/getAdminDetails", async (req, res) => {
  const admin = await Admin.findOne({ _id: req.query.id }).populate("schoolId");
  res.status(200).send(admin);
});

app.get("/getTeacherDashboardDetails", async (req, res) => {
  let data = {};

  //Fetching today's schedule
  let date = new Date();
  let day = date.getDay() - 1;

  let schedule = [];
  let periods = await TimeTable.find({ schoolId: req.query.schoolId, day: day })
    .sort({ timeSlot: 1 })
    .populate(["classId", "subjectId"]);

  for (let period of periods) {
    for (let item of period.classId.subjects) {
      if (
        item.faculty &&
        item.subjectId.equals(period.subjectId._id) &&
        item.faculty.equals(req.query.facultyId)
      ) {
        schedule.push(period);
      }
    }
  }

  data["schedule"] = schedule;

  //Fetch Annouoncements
  const { facultyId, schoolId } = req.query;
  const announcements = await TeacherAnnouncement.find(
    {
      teachers: {
        $elemMatch: {
          teacherId: mongoose.Types.ObjectId(facultyId),
          seen: false,
        },
      },
      schoolId: mongoose.Types.ObjectId(schoolId),
    },
    {
      message: 1,
      teachers: {
        $elemMatch: {
          teacherId: mongoose.Types.ObjectId(facultyId),
          seen: false,
        },
      },
    }
  );
  data["announcements"] = announcements;

  res.status(200).send(data);
});

app.get("/allStudents", (req, res) => {
  let { schoolId } = req.query;
  Student.find({ schoolId })
    .then((stds) => {
      res.send({ status: true, students: stds });
    })
    .catch((e) => {
      console.log("error while gettkig all atds, ", e);
    });
});
app.get("/students/name", (req, res) => {
  let { schoolId, className, division } = req.query;
  division = new RegExp(`^${division}$`, "i");
  Student.find(
    {
      schoolId: mongoose.Types.ObjectId(schoolId),
      className: className,
      division,
    },
    { name: 1, _id: 1 }
  )
    .then((stds) => {
      res.send({ status: true, students: stds });
    })
    .catch((e) => {
      console.log("error while gettkig all atds, ", e);
    });
});

app.post("/findStudent", async (req, res) => {
  let students = await Student.find({
    schoolId: mongoose.Types.ObjectId(req.body.schoolId),
    name: { $regex: req.body.name },
  });
  res.status(200).send(students);
});

app.get("/getAttendance", async (req, res) => {
  let data = await Attendance.find({
    class: req.query.class,
    division: req.query.division,
  })
    .sort({ date: 1 })
    .populate("students");
  res.status(200).send(data);
});

app.get("/allTeachers", (req, res) => {
  let { schoolId } = req.query;

  Teacher.find({ schoolId: schoolId })
    .then((teachers) => {
      res.send({ status: true, teachers: teachers });
    })
    .catch((e) => {
      console.log("error while gettkig all teachs, ", e);
    });
});
app.get("/allTeachersName", (req, res) => {
  Teacher.find({}, { _id: 1, name: 1 })
    .then((teachers) => {
      res.send({ status: true, teachers: teachers });
    })
    .catch((e) => {
      console.log("error while gettkig all teachs, ", e);
    });
});

app.post("/addStudent", (req, res) => {
  // const st = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   phone: req.body.phone,
  //   address: req.body.address,
  //   mother_name: req.body.motherName,
  //   father_name: req.body.fatherName,
  //   division: req.body.division,
  //   // attendence: [{ subject: String, percentage: Number }],
  //   class: req.body.class,
  //   rollnumber: req.body.rollNumber,
  //   age: req.body.age,
  //   profile_pic: "jggjggkg/giug/ouojj",
  //   fees: req.body.fees,
  //   password: req.body.email,
  // };
  // res.send("fine add student");
  let stud = req.body.newStudent;
  stud.schoolId = req.body.schoolId;
  const student = new Student(stud);

  student
    .save()
    .then((s) => {
      res.status(200).send();
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
    });
});

app.post("/findStudent", async (req, res) => {
  let students = await Student.find({
    schoolId: mongoose.Types.ObjectId(req.body.schoolId),
    name: { $regex: req.body.name },
  });
  res.status(200).send(students);
});

app.get("/getClassCount", async (req, res) => {
  let count = await Classes.countDocuments({ school: req.query.schoolId });
  res.status(200).send(count.toString());
});

app.get("/getAdmissionPDF", async (req, res) => {
  var myDoc = new PDFDocument({ bufferPages: true });

  let buffers = [];
  myDoc.on("data", buffers.push.bind(buffers));
  myDoc.on("end", () => {
    let pdfData = Buffer.concat(buffers);
    res
      .writeHead(200, {
        "Content-Length": Buffer.byteLength(pdfData),
        "Content-Type": "application/pdf",
        "Content-disposition": "attachment;filename=test.pdf",
      })
      .end(pdfData);
  });

  myDoc.font("Times-Roman").fontSize(12).text(`this is a test text`);
  myDoc.end();
});

app.post("/deleteStudent", async (req, res) => {
  Student.deleteOne({ _id: req.body.id })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.post("/addTeacher", (req, res) => {
  const nTeacher = {
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
    salary: {
      base: req.body.salary.base,
      hra: req.body.salary.hra,
      da: req.body.salary.da,
      incentives: req.body.salary.incentives,
      pf: req.body.salary.pf,
      tds: req.body.salary.tds,
      other: req.body.salary.other,
    },
    schoolId: req.body.schoolId,
  };
  const teacher = new Teacher(nTeacher);

  teacher
    .save()
    .then((s) => {
      res.json({
        status: 200,
        message: "teacher addded successfully",
      });
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
    });
});

const Teacher = require("./Schemas/TeacherSchema");

app.get("/getTeachers", async (req, res) => {
  let teachers = await Teacher.find({ schoolId: req.query.schoolId });
  res.status(200).send(teachers);
});

// app.get("/getClasses", async (req, res) => {
//   let classes = await Classes.find({ school: req.query.schoolId })
//     .sort({ class: -1, division: 1 })
//     .populate("faculty");
//   let data = [];
//   for (let item of classes) {
//     let count = await Student.countDocuments({ class: item._id });
//     data.push({ ...item._doc, count: count });
//   }
//   res.status(200).send(data);
// });
app.get("/getClassWithSubjects", async (req, res) => {
  let classes = await Classes.findOne({ _id: req.query.classId });

  let data = {};
  let temp = [];
  for (let sub of classes.subjects) {
    let subject = await Subject.findOne({ _id: sub.subjectId });
    temp.push(subject);
  }
  data = { ...classes._doc, subjects: temp };

  res.status(200).send(data);
});

app.get("/getClasse/name/section", async (req, res) => {
  // let classes = await Classes.find({ school: req.query.schoolId })
  let { schoolId } = req.query;
  let classes = await Classes.find(
    { schoolId },
    { class: 1, division: 1 }
  ).sort({ class: 1, division: 1 });

  res.status(200).send(classes);
});

app.get("/getStudentsList", async (req, res) => {
  let students = await Student.find({
    class: req.query.classId,
  }).sort({ name: 1 });
  // let students = await Student.find({});
  res.status(200).send(students);
});

app.get("/logout", (req, res) => {
  localStorage.clear();
  res.send({
    test: "log out",
    status: true,
  });
});

app.get("/checkUser", (req, res) => {
  const cUser = localStorage.getItem("user");
  res.send({
    test: "logged in",
    status: true,
    user: cUser,
  });
});

// pass class,name as query
app.get("/filter", (req, res) => {
  let query = {};
  let className = req.query.class;
  // db.collection('Student').find(query).toArray((e,result)=>{
  //   if(e) throw e
  //   else {
  //     console.log(result)
  //     res.send(result)
  //   }
  // })
  // console.log(req.params,">",className)
  if (className) query.class = className;
  if (req.query.name) query.name = new RegExp(`${req.query.name}`, "gi");
  Student.find(query)
    .then((s) => {
      // console.log(s)
      res.send(s);
    })
    .catch((e) => console.error(e));
});
app.get("/filter/teacher", (req, res) => {
  let query = {};
  let className = req.query.class;
  // db.collection('Student').find(query).toArray((e,result)=>{
  //   if(e) throw e
  //   else {
  //     console.log(result)
  //     res.send(result)
  //   }
  // })
  // console.log(req.params,">",className)
  if (className) query["class.class"] = className;
  if (req.query.name) query.name = new RegExp(`${req.query.name}`, "gi");

  Teacher.find(query)
    .then((s) => {
      res.send(s);
    })
    .catch((e) => console.error(e));
});

app.post("/addClass", async (req, res) => {
  const newClass = {
    _id: new mongoose.Types.ObjectId(),
    class: req.body.class,
    division: req.body.division,
    faculty: req.body.faculty,
    school: req.body.school,
    subjects: [],
  };
  const doc = new Classes(newClass);

  doc
    .save()
    .then((s) => {
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

app.post("/login", (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (admin.password == req.body.password) {
        // localStorage.setItem("userdata", JSON.stringify(admin));
        console.log(admin);
        req.session.userdata = admin;
        res.send({
          test: "admin login",
          status: true,
          data: req.body,
          user: "admin",
          userdata: admin,
        });
      } else {
        res.send({
          test: "admin pass wrong",
          status: false,
          data: req.body,
          user: "admin",
        });
      }
    })
    .catch((e) => {
      console.log("eror while findng admin, ", e);
      console.log("checking for teacher now");

      Teacher.findOne({ email: req.body.email })
        .then(async (teacher) => {
          if (teacher.password == req.body.password) {
            // localStorage.setItem("user", "teacher");
            // localStorage.setItem("userdata", JSON.stringify(teacher));
            // console.log(typeof teacher);
            // sessionstorage.setItem("userdata", "this is sessionstorage");
            req.session.userdata = teacher;
            let classroom = await Classes.findOne({ faculty: teacher._id });
            // teacher['classDetails'] = classroom;
            sessionstorage.setItem("userdata", teacher);
            console.log(
              "this is user session from teacher ",
              req.session.userdata
            );
            res.send({
              test: "teacher login",
              status: true,
              data: req.body,
              user: "teacher",
              userdata: teacher,
              classDetails: classroom,
            });
          } else {
            res.send({
              test: "teacher pass wrong",
              status: false,
              data: req.body,
              user: "teacher",
            });
          }
        })
        .catch((e) => {
          console.log("eooro while login anyone dont know");
          Student.findOne({ email: req.body.email })
            .then(async (student) => {
              if (student.password == req.body.password) {
                // localStorage.setItem("user", "teacher");
                // localStorage.setItem("userdata", JSON.stringify(student));
                console.log(student);
                req.session.userdata = student;
                let classroom = await Classes.findOne({ _id: student.class });
                res.send({
                  test: "student login",
                  status: true,
                  data: req.body,
                  user: "student",
                  userdata: student,
                  classDetails: classroom,
                });
              } else {
                res.send({
                  test: "student pass wrong",
                  status: false,
                  data: req.body,
                  user: "student",
                });
              }
            })
            .catch((e) => {
              res.send({
                test: "nothing not found",
                status: false,
                data: req.body,
              });
            });
        });
    });
});

const Assignment = require("./Schemas/AssignmentSchema");
const { json } = require("body-parser");
const { ifError } = require("assert");

app.post("/createNewAssignment", (req, res) => {
  console.log("data assign is ", req.body);
  // res.send({ status: true, message: "route  working fine" });
  const newAssign = req.body.assign;
  newAssign.facultyName = req.body.facName;

  const nAssign = new Assignment(newAssign);
  nAssign
    .save()
    .then(() => {
      console.log("new assignment created successfully");
      res.send({ status: true, message: "route  working fine" });
    })
    .catch((e) => {
      console.log("error while creatring the nwe assignment ");
      res.send({ status: false, message: "route not working fine" });
    });
});

app.get("/getStudents", async (req, res) => {
  let students = await Student.find({
    className: req.query.class,
    division: req.query.division,
  });
  res.status(200).send(students);
});

app.post("/getStudent", (req, res) => {
  // res.send("done");
  Student.findOne({ _id: req.body.id })
    .then((stu) => {
      console.log("student found ", stu);
      res.status(200).send(stu);
    })
    .catch((e) => {
      console.log("error while gettihn getStudent");
      res.send({ status: false, message: "route not working fine", error: e });
    });
});

app.get("/getSubjects", async (req, res) => {
  let subjects = await Subject.find({ schoolId: req.query.schoolId });
  let data = [];
  for (let i = 5; i <= 10; i++) {
    let temp = subjects.filter((item) => item.class === i);
    data.push(temp);
  }

  res.status(200).send(data);
});

app.get("/getClassSubjects", async (req, res) => {
  let foundClass = await Classes.findOne({
    _id: req.query.classId,
  });
  let subjects = [];
  for (let item of foundClass.subjects) {
    let subject = await Subject.findOne({ _id: item.subjectId });
    let faculty = await Teacher.findOne({ _id: item.faculty }, { name: 1 });
    subjects.push({ subject, faculty });
  }
  res.status(200).send(subjects);
});

app.post("/addSubject", async (req, res) => {
  const newSubject = {
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    class: req.body.class,
    schoolId: req.body.schoolId,
  };

  const doc = new Subject(newSubject);

  doc
    .save()
    .then(async (s) => {
      for (let div of req.body.divisions) {
        await Classes.updateOne(
          { class: req.body.class, division: div },
          { $push: { subjects: { subjectId: newSubject._id, faculty: null } } }
        );
      }
      res.status(200).send();
    })
    .catch((e) => {
      console.log(e);
      res.status(500).send();
    });
});

app.post("/deleteSubject", async (req, res) => {
  Classes.updateOne(
    { _id: mongoose.Types.ObjectId(req.body.classId) },
    {
      $pull: {
        subjects: { subjectId: mongoose.Types.ObjectId(req.body.subjectId) },
      },
    }
  )
    .then((val) => {
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

app.post("/assignFaculty", async (req, res) => {
  Classes.updateOne(
    {
      _id: mongoose.Types.ObjectId(req.body.classId),
      "subjects.subjectId": mongoose.Types.ObjectId(req.body.subjectId),
    },
    {
      $set: {
        "subjects.$.faculty": mongoose.Types.ObjectId(req.body.facultyId),
      },
    }
  )
    .then((val) => {
      console.log(val);
      res.status(200).send();
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send();
    });
});

app.get("/getRecentAdmissions", async (req, res) => {
  let data = await Student.find({ $orderby: { $natural: -1 } }).limit(3);
  res.status(200).send(data);
});

app.get("/getRecentFeePayments", async (req, res) => {
  let data = await FeeTransactions.find({ $orderby: { $natural: -1 } }).limit(
    3
  );
  res.status(200).send(data);
});

app.post("/addAssignmentQuestion", async (req, res) => {
  Assignment.updateOne(
    { _id: req.body.assignId },
    { $push: { questions: req.body } }
  )
    .then((resp) => res.status(200).send())
    .catch((err) => res.status(500).send(err.message));
});

app.post("/getAllAssignment", (req, res) => {
  console.log("this is the assignment page", req.body);
  // console.log("assessing ", localStorage.getItem("userdata"));
  // req.session.name = "5467895645";
  console.log(req.session);
  Assignment.find({ facultyName: req.body.facName })
    .then((aiss) => {
      console.log("all assignments ,", aiss);
      res.send({
        status: true,
        message: "route  working fine assignment sent",
        aiss: aiss,
      });
    })
    .catch((e) => {
      console.log("error occured while getting the assignments ,", e);
      res.send({
        status: false,
        message: "route not working fine assignment not sent",
        error: e,
      });
    });
});

app.get("/getAssignmentDetails", async (req, res) => {
  let answers = [];
  let assignment = Assignment.find({ _id: req.query._id });
  console.log(assignment.submission);
  for (let item of assignment.submission) {
    if (item._id === req.query.studentId) {
      answers = item.answers[0];
    }
  }

  res.status(200).send(answers);
});

app.get("/getAllAssignmentStudent", async (req, res) => {
  // console.log("this is the assignment page", req.body);
  // req.session.name = "5467895645";

  // console.log("getAllAssignmentStudent ", req.body);
  // console.log("lower", req.body.division.toLowerCase());
  // console.log(req.session);
  let assignments = await Assignment.find({
    class: req.query.class,
    division: req.query.division.toLowerCase(),
  });
  console.log(assignments);

  res.status(200).send(assignments);
  // .then((aiss) => {
  //   // console.log("all assignments ,", aiss.length);
  //   const sameClass = aiss.map((a) => {
  //     if (a.division.toLowerCase() == req.body.division.toLowerCase()) {
  //       return a;
  //     }
  //   });
  //   // console.log("getAllAssignmentStudent ", sameClass);
  //   // res.send("this is fine");

  //   console.log(sameClass);
  //   // res.status(200).send({
  //   //   status: true,
  //   //   message: "route  working fine student assignment sent",
  //   //   aiss: sameClass,
  //   // });

  // })
  // .catch((e) => {
  //   console.log("error occured while getting the student assignments ,", e);
  //   res.send({
  //     status: false,
  //     message: "route not working fine student assignment not sent",
  //     error: e,
  //   });
  // });
});

app.post("/exel", (req, res) => {
  console.log("body", req.body);
  // console.log("workbook ", workbook);
  // console.log("workbook.SheetNames ", workbook.SheetNames);
  // console.log("workbook.Sheets ", workbook.Sheets);
  // let worksheet = workbook.Sheets[workbook.SheetNames[0]];

  const drows = req.body.data?.rows;
  console.log(drows);

  let nStudent = {};
  const students = [];

  for (let i = 1; i < drows.length; i++) {
    // for (let j = 0; j < drows[i].length; j++) {
    //   console.log(drows[0][j], " : ", drows[i][j].toString());
    // }
    nStudent.name = drows[i][0].toString();
    nStudent.email = drows[i][1].toString();
    nStudent.phone = drows[i][2].toString();
    nStudent.motherName = drows[i][3].toString();
    nStudent.fatherName = drows[i][4].toString();
    nStudent.division = drows[i][5].toString();
    nStudent.class = drows[i][6].toString();
    nStudent.rollnumber = drows[i][7].toString();
    nStudent.age = drows[i][8].toString();
    nStudent.fees = drows[i][9].toString();
    nStudent.password = drows[i][10].toString();
    console.log(" ");
    console.log(" ");
    console.log("next student is");
    console.log(" ");
    console.log(" ");
    // console.log(nStudent);
    students.push(nStudent);
    nStudent = {};
  }
  console.log("Students are", students);

  students.map((st, no) => {
    var nst = new Student(st);
    nst
      .save()
      .then(() => {
        console.log("student added number :", no);
      })
      .catch((e) => {
        console.log("error while addign student number ", no);
        res.send({
          message: "something went wrong whihle adding students from the file",
          status: false,
          error: e,
        });
      });
  });

  res.send({
    message: "all students added successfully",
    status: true,
  });
});

app.post("/submitAssignment", (req, res) => {
  console.log("body for submission ", req.body);
  // res.send("this is ok route working fine");
  Assignment.findOne({ assignmentName: req.body.assignName })
    .then((aiss) => {
      aiss.submission.push(req.body.data);

      aiss
        .save()
        .then(() => {
          Student.findOne({ _id: req.body.student })
            .then((stu) => {
              const sAssign = {
                assignmentName: req.body.assignName,
                assignId: req.body.assignId,
                marks: req.body.data.marks,
                answers: req.body.data.answers,
              };
              stu.submittedAssignment.push(sAssign);
              stu
                .save()
                .then(() => {
                  res.send({
                    status: true,
                    message:
                      "route  working fine   assignment submission in both assign and student",
                  });
                })
                .catch((e) => {
                  res.send({
                    status: false,
                    message:
                      "route not  working fine   while saving the exam submission in both assign and student",
                    error: e,
                  });
                });
            })
            .catch((e) => {
              res.send({
                status: false,
                message:
                  "route not  working fine   while getting student for subit assign",
                error: e,
              });
            });
        })
        .catch((e) => {
          res.send({
            status: false,
            message:
              "route not  working fine   while saving the exam submission",
            error: e,
          });
        });
    })
    .catch((e) => {
      res.send({
        status: false,
        message: "route not working fine   assignment sent for exam submission",
        error: e,
      });
    });
});

app.post("/getPerticularAssignment", (req, res) => {
  // console.log("this is the assignment page", req.body);
  // req.session.name = "5467895645";

  // console.log("lower", req.body.division.toLowerCase());
  // console.log(req.session);
  console.log(`Id sent is ${req.body.id}`);
  Assignment.findOne({ _id: req.body.id })
    .then((aiss) => {
      // console.log("getAllAssignmentStudent ", sameClass);
      // res.send("this is fine");
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

app.get("/getExtraQuestions", async (req, res) => {
  let questions = await MathSimilarQuestions.find({ qId: req.query.qId });
  res.status(200).send(questions);
});

app.post("/deleteAssignment", (req, res) => {
  console.log("this is delete req of ", req.body.assignName);
  Assignment.deleteOne({ assignmentName: req.body.assignName })
    .then((del) => {
      res.send("this si working file");
    })
    .catch((e) =>
      console.log("error while deleteing the assignment in node ", e)
    );
});

app.get("/getChapters", async (req, res) => {
  let chapters = [];
  if (req.query.subject === "math" || req.query.subject === "maths") {
    chapters = await MathChapters.find({ class: req.query.class });
  }

  res.status(200).send(chapters);
});

app.get("/getAssignedClassToTeachersClass", async (req, res) => {
  let { TeacherId, schoolId } = req.query;
  let resp = await Classes.find(
    {
      "subjects.faculty": mongoose.Types.ObjectId(TeacherId),
      schoolId: mongoose.Types.ObjectId(schoolId),
    },
    { name: 1, class: 1, division: 1, _id: 1 }
  );
  // let resp = await Classes.find({})
  res.status(200).send(resp);
});

app.post("/assignQuestions", async (req, res) => {
  var ass = req.body.assign;
  var chapId = req.body.chapId;

  if (ass.subject === "math") {
    let easyQuestions = await MathQuestions.aggregate([
      { $match: { level: "0", chapId: mongoose.Types.ObjectId(chapId) } },
      { $sample: { size: 3 } },
    ]);
    let mediumQuestions = await MathQuestions.aggregate([
      { $match: { level: "1", chapId: mongoose.Types.ObjectId(chapId) } },
      { $sample: { size: 3 } },
    ]);
    let hardQuestions = await MathQuestions.aggregate([
      { $match: { level: "2", chapId: mongoose.Types.ObjectId(chapId) } },
      { $sample: { size: 3 } },
    ]);

    await Assignment.updateOne(
      { _id: ass._id },
      {
        $set: {
          questions: [...easyQuestions, ...mediumQuestions, ...hardQuestions],
        },
      }
    );
    res.status(200).send();
  }
});

app.get("/cques", (req, res) => {
  // var que = {
  //   question: "medium 2222 science after creation added ",
  //   opt1: "opt1",
  //   opt2: "opt2",
  //   opt3: "opt3",
  //   opt4: "opt4",
  //   ans: "opt3",
  // };

  // const dques = new Questions(newq);
  Questions.findOne({ class: "9" })
    .then((q) => {
      q.subject.map((s) => {
        if (s.chapterName == "science") {
          s.mediumQue.push(que);
          q.save()
            .then(() => {
              console.log(
                "difficult which is added after creation saved perfectly"
              );
              res.send({ message: "working fine q created after creation" });
            })
            .catch((e) =>
              console.log("difficult which is added after creation error ", e)
            );
          // console.log("this is diff ", s.difficultQue);
        }
      });
    })
    .catch((e) => console.log("error"));

  // dques
  //   .save()
  //   .then(() => {
  //     console.log("the automatic question is saved perfectly");
  //     res.send({ message: "working fine" });
  //   })
  //   .catch((e) => console.log("erroe while savinig autpmatic questions ", e));
});

app.get("/getDateWiseStudnetAttendanceCount", async (req, res) => {
  let { schoolId } = req.query;
  let sevenDaysBeforeDate = new Date();
  sevenDaysBeforeDate.setDate(sevenDaysBeforeDate.getDate() - 7);
  let totalStudent = await Student.countDocuments();
  let data = await Attendance.aggregate()
    .match({
      date: {
        $gte: sevenDaysBeforeDate,
        $lt: new Date(),
      },
      schoolId: mongoose.Types.ObjectId(schoolId),
    })
    .group({
      _id: {
        date: {
          $dateToString: {
            format: "%d/%m/%Y",
            date: "$date",
          },
        },
      },
      totalSum: {
        $sum: {
          $size: "$students",
        },
      },
    })
    .sort("-_id.date");
  res.send({ totalStudent, data });
});

app.post("/teachers/Announcement", (req, res) => {
  let { message, teachers, schoolId } = req.body;
  teachers = teachers.map((x) => {
    // console.log({teacherId:x._id})
    return { teacherId: x._id };
  });

  let ann = {
    message,
    teachers: teachers,
    schoolId,
  };
  const annou = new TeacherAnnouncement(ann);

  annou
    .save()
    .then((s) => {
      res.status(200).send({ message: "inserted", status: true });
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
    });
});
app.post("/document/shareWith", (req, res) => {
  let { shareWith } = req.body;
  console.log(req.body);
  if (shareWith == "students") {
    let { selectedClassId, shareDocumentId } = req.body;
    console.log(selectedClassId, shareDocumentId);

    DocumentSharing.update(
      {
        _id: mongoose.Types.ObjectId(shareDocumentId), //find correct customer doc
      },
      {
        // $push: {
        //   shareWithClass: mongoose.Types.ObjectId(selectedClassId),
        // },
        $set: { shareWithClass: selectedClassId },
      }
    ).then((re) => {
      console.log(re);
      res.send(re);
    });
  } else if (shareWith == "teachers") {
    let { teachers, shareDocumentId } = req.body;

    // teachers = teachers.map((x) => {
    //   return x._id;
    // });

    DocumentSharing.update(
      {
        _id: mongoose.Types.ObjectId(shareDocumentId), //find correct customer doc
      },
      {
        // $push: {
        //   sharedWithTeachers: { $each: teachers },
        // },
        $set: { sharedWithTeachers: teachers },
      }
    ).then((re) => {
      console.log(re);
      res.send(re);
    });
  }
});

app.post("/students/Announcement", async (req, res) => {
  let { message, students, schoolId } = req.body;
  if (students[0] == "all") {
    students = await Student.find({ schoolId }, { _id: 1 });
  }
  students = students.map((x) => {
    console.log({ teacherId: x._id });
    return { studentId: x._id };
  });

  let ann = {
    message,
    students: students,
    schoolId,
  };
  const annou = new StudentAnnouncement(ann);

  annou
    .save()
    .then((s) => {
      res.status(200).send({ message: "inserted", status: true });
    })
    .catch((e) => {
      res.json({ status: false, message: "not workking fine", error: e });
    });
});
app.get("/getTeacherAnnouncement", async (req, res) => {
  const { TeacherId, schoolId, seen } = req.query;
  const r = await TeacherAnnouncement.find(
    {
      teachers: {
        $elemMatch: {
          teacherId: mongoose.Types.ObjectId(TeacherId),
          seen: seen,
        },
      },
      schoolId: mongoose.Types.ObjectId(schoolId),
    },
    {
      message: 1,
      teachers: {
        $elemMatch: {
          teacherId: mongoose.Types.ObjectId(TeacherId),
          seen: seen,
        },
      },
    }
  );
  res.status(200).send(r);
});

app.get("/getStudentAnnouncement", async (req, res) => {
  console.log(req.query);
  const { studentId, schoolId, seen } = req.query;
  const r = await StudentAnnouncement.find(
    {
      students: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(studentId),
          seen: seen,
        },
      },
      schoolId: mongoose.Types.ObjectId(schoolId),
    },
    {
      message: 1,
      students: {
        $elemMatch: {
          _id: mongoose.Types.ObjectId(studentId),
          seen: seen,
        },
      },
    }
  );
  console.log(r);
  res.status(200).send(r);
});

app.post("/updateTeacherAnnouncement/status", async (req, res) => {
  const { TeacherId, schoolId, seen } = req.body;
  console.log(schoolId, TeacherId);
  console.log("am heree ");
  try {
    let r = await TeacherAnnouncement.updateMany(
      {
        schoolId: mongoose.Types.ObjectId(schoolId),
        "teachers.teacherId": mongoose.Types.ObjectId(TeacherId),
      },
      { $set: { "teachers.$.seen": true } }
    );
    res.json({ success: true });
  } catch (e) {
    console.log(e);
  }
});
app.post(
  "/addLibraryDocument",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  fileExtLimiter([".png", ".jpg", ".jpeg"]),
  fileSizeLimiter,
  async (req, res) => {
    let { DocName, DocType, Class, division, schoolId, teacherId } = req.body;
    const { files } = req;
    // console.log("this is file ",files)
    // Object.keys(files).forEach((key) => {
    //   const filepath = path.join(
    //     __dirname,
    //     "files",
    //     files[key].name
    //   );
    //   files[key].mv(filepath, (err) => {
    //     console.log("came here");
    //     if (err) return res.status(500).json({ status: "error", message: err });
    //   });
    // });
    // console.log(files[file])
    let obj = {
      name: DocName,
      DocType: DocType,
      schoolId: mongoose.Types.ObjectId(schoolId),
      file: files.file.data,
      sharedBy: mongoose.Types.ObjectId(teacherId),
    };
    console.log(obj);
    let upDocument = new DocumentSharing(obj);
    upDocument
      .save()
      .then((s) => {
        console.log(s);
        res.json({ status: "success", message: Object.keys(files).toString() });
        // returning the name of file
      })
      .catch((e) => {
        console.log(4);
        res.json({ status: false, message: "not workking fine", error: e });
      });
  }
);

app.post("/deleteLibraryDocument", async (req, res) => {
  // await DocumentSharing.deleteMany({})
  // res.send('oj')
  console.log(req.body);
  try {
    await DocumentSharing.deleteOne({ _id: req.body.params._id });
    res.send("Document Got Deleted");
  } catch (e) {
    console.log(e);
    res.send("Didn't got deleted");
  }
});
app.get("/LibraryData", async (req, res) => {
  const { teacherId, schoolId } = req.query;
  try {
    let data = await DocumentSharing.find({
      sharedBy: mongoose.Types.ObjectId(teacherId),
      schoolId: mongoose.Types.ObjectId(schoolId),
    });
    console.log(data);
    res.send(data);
  } catch (e) {
    console.log(e);
    res.send("Didn't got");
  }
});

app.get("/getStudentDocuments", async (req, res) => {
  let documents = await DocumentSharing.find({
    schoolId: req.query.schoolId,
    shareWithClass: { $in: [req.query.classId] },
  });
  res.status(200).send(documents);
});

app.post("/sendEmail", async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "archit.chitre19@vit.edu",
      pass: "vit1234$",
    },
  });

  const mailOptions = {
    from: "archit.chitre19@vit.edu",
    to: "architchitre@gmail.com",
    subject: "Sending email using Node.js",
    text: "This is the text for email",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build/index.html"));
  });
}
const port = process.env.PORT || 5000;

app.listen(port);
