import React, { useState, useEffect, createRef, useRef } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { useHistory } from "react-router-dom";
import {
  Grid,
  TextField,
  TableRow,
  TableCell,
  Button,
  TableHead,
  TableBody,
  Table
} from "@material-ui/core";
import SideNavbar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  ComposedChart,
  AreaChart,
  LineChart,
  Line,
  Area,
  PieChart,
  Pie,
  Cell,
  YAxis,
  XAxis,
} from "recharts";
import Chart from "react-apexcharts";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DonutChart from "donut-chart-js";

import axios from "axios";
import swal from "sweetalert";

// style
import useStyles from "./styles";
import "./styles.css";
import { OutTable, ExcelRenderer } from "react-excel-renderer";

import speaker from "../../images/speaker.png";

import "../../styles/Dashboard-admin.css";
import TeacherAnnouncement from "../Announcement/TeacherAnnouncement.js";
import StudentAnnouncements from "../Announcement/StudentAnnouncement";

const Latex = require("react-latex");

const mainChartData = getMainChartData();
const PieChartData = [
  { name: "Group A", value: 400, color: "primary" },
  { name: "Group B", value: 300, color: "secondary" },
  { name: "Group C", value: 300, color: "warning" },
  { name: "Group D", value: 200, color: "success" },
];
const subAssign = ["Assignment Name", "Marks"];
export default function Dashboard(props) {
  const [students, setStudents] = useState([]);
  const [currentUser, setCurrentUser] = useState(
    window.localStorage.getItem("user")
  );

  const [admin, setAdmin] = useState(true);
  const [classId, setClassId] = useState("");
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    name: "",
    employee_id: "",
    schoolId: {
      name: "",
      city: "",
      address: "",
      pincode: "",
    },
  });
  const greetings = ["Good morning, ", "Good afternoon, ", "Good evening, "];

  const [quote, setQuote] = useState("");
  const [greeting, setGreeting] = useState("");

  const [loggedUser, setLoggedUser] = useState({});
  const [isSubmittedAssignment, setIsSubmittedAssignment] = useState(false);
  const [student, setStudent] = useState({});
  const [studentsCount, setStudentsCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [defaulterList, setDefaulterList] = useState([]);
  const [state, setState] = useState();
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [marks, setMarks] = useState(0);
  const [assignmentName, setAssignmentName] = useState("");
  const [showExtraQuestions, setShowExtraQuestions] = useState(false);
  const [extraQuestions, setExtraQuestions] = useState([]);
  const [teachersCount, setTeachersCount] = useState(0);
  const [StudentAttendanceDates, setStudentAttendanceDates] = useState([]);
  const [StudentAttendanceCount, setStudentAttendanceCount] = useState([]);
  const [numAbsent, setNumAbsent] = useState('');
  const [pending, setPending] = useState([]);
  const [showTeacherAnnouncement, setShowTeacherAnnouncement] = useState(false);
  const [showStudentAnnouncement, setShowStudentAnnouncement] = useState(false);
  const [studentAttendanceData, setStudentAttendanceData] = useState([]);
  const [totalAttendance, setTotalAttendance] = useState(0);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [averageStudentAttendance, setAverageStudentAttendance] = useState(0);
  const AnnouncementRadioVal = useRef("");

  const [times, setTimes] = useState({
    0: "8:00 am",
    1: "9:00 am",
    2: "10:00 am",
    3: "11:00 am",
    4: "12:00 pm",
    5: "1:00 pm",
    6: "2:00 pm",
    7: "3:00 pm",
    8: "4:00 pm",
  });
  const [schedule, setSchedule] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const history = useHistory();

  const adm = JSON.parse(window.localStorage.getItem("userdata"));

  const getQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const { statusCode, statusMessage, ...data } = await response.json();
      if (!response.ok) throw new Error(`${statusCode} ${statusMessage}`);
      setQuote(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuote();
  }, []);

  const checkTeacherAttendance = async () => {
    const teacher = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(
      `/attendance/getTeacherAttendance?teacherId=${teacher._id}`
    );
    if (res.status === 200 && res.data) {
      setAttendanceMarked(true);
    }
  };

  const markTeacherAttendance = async () => {
    const teacher = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.post("/attendance/markTeacherAttendance", {
      teacherId: teacher._id,
    });
    if (res.status === 200) {
      setAttendanceMarked(true);
    } else {
      swal("Something went wrong!", "Please try again later", "error");
    }
  };

  const getStudentAttendance = async () => {
    let student = JSON.parse(window.localStorage.getItem("userdata"));
    let studentClass = JSON.parse(window.localStorage.getItem("classDetails"));

    let res = await axios.get(`/attendance/getStudentAttendance?classId=${studentClass._id}&studentId=${student._id}`);
    if(res.status === 200){
        setStudentAttendanceData(res.data);
        let absent = 0;
        for(let item of res.data){
            if(item.present){
                absent += 1;
            }
        }
        setNumAbsent(absent);
    }
}

  const getPendingAssignments = async () => {
    let studentClass = JSON.parse(window.localStorage.getItem("classDetails"));
    let student = JSON.parse(window.localStorage.getItem("userdata"));

    let res = await axios.get(`/assignments/getPendingAssignments?studentId=${student._id}&classId=${studentClass._id}`);
    if(res.status === 200){
      setPending(res.data);
    }
  }

  const getStudentSchedule = async () => {
    let studentClass = JSON.parse(window.localStorage.getItem("classDetails"));

    let res = await axios.get(`/timetable/getStudentSchedule?classId=${studentClass._id}`);
    if(res.status === 200){
      setSchedule(res.data);
    }
  }

  const getTeacherDashboard = async () => {
    let res = await axios.get(
      `/getTeacherDashboardDetails?schoolId=${adm.schoolId}&facultyId=${adm._id}`
    );
    if (res.status === 200) {
      setSchedule(res.data.schedule);
      setAnnouncements(res.data.announcements);
    }
  };

  const getClass = async () => {
    let res = await axios.get(`/classes/getClass?facultyId=${adm._id}`);
    if (res.status === 200) {
      setClassId(res.data.classId);
    }
  };

  const getAttendance = async () => {
    let res = await axios.get(
      `/attendance/getTotalAttendance?classId=${classId}`
    );
    let average = 0;
    if (res.status === 200) {
      setStudentAttendanceData(res.data.average);
      setTotalAttendance(res.data.total);

      for (let item of res.data.average) {
        average += (item.present / res.data.total) * 100;
      }
      setAverageStudentAttendance(average / res.data.average.length);
      average = average / res.data.average.length;
    }

    new DonutChart(document.getElementById("myChart"), {
      data: [
        { label: "empty", value: 360 - (average * 360) / 100, color: "#eee" },
        { label: "attendance", value: (average * 360) / 100, color: "#00363b" },
      ],
      holeSize: 0.6,
      animationSpeed: 0.5,
    });
  };

  useEffect(() => {
    if (currentUser === "teacher") {
      getClass();
      checkTeacherAttendance();
      getTeacherDashboard();
    }
    if(currentUser === 'student'){
      getStudentAttendance();    
      getPendingAssignments();
      getStudentSchedule();
    }
  }, []);

  useEffect(() => {
    if (classId) {
      getAttendance();
    }
  }, [classId]);

  // const headers = [
  //   { label: "Name", key: "name" },
  //   { label: "Email ID", key: "email" },
  //   { label: "Contact number", key: "phone" },
  //   { label: "Class", key: "class" },
  //   { label: "Division", key: "division" },
  //   { label: "Address", key: "address" },
  // ];

  const teacherAttendance = {
    options: {
      chart: {
        id: "Teachers attendance",
      },
      xaxis: {
        categories: [29, 30, 1, 2, 3, 4, 5, 6, 7].reverse(),
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 35, 22, 49, 60, 70, 60, 12],
      },
    ],
  };
  const studentAttendance = {
    options: {
      chart: {
        id: "Teachers attendance",
      },
      xaxis: {
        categories: StudentAttendanceDates,
      },
    },
    series: [
      {
        name: "series-1",
        data: StudentAttendanceCount,
      },
    ],
  };
  // const csvReport = {
  //   filename: "Admssions_List.csv",
  //   headers: headers,
  //   data: admissionData,
  // };

  const getAdminDetails = async () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    let res = await axios.get(`/admin/getAdminDetails?id=${adm._id}`);
    if (res.status === 200) {
      setAdminDetails(res.data);
    }
  };

  useEffect(() => {
    if(window.localStorage.getItem("user") === 'admin'){
      getAdminDetails();
    }
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(greetings[0]);
    else if (hour < 18) setGreeting(greetings[1]);
    else setGreeting(greetings[2]);
  }, []);

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userdata")));
  }, []);

  var classes = useStyles();
  var theme = useTheme();

  // local
  var [mainChartState, setMainChartState] = useState("monthly");

  const [addBTN, setAddBTN] = useState(false);
  const btnClick = () => {
    setAdmin(false);
    setAddBTN(!addBTN);
  };

  const newStudentDefault = {
    name: "",
    email: "",
    phone: "",
    address: "",
    fatherName: "",
    motherName: "",
    age: 0,
    class: 0,
    roll: 0,
    divisin: "",
    fees: 0,
  };
  const [newStudent, setNewStudent] = useState({});
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    console.log("this is the upload fucntin state", state);
    axios
      .post("http://localhost:3008/exel", { data: state })
      .then((res) => {
        console.log("this is img res,", res.data);
      })
      .catch((e) => {
        console.log("this is the eroor while upload api", e);
      });
  };

  const fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        console.log("cols", resp.cols);
        console.log("rows", resp.rows);
        setState({
          cols: resp.cols,
          rows: resp.rows,
        });
      }
    });
  };

  const show = async (id, name) => {
    console.log(id);
    let res = await axios.post("/getPerticularAssignment", { id: id });
    if (res.status === 200) {
      setQuestions(res.data.aiss.questions);
      let answers;
      for (let item of loggedUser.submittedAssignment) {
        if (item.assignmentName === name) {
          setMarks(item.marks);
          setAssignmentName(item.assignmentName);
          answers = item.answers;
          break;
        }
      }
      setDetails(answers);
    }
    setShowDetails(true);
  };

  const displayExtra = async (id) => {
    let res = await axios.get(`/getExtraQuestions?qId=${id}`);
    if (res.status === 200) {
      setShowDetails(false);
      setExtraQuestions(res.data);
      setShowExtraQuestions(true);
    }
  };

  const extraBack = () => {
    setShowDetails(true);
    setShowExtraQuestions(false);
    setExtraQuestions([]);
  };

  const getTeachersCount = () => {
    const adm = JSON.parse(window.localStorage.getItem("userdata"));
    console.log(adm.schoolId);
    axios
      .get("/allTeachers/", { params: { schoolId: adm.schoolId } })

      .then((res) => {
        if (res.status === 200) {
          console.log("inside");
          setTeachersCount(res.data.teachers.length);
          console.log(res.data);
          console.log("res.data.teachers.length", res.data.teachers.length);
        } else {
          console.log("something went wrong while fetching teachers count");
        }
      })
      .catch((e) => console.log(e, "something went wrong in getTeachercount"));
  };
  const getStudentsCount = () => {
    const { schoolId } = JSON.parse(window.localStorage.getItem("userdata"));
    axios
      .get("/allStudents", { params: { schoolId } })
      .then((res) => {
        setStudentsCount(res.data.students.length);
      })
      .catch((e) => console.log(e));
  };
  const getStudentAttendanceCount = () => {
    const { schoolId } = JSON.parse(window.localStorage.getItem("userdata"));
    axios
      .get("/getDateWiseStudnetAttendanceCount", { params: { schoolId } })
      .then((res) => {
        if (res.status === 200) {
          let student = res.data;
          let studentX_axis = student.data.map((x) => x._id.date.slice(0, 5));
          setStudentAttendanceDates(studentX_axis);
          console.log(studentX_axis, "studentX_axis");
          let studentCount = student.data.map((x) =>
            ((x.totalSum * 100) / student.totalStudent).toFixed(1)
          );
          setStudentAttendanceCount(studentCount);
        }
      });
  };

  const getClassCount = async () => {
    let res = await axios.get(`/getClassCount?schoolId=${adm.schoolId}`);
    if (res.status === 200) {
      setClassCount(res.data);
    }
  };

  const getDefaulterList = async () => {
    let res = await axios.get(
      `/fees/getDefaulterList?schoolId=${adm.schoolId}`
    );
    if (res.status === 200) {
      setDefaulterList(res.data);
    }
  };

  useEffect(() => {
    getTeachersCount();
    getStudentsCount();
    getClassCount();
    getDefaulterList();
    getStudentAttendanceCount();
  }, []);

  return (
    <>
      <Navbar />

      <Grid container spacing={4}>
        {currentUser == "student" && !showDetails && !showExtraQuestions ? (
          <>
            <div
              style={{ width: "75%" }}
              className="mt-4 alert alert-warning d-flex flex-column justify-content-evenly"
            >
              <div>
                <blockquote className="quote">{quote.content}</blockquote>
              </div>
              <div className="d-flex flex-row-reverse">~ {quote.author}</div>
            </div>


            <section className="dashboard-main">
              <div className="grid-card left-section">
                <div className="announcement-card">
                  <h5 className="schedule-card-heading">Announcements</h5>
                  {/* {announcements.length ? (
                    <div></div>
                  ) : (
                    <div className="mt-5 d-flex flex-column justify-content-evenly align-items-center">
                      <img style={{ height: "140px" }} src={speaker} />
                      <h6 className="text-muted mt-4">No new announcements</h6>
                    </div>
                  )} */}
                  <div className="mt-5 d-flex flex-column justify-content-evenly align-items-center">
                      <img style={{ height: "140px" }} src={speaker} />
                      <h6 className="text-muted mt-4">No new announcements</h6>
                    </div>
                </div>
              </div>
              <div class="col-sm schedule-card">
                <h5 className="schedule-card-heading">Overall Attendance</h5>
                <div
                  style={{
                    height: "170px",
                    width: "170px",
                    marginLeft: "auto",
                    marginTop: "10%",
                    marginRight: "auto",
                  }}
                >
                        <CircularProgressbar
                    strokeWidth={6}
                    styles={buildStyles({
                      pathColor: "#eeb316",
                      textColor: "#eeb316",
                    })}
                    value={parseInt((numAbsent/studentAttendanceData.length)*100)}
                    text={`${parseInt((numAbsent/studentAttendanceData.length)*100)}%`}
                  />
                        </div>
              </div>
              <div className="announcement-card mt-5">
                  <h5 className="schedule-card-heading">Pending Assignments</h5>
                  {
                    pending.length ?
                    <div className="mt-4">
                      {
                        pending.map((item, index) => 
                          <div style={{borderBottom: '1px solid #eee'}} className='row py-4'>
                            <div className="col-6">
                              {item.assignmentName}
                            </div>
                            <div className="col-3">
                              {(new Date(item.deadline)).toDateString()}
                            </div>
                            <div className="col-3">
                              <button onClick={() => history.push(`/app/assignment/solve/${item._id}`)} className="btn-rounded attendance-button py-1">Solve</button>
                            </div>
                          </div>
                        )
                      }
                    </div>
                    :
                    <p>No pending assignments!</p>
                  }
              </div>
              <div class="col-sm schedule-card mt-5">
                <h5 className="schedule-card-heading">Today's Schedule</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="">{new Date().toDateString()}</h6>
                  {/* <h6>{schedule.length} periods</h6> */}
                </div>

                {
                  schedule.length ?
                  <div className="timeline container mt-5">
                  <div className="wrapper">
                    <ul className="sessions">
                      {schedule.map((item, index) => (
                        <li>
                          <div className="time">{times[item.timeSlot]}</div>
                          <p>
                            <strong>{item.subjectId.name}</strong>
                          </p>
                          <p className="text-muted">
                            {item.classId.class}-{item.classId.division}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                :
                <h5 className="mt-5" style={{width: '60%', marginLeft: 'auto', marginRight: 'auto'}}>No periods today</h5>
                }
              </div>
            </section>

            
          </>
        ) : (
          ""
        )}
        
        {currentUser === "student" ? (
          <div>
            
          </div>
        ) : null}

        {currentUser === "admin" ? (
          <div className=" py-1  ps-3 ">
            <div>
              <h2>{greeting + "admin"}</h2>
            </div>
            <div className="row">
              <div className="col-md-9">
                <div className="row my-3 ">
                  <div className="col-md-4 pe-3">
                    <div className="row w-100">
                      <div className="quick-view d-flex justify-content-between py-3 px-3">
                        <div className="d-flex flex-column">
                          <h2>{studentsCount}</h2>
                          <p>Students</p>
                        </div>
                      </div>
                      {/* <div className="col-8  ">
                                <h2 className="display-4 text-center fw-bolder">
                                  {studentsCount}
                                </h2>
                                <p className="text-secondary text-center">
                                  Students
                                </p>
                              </div>
                              <div className=" col-4 bg-white">
                                <img
                                  className="dashboard-quater_image"
                                  style={{ background: "#73c3f9" }}
                                  src={`${hat}`}
                                />
                              </div> */}
                    </div>
                  </div>
                  <div className="col-md-4 pe-3">
                    <div className="row w-100">
                      <div className="quick-view d-flex justify-content-between py-3 px-3">
                        <div className="d-flex flex-column">
                          <h2>{classCount}</h2>
                          <p>Classes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3 ps-3 pt-3">
                <h3 className="fw-bolder">Announcement</h3>
                <div
                  className="bg-white"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "space-around",
                  }}
                >
                  <div>
                    <div className=" ps-3 ">
                      <div>
                        <h6 className="mt-1 mb-2 text-primary">
                          Create Announcement
                        </h6>
                        <div className="ps-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="announcement"
                              id="students"
                              value="students"
                              onClick={() => {
                                AnnouncementRadioVal.current = "students";
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="students"
                            >
                              Student
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="announcement"
                              id="teachers"
                              value="teachers"
                              onClick={() => {
                                AnnouncementRadioVal.current = "teachers";
                              }}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="teachers"
                            >
                              Teachers
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" text-center px-3">
                    <Button
                      variant="contained"
                      color="secondary"
                      className="mb-3 w-100"
                      onClick={(e) => {
                        if (AnnouncementRadioVal.current) {
                          if (AnnouncementRadioVal.current == "teachers") {
                            setAdmin(false);
                            setShowTeacherAnnouncement(true);
                          }
                        }
                        if (AnnouncementRadioVal.current === "students") {
                          setAdmin(false);
                          setShowStudentAnnouncement(true);
                        }
                      }}
                    >
                      Create
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-9">
                <h3 className="mt-4">Attendance</h3>
                <div className="row">
                  <div className="col-md-6  p-2">
                    <div className="bg-white">
                      <h6 className="text-secondary">Teacher Attendance</h6>

                      <Chart
                        options={teacherAttendance.options}
                        series={teacherAttendance.series}
                        type="bar"
                        width="500"
                        height="auto"
                      />
                    </div>
                  </div>
                  <div className="col-md-6 p-2 ">
                    <div className="bg-white">
                      <h6 className="text-secondary">Student Attendance</h6>

                      <Chart
                        options={studentAttendance.options}
                        series={studentAttendance.series}
                        type="bar"
                        height="auto"
                        width="500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-3 ">
                        <h3> Automated insigts here</h3>
                      </div> */}
            </div>

            <div className="mt-4">
              <h3>Defaulter students</h3>

              {defaulterList.map((item, index) => (
                <p>
                  {item.name} ({item.class})
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {currentUser === "teacher" ? (
          <>
            <div className="py-1 ps-3">
              <div>
                <h2>{greeting + "teacher"}</h2>
              </div>
            </div>

            <div
              style={{
                padding: "2%",
                borderRadius: "8px",
                height: "100px",
                width: "100%",
                background: "white",
              }}
              className="mt-3 attendance-section d-flex flex-row-reverse justify-content-start align-items-center"
            >
              {attendanceMarked ? (
                <button className="attendance-button" disabled>
                  Attendance marked &#10004;
                </button>
              ) : (
                <button
                  onClick={markTeacherAttendance}
                  className="attendance-button"
                >
                  Mark your attendance
                </button>
              )}
            </div>

            <section className="dashboard-main">
              <div className="grid-card left-section">
                <div className="announcement-card">
                  <h5 className="schedule-card-heading">Announcements</h5>
                  {announcements.length ? (
                    <div></div>
                  ) : (
                    <div className="mt-5 d-flex flex-column justify-content-evenly align-items-center">
                      <img style={{ height: "140px" }} src={speaker} />
                      <h6 className="text-muted mt-4">No new announcements</h6>
                    </div>
                  )}
                </div>
              </div>
              <div class="col-sm schedule-card">
                <h5 className="schedule-card-heading">Today's Schedule</h5>
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <h6 className="">{new Date().toDateString()}</h6>
                  <h6>{schedule.length} periods</h6>
                </div>

                <div className="timeline container mt-5">
                  <div className="wrapper">
                    <ul className="sessions">
                      {schedule.map((item, index) => (
                        <li>
                          <div className="time">{times[item.timeSlot]}</div>
                          <p>
                            <strong>{item.subjectId.name}</strong>
                          </p>
                          <p className="text-muted">
                            {item.classId.class}-{item.classId.division}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-main">
              <div className="announcement-card">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="schedule-card-heading">Class Attendance</h5>
                    <p>Average Attendance: {averageStudentAttendance}%</p>
                  </div>
                  <div
                    className="chart"
                    style={{ borderLeft: "1px solid #eee" }}
                  >
                    <canvas id="myChart" width="250px" height="200px"></canvas>
                  </div>
                </div>

                <div className="container mt-5">
                  {studentAttendanceData.map((item, index) => (
                    <div
                      style={{ borderBottom: "1px solid #eee" }}
                      className="row py-2"
                    >
                      <div className="col-6">{item.name}</div>
                      <div style={{ textAlign: "center" }} className="col-6">
                        <p
                          className={
                            (item.present / totalAttendance) * 100 < 75
                              ? "text-danger"
                              : null
                          }
                        >
                          <strong>
                            {(item.present / totalAttendance) * 100}%
                          </strong>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="teacher-attendance-card">
                <h5 className="schedule-card-heading">Your Attendance</h5>
                <div
                  style={{
                    height: "200px",
                    width: "200px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  <CircularProgressbar
                    strokeWidth={3}
                    className="mt-4"
                    styles={buildStyles({
                      pathColor: "#eeb316",
                      textColor: "#eeb316",
                    })}
                    value={80}
                    text={`${80}%`}
                  />
                </div>
              </div>
            </section>
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

// #######################################################################
function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
  var array = new Array(length).fill();
  let lastValue;

  return array.map((item, index) => {
    let randomValue = Math.floor(Math.random() * multiplier + 1);

    while (
      randomValue <= min ||
      randomValue >= max ||
      (lastValue && randomValue - lastValue > maxDiff)
    ) {
      randomValue = Math.floor(Math.random() * multiplier + 1);
    }

    lastValue = randomValue;

    return { value: randomValue };
  });
}

function getMainChartData() {
  var resultArray = [];
  var tablet = getRandomData(31, 3500, 6500, 7500, 1000);
  var desktop = getRandomData(31, 1500, 7500, 7500, 1500);
  var mobile = getRandomData(31, 1500, 7500, 7500, 1500);

  for (let i = 0; i < tablet.length; i++) {
    resultArray.push({
      tablet: tablet[i].value,
      desktop: desktop[i].value,
      mobile: mobile[i].value,
    });
  }

  return resultArray;
}
