import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";

import TopMenu from "../../components/TopMenu/TopMenu";
import { FaUserCircle, FaUserFriends, FaTrash } from "react-icons/fa";

import "../../styles/styles.css";

const ClassStudents = () => {

    const [toggle, setToggle] = useState("students");
    const [students, setStudents] = useState([]);
    const [classId, setClassId] = useState(null);

    const getClass = async () => {
        const teacher = JSON.parse(window.localStorage.getItem("userdata"));
        let res = await axios.get(`/classes/getClass?facultyId=${teacher._id}`);
        if(res.status === 200){
          setClassId(res.data.classId);
        }
    }

    const getStudents = async () => {
        const teacher = JSON.parse(window.localStorage.getItem("userdata"));
        let res = await axios.get(
          `/getStudentsList?schoolId=${teacher.schoolId}&classId=${classId}`
        );
        if (res.status === 200) {
          setStudents(res.data);
        }
      };

    useEffect(() => {
        getClass();
    }, [])

    useEffect(() => {
        if(classId){
            getStudents();
        }
    }, [classId]);

    const toggleToStudents = () => {
        setToggle("students");
      };

    const items = [
        { name: "Students", click: toggleToStudents },
      ];

    return(
        <div className="body">
      <h1 className="title">CLASS STUDENTS</h1>
      <TopMenu items={items} />

      <div
        className="mt-3"
        style={{
          width: "95%",
          height: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: '5%'
        }}
      >
            
            {
                toggle === 'students' ?
                <div className="container">
                    {
                        students.length ?
                        <table class="table table-striped">
  <thead>
    <tr className="schedule-heading">
      <th scope="col">Roll No.</th>
      <th scope="col">Name</th>
      <th scope="col">Father's Name</th>
      <th scope="col">Email Id</th>
      <th scope="col">Contact</th>
      <th scope="col">Address</th>
    </tr>
  </thead>
  <tbody>
    {
        students.map((item, index) => 
            <tr>
                <th scope="row">{index+1}</th>
                <td>{item.name}</td>
                <td>{item.father_name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
            </tr>
        )
    }
  </tbody>
</table>
                        :
                        <h3>This class hasn't been assigned students yet. Please contact the administrator to do the same.</h3>
                    }
                </div>
                :
                null
            }
            

        </div>
        </div>
    )
}

export default ClassStudents;