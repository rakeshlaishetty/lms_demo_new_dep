import React, { useState, useEffect, useRef, createRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import swal from "sweetalert";
import TopMenu from "../../components/TopMenu/TopMenu";

import "../../styles/styles.css";

const ViewStudents = (props) => {
    const [toggle, setToggle] = useState('name')
    const [students, setStudents] = useState([]);
    const [classes, setClasses] = useState([]);

    const history = useHistory();

    const getClasses = async () => {
      const adm = JSON.parse(window.localStorage.getItem("userdata"));
      let res = await axios.get(`/classes/getClasses?schoolId=${adm.schoolId}`);
      if (res.status === 200) {
        setClasses(res.data);
      }
    };
  
    useEffect(() => {
      getClasses();
    }, []);

    const findStudent = async (evt) => {
        evt.preventDefault();
        const adm = JSON.parse(window.localStorage.getItem('userdata'));
        let res = await axios.post(`/findStudent`, {schoolId: adm.schoolId, name: evt.target.elements.name.value});

        if(res.status === 200){
            setStudents(res.data);
        }
    }

    const toggleToName = () => {
      setToggle('name');
    }

    const toggleToClass = () => {
      setToggle('class');
    }

    const items = [
      { name: "Search by name", click: toggleToName },
      { name: "Search by class", click: toggleToClass },
    ];

    const findStudents = async (evt) => {
      evt.preventDefault();
      let res = await axios.get(`/getStudentsList?classId=${evt.target.elements.classId.value}`);
      if(res.status === 200){
        setStudents(res.data);
      }
    }

    useEffect(() => {
      setStudents([])
    }, [toggle])

    return(
        <div className='body'>
            <h1 className="title">SEARCH STUDENTS</h1>
            <TopMenu items={items} />

            <div
        className="mt-3"
        style={{
          width: "95%",
          height: "auto",
          background: "white",
          borderRadius: "12px",
          boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          padding: '8%'
        }}
      >

        {
          toggle === 'name' ?
          <div>
            
            <form onSubmit={findStudent} className="d-flex justify-content-between" style={{width: '90%'}}>
                    <input className="form-control" type='text' name='name' placeholder='Search by name' style={{width: '75%'}} required/>
                    <button type='submit' class='btn' style={{ backgroundColor: "#eeb316", color: "white" }}>Search</button>
                </form>

                
                        <div
                    className="row mb-3 mt-4 d-flex align-items-center"
                    style={{
                        background: "rgba(238, 238, 238, 0.5)",
                        borderTop: "1px solid #ddd",
                        borderBottom: "1px solid #ddd",
                        height: "50px",
                    }}
                    >
                    <div className="col-3">
                        <span className="table-heading">Sr No.</span>
                    </div>
                    <div className="col-3">
                        <span className="table-heading">Name</span>
                    </div>
                    <div className="col-3">
                        <span className="table-heading">Contact</span>
                    </div>
                    </div>

                    {students.map((item, index) => (
              <div
                className="row mb-3 d-flex align-items-center"
                style={{ height: "40px" }}
              >
                <div className="col-3">
                  <span>{index + 1}</span>
                </div>
                <div className="col-3">
                  <span>{item.name}</span>
                </div>
                <div className="col-3">
                  <span>{item.phone}</span>
                </div>
                <div className="col-3">
                  <span>
                    <button
                      onClick={() =>
                        history.push({
                          pathname: `/app/student-profile/${item._id}`,
                          state: { id: item._id },
                        })
                      }
                      className="btn-rounded attendance-button py-2"
                    >
                      View profile
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
          :
          null
          
        }

        {
          toggle === 'class' ?
          <div>
              <form onSubmit={findStudents} className="d-flex justify-content-between" style={{width: '90%'}}>
              <select
                style={{ width: "40%" }}
                className="form-control mx-4"
                name="classId"
                required
              >
                    {classes.map((item, index) => (
                      <option value={item._id}>
                        {item.class} {item.division}
                      </option>
                    ))}
                  </select>
                    <button type='submit' class='btn' style={{ backgroundColor: "#eeb316", color: "white" }}>Search</button>
                </form>

                <div
                    className="row mb-3 mt-4 d-flex align-items-center"
                    style={{
                        background: "rgba(238, 238, 238, 0.5)",
                        borderTop: "1px solid #ddd",
                        borderBottom: "1px solid #ddd",
                        height: "50px",
                    }}
                    >
                    <div className="col-3">
                        <span className="table-heading">Sr No.</span>
                    </div>
                    <div className="col-3">
                        <span className="table-heading">Name</span>
                    </div>
                    <div className="col-3">
                        <span className="table-heading">Contact</span>
                    </div>
                    </div>
                {students.map((item, index) => (
              <div
                className="row mb-3 d-flex align-items-center"
                style={{ height: "40px" }}
              >
                <div className="col-3">
                  <span>{index + 1}</span>
                </div>
                <div className="col-3">
                  <span>{item.name}</span>
                </div>
                <div className="col-3">
                  <span>{item.phone}</span>
                </div>
                <div className="col-3">
                  <span>
                    <button
                      onClick={() =>
                        history.push({
                          pathname: `/app/student-profile/${item._id}`,
                          state: { id: item._id },
                        })
                      }
                      className="btn-rounded attendance-button py-2"
                    >
                      View profile
                    </button>
                  </span>
                </div>
              </div>
            ))}
          </div>
          :
          null
        }
                </div>

                
            </div>
        
    )
}

export default ViewStudents;