import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";

import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";

const TeacherAttendance = () => {
  const [toggle, setToggle] = useState("fetch");
  const [teachers, setTeachers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    function getDatesInRange(startDate, endDate) {
        const date = new Date(startDate.getTime());
      
        const dates = [];
      
        while (date <= endDate) {
          dates.push(new Date(date));
          date.setDate(date.getDate() + 1);
        }
      
        return dates;
    }

    if(attendance.length){
        const d1 = new Date(attendance[0]);
        const d2 = new Date();

        setDates(getDatesInRange(d1, d2))
    }
  }, [attendance])

  const getTeachers = async () => {
    const adm = JSON.parse(window.localStorage.getItem('userdata'));
    let res = await axios.get(`/getTeachers?schoolId=${adm.schoolId}`);
    if(res.status === 200){
        setTeachers(res.data);
    }
  }

  const getAttendance = async (evt) => {
    evt.preventDefault();

    let res = await axios.get(`/attendance/getTeacherAttendanceData?teacherId=${evt.target.elements.teacherId.value}`);
    if(res.status === 200){
        setAttendance(res.data);
    }
  }

  useEffect(() => {
    getTeachers();
  }, [])

  const toggleToFetch = () => {
    setToggle('fetch')
  }

  const items = [{name: 'View attendance', click: toggleToFetch}]

  return(
    <div className='body'>

        <h1 className="title">TEACHER ATTENDANCE</h1>
      <TopMenu items={items} />

      <div className="mt-3"
        style={{
          width: "95%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}>
            <form onSubmit={getAttendance} className="d-flex justify-content-between align-items-center">
                <select style={{width: '250px'}} className="form-control mx-5" name='teacherId'>
                    {
                        teachers.map((item, index) => <option key={index} value={item._id}>{item.name}</option>)
                    }
                </select>

                <button type='submit' className="btn-rounded attendance-button py-2">Fetch</button>
            </form>

            {
                attendance.length ?
                <div>
                    <div className="d-flex justify-content-between align-items-center mt-5">
                        <div className='attendance-card'>
                            <h1>{Math.round((attendance.length/dates.length)*100)}%</h1>
                            <p className="mt-4">Total Attendance</p>
                        </div>
                        <div className='attendance-card'>
                            <h1>{dates.length-attendance.length}</h1>
                            <p className="mt-4">Leaves</p>
                        </div>
                    </div>   
                <table className="table table-striped mt-5 px-3">
                     <thead>
                        <tr className="schedule-heading">
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dates.map((item, index) => 
                                <tr>
                                    <th scope="row">{item.toDateString()}</th>
                                    <td className={attendance.includes(item.toDateString()) ? 'text-success' : 'text-danger'}>{attendance.includes(item.toDateString()) ? 'Present' : 'Absent'}</td>
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

    </div>
  )

}

export default TeacherAttendance;