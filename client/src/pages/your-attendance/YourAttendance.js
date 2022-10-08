import React, { useState, useEffect, useRef, createRef } from "react";
import axios from "axios";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import {AiFillExclamationCircle} from 'react-icons/ai'
import TopMenu from "../../components/TopMenu/TopMenu";
import noData from '../../images/no-data.png'

import "../../styles/styles.css";


const YourAttendance = () => {
    const [toggle, setToggle] = useState("attendance");
    const [data, setData] = useState([]);
    const [numAbsent, setNumAbsent] = useState(0);

    const getAttendance = async () => {
        let student = JSON.parse(window.localStorage.getItem("userdata"));
        let studentClass = JSON.parse(window.localStorage.getItem("classDetails"));

        let res = await axios.get(`/attendance/getStudentAttendance?classId=${studentClass._id}&studentId=${student._id}`);
        if(res.status === 200){
            setData(res.data);
            let absent = 0;
            for(let item of res.data){
                if(item.present){
                    absent += 1;
                }
            }
            setNumAbsent(absent);
        }
    }

    useEffect(() => {
        getAttendance();
    }, []);
    
    const toggleToAttendance = () => {
        setToggle("attendance");
    };

    const items = [{ name: "Attendance", click: toggleToAttendance }];

    return(
        <div className="body">
      <h1 className="title">YOUR ATTENDANCE</h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "98%",
          padding: "5%",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch'
        }}
      >
        {
            toggle === 'attendance' ?
            <div>
                {
                    data.length ?
                    <div style={{height: '130px'}} className='d-flex justify-content-between align-items-center'>
                        <div style={{width: '75%'}}>
                            <h2>Overall Attendance</h2>
                            <h6>Maintain an overall attendance above 75% to avoid being in the defaulter list</h6>
                        </div>
                        <div style={{height: "120px",
                    width: "120px", borderLeft: '1px solid #eee', padding: '2%'}}>
                        <CircularProgressbar
                    strokeWidth={6}
                    styles={buildStyles({
                      pathColor: "#eeb316",
                      textColor: "#eeb316",
                    })}
                    value={parseInt((numAbsent/data.length)*100)}
                    text={`${parseInt((numAbsent/data.length)*100)}%`}
                  />
                        </div>
                    </div>
                    :
                    null
                }
                {
                    data.length ?
                   <table className="mt-5 table table-striped">
                    <thead>
    <tr className='schedule-heading'>
      <th scope="col">Date</th>
      <th scope="col">Status</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    {
        data.map((item, index) => 
            <tr>
                <th scope="row">{item.date}</th>
                <td className={item.present ? 'text-success' : 'text-danger'}>{item.present ? 'Present' : 'Absent'}</td>
                <td>{!item.present ? <button className="attendance-button btn-rounded py-2">Cite reason</button> : null}</td>
            </tr>
        )
    }
  </tbody>
                   </table>
                    :
                    <div className='d-flex flex-column justify-content-center align-items-center mt-3'>
                        <img style={{height: '150px'}} src={noData}/>
                        <h3 className="mt-3">No data available</h3>
                        <p className="text-muted mt-2">Please ask your concerned faculty to enter the attendance data.</p>
                    </div>
                }

            </div>
            :
            null
        }

        <a style={{width: 'auto', marginLeft: 'auto', marginRight: 'auto'}} className='mt-5'><AiFillExclamationCircle/> Report Descrepancy</a>
        </div>
        </div>
    )
}

export default YourAttendance;