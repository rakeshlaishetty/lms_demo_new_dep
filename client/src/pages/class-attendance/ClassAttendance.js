import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import TopMenu from "../../components/TopMenu/TopMenu";
import { Checkbox } from "@material-ui/core";
import FormControlLabel from "@mui/material/FormControlLabel";

import attendanceMarked from '../../images/attendance-marked.png'
import "../../styles/styles.css";
import { RoundedCorner } from "@material-ui/icons";

const ClassAttendance = (props) => {
  const [toggle, setToggle] = useState("view");
  const [className, setClassName] = useState("");
  const [students, setStudents] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [attendance, setAttendance] = useState([]);
  const [average, setAverage] = useState({});
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState(new Date());

  const getClassName = () => {
    const classroom = JSON.parse(window.localStorage.getItem("classDetails"));
    setClassName(classroom.class + "-" + classroom.division);
  };

  const getStudents = async () => {
    const classroom = JSON.parse(window.localStorage.getItem("classDetails"));
    let res = await axios.get(`/getStudentsList?classId=${classroom._id}`);
    if (res.status === 200) {
      setStudents(res.data);
    }
  };

  const checkSubmitted = async () => {
    const classroom = JSON.parse(window.localStorage.getItem("classDetails"));
    let res = await axios.get(`/attendance/checkStudentAttendanceSubmitted?classId=${classroom._id}`);
    if(res.status === 200 && res.data){
        setSubmitted(true);
    }
  }

  useEffect(() => {
    getClassName();
    checkSubmitted();
    getStudents();
  }, []);

  const toggleToView = () => {
    setToggle("view");
  };

  const toggleToAdd = () => {
    setToggle("add");
  };

  const items = [
    { name: "View attendance", click: toggleToView },
    { name: "Submit attendance", click: toggleToAdd },
  ];

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    let absent = document.getElementsByName('absent');
    let absentStudents = []
    for (var i = 0; i < absent.length; i++) {
        if (!absent[i].checked) {
            absentStudents.push(absent[i].value)
        }
    }

    const classroom = JSON.parse(window.localStorage.getItem("classDetails"));

    const data = {
        classId: classroom._id,
        absent: absentStudents
    }
    let res = await axios.post('/attendance/markStudentAttendance', data);
    if(res.status === 200){
        swal('Attendance submitted successfully', '', 'success');
        setSubmitted(true)
    }
  }

  const handleFetch = async (evt) => {
    evt.preventDefault();
    const classroom = JSON.parse(window.localStorage.getItem("classDetails"));

    let res = await axios.get(`/attendance/getAttendance?classId=${classroom._id}&date=${evt.target.elements.date.value}`);
    if(res.status === 200){
        setAttendance(res.data.data);
        setAverage(res.data.average);
        setTotal(res.data.total);
    }
  }

  return (
    <div>
      <div className="body">
        <h1 className="title">CLASS ATTENDANCE</h1>
        <TopMenu items={items} />

        <div
          className="mt-3"
          style={{
            width: "95%",
            padding: "5%",
            background: "white",
            borderRadius: "12px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          }}
        >
          {toggle === "view" ? 
          
          <div>
                    <h3>View attendance for <select><option>{className}</option></select></h3>
                
                <form onSubmit={handleFetch} className="d-flex justify-content-between align-items-center mt-5" style={{width: '100%'}}>
                    <input style={{width: '350px'}} name='date' type='date' className="form-control" required/>
                    <button className="btn-rounded">Fetch</button>
                </form>
                {
                    attendance.length ?
                    <div>
                        
                    <table className="table table-striped mt-5">
                        <thead className="schedule-heading">
                            <tr>
                            <th scope="col">Roll Number</th>
                            <th scope="col">Name</th>
                            <th scope="col"></th>
                            <th scope="col">Total attendance</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            attendance.map((item, index) => 
                                <tr>
                                    <th scope="row">{index+1}</th>
                                    <td>{item.name}</td>
                                    <td className={item.present ? 'text-success' : 'text-danger'}>{item.present ? 'Present' : 'Absent'}</td>
                                    <td className={Math.floor((average[item._id]/total)*100) < 75 ? 'text-danger' : null}><strong><em>{Math.floor((average[item._id]/total)*100)}%</em></strong></td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                    </div>
                    :
                    null
                }
          </div> 
          
          : null}

          {toggle === "add" ? (
            <div>
              <div className="d-flex justify-content-between align-items-center" style={{width: '100%'}}>
                <h3>Submit attendance for <select><option>{className}</option></select></h3>
                <h5 className="text-muted font-italic">{date.toDateString()}</h5>
              </div>
              
                {
                    submitted ?
                    <div className="px-5 mt-4 d-flex flex-column justify-content-center align-items-center">
                        <img className="mt-3" style={{height: '200px'}} src={attendanceMarked}/>
                        <br/>
                        <h5 className="mt-1 text-muted">You have submitted the attendance for today</h5>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                    <table class="table table-striped mt-4">
                      <thead>
                        <tr className="schedule-heading">
                          <th scope="col">Roll Number</th>
                          <th scope="col">Name</th>
                          <th scope="col">Present</th>
                        </tr>
                      </thead>
                      <tbody>
                        {students.map((item, index) => (
                          <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{item.name}</td>
                            <td>
                              <FormControlLabel
                                name="absent"
                                value={item._id}
                                control={
                                  <Checkbox
                                    defaultChecked
                                    style={{ color: "#eeb316" }}
                                  />
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <button type='submit' className="btn-rounded mt-4 attendance-button">Submit</button>
                    </form>
                }
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ClassAttendance;
